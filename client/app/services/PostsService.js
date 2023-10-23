import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { api } from "./AxiosService.js"
import { likesService } from "./LikesService.js"

class PostsService {

  async getPosts() {
    const res = await api.get('api/posts');
    // console.log('Got Posts', res.data);
    const newPosts = res.data.map((postPOJO) => new Post(postPOJO))
    AppState.posts = newPosts
    this.sortByLikes()
  }

  // async getPostsAsMember() {
  //   const res = await api.get('api/member/posts');
  //   // console.log('Got Posts', res.data);
  //   // const newPosts = res.data.map((postPOJO) => new Post(postPOJO))
  //   // AppState.posts = newPosts
  //   // this.sortByLikes()
  // }

  async createPost(postData) {
    const res = await api.post('api/posts', postData)
    const newPosts = new Post(res.data)
    AppState.posts.push(newPosts)
    AppState.emit('posts')
  }

  async setActivePost(postId) {
    const foundPost = AppState.posts.find(post => post.id == postId)
    // console.log(foundPost)
    if (!foundPost) {
      throw new Error(`bad post id: ${postId}`)
    }
    AppState.activePost = foundPost
  }

  async removePost() {
    const postId = AppState.activePost?.id
    const res = await api.delete(`api/posts/${postId}`)
    AppState.posts = AppState.posts.filter((post) => postId.id != postId)
    AppState.emit('posts')
  }

  sortByDates() {
    if (AppState.sort == 'dates') {
      // @ts-ignore
      AppState.posts = AppState.posts.sort((a, b) => a.createdAt - b.createdAt)
      AppState.sort = 'datesInv'
      return
    }
    // @ts-ignore
    AppState.posts = AppState.posts.sort((a, b) => b.createdAt - a.createdAt)
    AppState.sort = 'dates'
  }

  sortByLikes() {
    if (AppState.sort == 'likes') {
      AppState.posts = AppState.posts.sort((a, b) => a.likeCount - b.likeCount)
      AppState.sort = 'likesInv'
      return
    }
    AppState.posts = AppState.posts.sort((a, b) => b.likeCount - a.likeCount)
    AppState.sort = 'likes'
  }
}

export const postsService = new PostsService()