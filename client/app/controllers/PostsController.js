import { AppState } from "../AppState.js"
import { postsService } from "../services/PostsService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"



function _drawPosts() {
  const posts = AppState.posts
  let content = ''
  posts.forEach(post => content += post.PostCardTemplate)
  setHTML('imageBoard', content)
}

function _drawActivePost() {
  const post = AppState.activePost
  setHTML('postDetails', post.PostActiveTemplate)
  bootstrap.Modal.getOrCreateInstance('#activePostModal').show()
}
export class PostsController {
  constructor() {
    // console.log('controller is good')
    this.getPosts()
    AppState.on('posts', _drawPosts)
    AppState.on('activePost', _drawActivePost)
    AppState.on('liked', _drawActivePost)
  }

  async getPosts() {
    try {
      await postsService.getPosts()
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }

  async createPost(event) {
    try {
      event?.preventDefault()
      const form = event.target
      const postData = getFormData(form)
      await postsService.createPost(postData)
      form.reset()
      // @ts-ignore
      bootstrap.Modal.getOrCreateInstance('#postFormModal').hide()
      Pop.success('New post successfully created')
    } catch (error) {
      console.log(error)
      Pop.error(error)
    }
  }
  setActivePost(postId) {
    try {

      postsService.setActivePost(postId)

    } catch (error) {
      Pop.error(error)
    }
  }

  async removePost() {
    try {
      const yes = await Pop.confirm('Are you sure you want to delete this post?')
      if (!yes) {
        return
      }
      await postsService.removePost()
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }

  async sortByDates() {
    try {
      await postsService.sortByDates()
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }

  async sortByLikes() {
    try {
      await postsService.sortByLikes()
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }
}