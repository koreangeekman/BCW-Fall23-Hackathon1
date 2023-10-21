import { AppState } from "../AppState.js";
import { commentsService } from "../services/CommentsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";





function _drawComments() {
    const comments = AppState.comments
    let content = ''
    comments.forEach(comment => content += comment.CommentTemplate)
    setHTML('postDetails', content)
}


export class CommentsController {
    constructor() {
        AppState.on('comments', _drawComments)
        // AppState.on('activePost', this.getCommentsByPostId)
    }

    async createComment(event) {
        try {
            event.preventDefault()
            const form = event.target
            const commentData = getFormData(form)
            // console.log('comment data', commentData);
            await commentsService.createComment(commentData)
            form.reset()
        } catch (error) {
            console.error(error);
            Pop.error(error)
        }
    }

    async getComments() {
        try {
            await commentsService.getComments()
        } catch (error) {
            Pop.error(error)
        }
    }


    async getCommentsByPostId() {
        try {
            await commentsService.getCommentsByPostId()
        } catch (error) {
            console.error(error)
        }
    }
}