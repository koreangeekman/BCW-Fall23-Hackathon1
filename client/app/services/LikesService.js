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
    let res = await api.get(`api/posts/${postId}/likes`) // technically an array of objects (but only one)
    const likeData = res.data[0] // pull out just that first and only object
    const accountId = AppState.account?.id
    const creatorId = likeData.creatorId
    console.log('likeData.data', creatorId);
    if (creatorId != accountId) { // validate active user vs returned object creator
      console.error('Not your account', creatorId, 'vs', accountId);
    }
    res = await api.delete(`api/likes/${likeData.id}`)
    console.log('deleted: ', res.data);
  }
}

export const likesService = new LikesService()