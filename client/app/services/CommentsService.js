import { AppState } from "../AppState.js";
import { Comment } from "../models/Comment.js";
import { api } from "./AxiosService.js"

class CommentsService {

    async getCommentsByPostId() {
        const post = AppState.activePost
        const res = await api.get(`api/posts/${post.id}/comments`)
        console.log('created comment', res.data)
        const newComments = res.data.map(pojo => new Comment(pojo))

        AppState.comments = newComments
    }



    async createComment(commentData) {
        const postId = AppState.activePost.id
        commentData.postId = postId;
        const res = await api.post('api/comments', commentData)
        console.log('created comment', res.data);
        const newComment = new Comment(res.data)
        AppState.comments.push(newComment)
        AppState.emit('comments')
    }


    async getComments() {
        const res = await api.get('api/comments')
        console.log('got comments')
        const newComments = res.data.map(commentPOJO => new Comment(commentPOJO))
        AppState.comments = newComments
    }

}

export const commentsService = new CommentsService()