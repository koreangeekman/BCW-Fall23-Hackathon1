import { AppState } from "../AppState.js"
import { postsService } from "../services/PostsService.js"
import { Pop } from "../utils/Pop.js"

export class PostsController {
  constructor() {
    // console.log('controller is good')
    AppState.on('account', this.getPosts)
  }




  async getPosts() {
    try {
      await postsService.getPosts()
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }
}