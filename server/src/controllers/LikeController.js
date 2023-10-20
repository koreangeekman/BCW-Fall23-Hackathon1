import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { likeService } from "../services/LikeService.js";




export class LikesController extends BaseController {
    constructor() {
        super(`api/likes`)
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createLike)
            .delete('/:likeId', this.deleteLike)
    }


    async createLike(req, res, next) {

        try {

            const likeData = req.body
            likeData.creatorId = req.userInfo.id
            const like = await likeService.createLike(likeData)
            return res.send(like)

        } catch (error) {
            next(error)
        }

    }


    async deleteLike(req, res, next) {



        try {

            const likeId = req.params.likeId
            const userId = req.userInfo.id
            const message = await likeService.destroyLikes(likeId, userId)
            return res.send(message)

        } catch (error) {

            next(error)
        }
    }
}