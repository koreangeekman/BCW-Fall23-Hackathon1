import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { likesService } from "../services/LikesService.js";

export class LikesController extends BaseController {
    constructor() {
        super('api/likes')
        this.router
            .get('', this.getLikes)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createLike)
            .delete('/:likeId', this.deleteLike)
    }

    async getLikes(req, res, next) {
        try {
            const likes = await likesService.getLikes()
            return res.send(likes)
        } catch (error) {
            next(error)
        }
    }

    async createLike(req, res, next) {
        try {
            const likeData = req.body
            likeData.creatorId = req.userInfo.id
            const like = await likesService.createLike(likeData)
            return res.send(like)

        } catch (error) {
            next(error)
        }
    }

    async deleteLike(req, res, next) {
        try {
            const likeId = req.params.likeId
            const userId = req.userInfo.id
            const message = await likesService.destroyLikes(likeId, userId)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }
}