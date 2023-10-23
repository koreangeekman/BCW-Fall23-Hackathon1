import { AppState } from "../AppState.js"
import { api } from "../services/AxiosService.js"
import { likesService } from "../services/LikesService.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"



export class LikesController {
  constructor() {
    AppState.on('liked', this.ifLikedToggle)
  }

  async ifLikedToggle() {
    // const liked = await likesService.getLike();
    if (AppState.account?.id && AppState.activePost) {
      if (AppState.liked) {
        const content = `<i type="button" class="liked mdi mdi-heart fs-2 text-danger" onclick="app.LikesController.removeLike()"></i>`
        setHTML('liked', content);
        return
      }
      const content = `<i type="button" class="liked mdi mdi-heart-outline fs-2 text-danger" onclick="app.LikesController.createLike()"></i>`
      setHTML('liked', content);
      return
    }
    const content = `<i type="button" class="liked mdi mdi-heart-outline fs-2 text-danger" onclick="app.AuthController.login()"></i>`
    setHTML('liked', content);
  }

  async createLike() {
    try {
      const newLike = await likesService.createLike()
      // console.log(newLike)
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