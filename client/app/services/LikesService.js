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

  async removeLike() {
    const postId = AppState.activePost?.id
    const likeData = await api.get(`api/posts/${postId}/likes`)
    const accountId = AppState.account?.id
    console.log('likeData.id', likeData.data.creatorId);
    if (likeData.data.creatorId != accountId) {
      console.error('Not your account');
    }
    const res = await api.delete(`api/likes/${likeData.id}`)
    console.log('deleted: ', res.data);
  }
}

export const likesService = new LikesService()