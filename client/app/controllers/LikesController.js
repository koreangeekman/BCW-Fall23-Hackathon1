import { AppState } from "../AppState.js"
import { api } from "../services/AxiosService.js"
import { likesService } from "../services/LikesService.js"
import { Pop } from "../utils/Pop.js"


export class LikesController {
  constructor() {
    // AppState.on('activePost', likesService.nullLikes)
  }

  async createLike() {
    try {
      const newLike = await likesService.createLike()
      console.log(newLike)
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }

  async removeLike() {
    try {
      await likesService.removeLike()
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }
}