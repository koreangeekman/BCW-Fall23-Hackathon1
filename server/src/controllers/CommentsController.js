import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";


export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .get('', this.getComments)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
            .put('/:commentId', this.updateComment)
            .delete('/:commentId', this.removeComment)
    }

    async getComments(req, res, next) {
        try {
            const comments = await commentsService.getComments()
            return res.send(comments)
        } catch (error) { next(error) }
    }

    // vv AUTHORIZATION REQUIRED BELOW vv

    async createComment(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const comment = await commentsService.createComment(req.body)
            return res.send(comment)
        } catch (error) { next(error) }
    }

    async updateComment(req, res, next) {
        try {
            const updatedComment = await commentsService.updateComment(req.params.commentId, req.body, req.userInfo.id)
            return res.send(updatedComment)

        } catch (error) { next(error) }
    }

    async removeComment(req, res, next) {
        try {
            const results = await commentsService.removeComment(req.params.commentId, req.userInfo.id)
            return res.send(results)
        } catch (error) { next(error) }
    }
}