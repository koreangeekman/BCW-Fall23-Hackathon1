
export class Like {
  constructor(data) {
    this.id = data.id || data._id
    this.postId = data.postId
    this.liked = data.liked
  }
}