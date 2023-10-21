import { AppState } from "../AppState.js"
import { Pop } from "../utils/Pop.js"
import { api } from "./AxiosService.js"


class LikesService {
  async createLike() {
    // @ts-ignore
    const postData = { postId: AppState.activePost.id }
    const res = await api.post('api/likes', postData)
    AppState.emit('posts')
    return res.data
  }

  async removeLike(postId) {
    const likeData = await api.get(`api/${postId}/likes`)
    if (res.data.id != AppState.account.id) {
      throw new console.error('Not your account');
    }
    const res = await api.delete(`api/likes/${likeData.id}`)
    console.log('deleted: ', res.data);
  }
}

export const likesService = new LikesService()