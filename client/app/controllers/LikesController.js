import { likesService } from "../services/LikesService.js"
import { Pop } from "../utils/Pop.js"



export class LikesController {
  constructor() {

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
      const removeLike = await likesService.removeLike()
      console.log(removeLike)
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }
}