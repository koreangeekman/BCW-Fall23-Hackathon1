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

export class PostsController {
  constructor() {
    // console.log('controller is good')
    AppState.on('account', this.getPosts)
    AppState.on('posts', _drawPosts)
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
      bootstrap.Modal.getOrCreateInstance('#postFormModal').hide()
      Pop.success('New post successfully created')
    } catch (error) {
      console.log(error)
      Pop.error(error)
    }
  }
}