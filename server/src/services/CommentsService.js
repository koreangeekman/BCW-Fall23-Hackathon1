import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";


async function _getCommentById(commentId) {
    const comment = await dbContext.Comments.findById(commentId);
    if (!comment) { throw new BadRequest(`no comment: ${commentId}`) }
    return comment
}
class CommentsService {
    async getCommentsByPostId(postId) {
        const comments = await dbContext.Comments.find({ postId: postId }).populate('creator', '-email -subs')
        return comments
    }

    async getComments() {
        const comments = await dbContext.Comments.find();
        return comments
    }

    // vv AUTHORIZATION REQUIRED BELOW vv

    async createComment(body) {
        const newComment = await dbContext.Comments.create(body);
        return newComment
    }

    async updateComment(commentId, content, userId) {
        const toBeUpdated = await _getCommentById(commentId);
        if (toBeUpdated.creatorId.toString() != userId) {
            throw new Forbidden('get outta here!')
        }
        toBeUpdated.body = content.body
        toBeUpdated.save();
        return toBeUpdated
    }

    async removeComment(commentId, userId) {
        const toBeDeleted = await _getCommentById(commentId)
        if (toBeDeleted.creatorId.toString() != userId) {
            throw new Forbidden('get outta here!')
        }
        const results = await toBeDeleted.remove()
        return `Deleted, ${results}`
    }


}

export const commentsService = new CommentsService();