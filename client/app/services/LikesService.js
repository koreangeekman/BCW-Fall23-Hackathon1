import { AppState } from "../AppState.js"
import { Pop } from "../utils/Pop.js"
import { api } from "./AxiosService.js"


class LikesService {
  async createLike() {
    // @ts-ignore
    const postData = { postId: AppState.activePost.id }
    const res = await api.post('api/likes', postData)
    AppState.liked = true
    return res.data
  }

  async getLike(postId) {
    let res = await api.get(`api/posts/${postId}/likes`) // technically an array of objects (but only one)
    const likeData = res.data[0] // pull out just that first and only object
    if (!likeData) {
      // console.log('no like data');
      return
    }
    const accountId = AppState.account?.id
    const creatorId = likeData.creatorId
    if (creatorId != accountId) { // validate active user vs returned object creator
      console.error('Not your account', creatorId, 'vs', accountId);
    }
    if (likeData.id) {
      // console.log('likeData exists, return true', likeData);
      AppState.liked = true
      // console.log('set appstate liked true');
      return true
    }
    AppState.liked = false
    // console.log('set appstate liked false');
    return false
  }

  async removeLike() {
    const postId = AppState.activePost?.id
    let res = await api.get(`api/posts/${postId}/likes`) // technically an array of objects (but only one)
    const likeData = res.data[0] // pull out just that first and only object
    const accountId = AppState.account?.id
    const creatorId = likeData.creatorId
    // console.log('likeData.data', likeData);
    if (creatorId != accountId) { // validate active user vs returned object creator
      console.error('Not your account', creatorId, 'vs', accountId);
    }
    res = await api.delete(`api/likes/${likeData.id}`)
    AppState.liked = false
    // console.log('removed like: ', res.data);
  }

  nullLikes() {
    AppState.liked = false;
  }

}

export const likesService = new LikesService()