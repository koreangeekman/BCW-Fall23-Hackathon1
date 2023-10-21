import { AppState } from "../AppState.js";
import { commentsService } from "../services/CommentsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawComments() {
    const comments = AppState.comments
    let content = ''
    comments.forEach(comment => content += comment.CommentTemplate)
    setHTML('commentDetails', content)
}


export class CommentsController {
    constructor() {
        AppState.on('activePost', this.getCommentsByPostId)
        AppState.on('comments', _drawComments)
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
    async deleteComment(commentId) {
        try {
            const wantsToDelete = await Pop.confirm('Are you sure about that?')
            if (!wantsToDelete) {
                return
            }
            await commentsService.deleteComment(commentId)
        } catch (error) {
            Pop.error(error)
            console.error(error);
        }
    }

}