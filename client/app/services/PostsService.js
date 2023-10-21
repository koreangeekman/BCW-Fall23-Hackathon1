import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { api } from "./AxiosService.js"

class PostsService {

  async getPosts() {
    const res = await api.get('api/posts')
    // console.log('Got Posts', res.data);
    const newPosts = res.data.map((postPOJO) => new Post(postPOJO))
    AppState.posts = newPosts
  }

  async createPost(postData) {
    const res = await api.post('api/posts', postData)
    const newPosts = new Post(res.data)
    AppState.posts.push(newPosts)
    AppState.emit('posts')
  }


  setActivePost(postId) {
    const foundPost = AppState.posts.find(post => post.id == postId)
    console.log(foundPost)
    if (!foundPost) {
      throw new Error(`bad post id: ${postId}`)
    }
    AppState.activePost = foundPost
  }


  sortByDates() {
    AppState.posts = AppState.posts.sort((a, b) => b.createdAt - a.createdAt)

  }

  sortByLikes() {
    AppState.posts = AppState.posts.sort((a, b) => b.likeCount - a.likeCount)
  }
}

export const postsService = new PostsService()