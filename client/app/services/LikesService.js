import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"


class LikesService {
  async createLike() {
    // @ts-ignore
    const postData = { postId: AppState.activePost.id }
    const res = await api.post('api/likes', postData)
    AppState.emit('posts')
    return res.data
  }

}

export const likesService = new LikesService()