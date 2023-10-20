import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { postsService } from "../services/PostsService.js";



export class PostsController extends BaseController {
    constructor() {
        super('api/posts')
        this.router
            .get('', this.getPosts)
            .get('/:postId', this.getPostById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createPost)
            .delete('/:postId', this.deletePost)
    }

    async createPost(req, res, next) {
        try {
            const postData = req.body
            postData.creatorId = req.userInfo.id
            const post = await postsService.createPost(postData)
            return res.send(post)

        } catch (error) {
            next(error)
        }
    }

    async getPosts(req, res, next) {
        try {

            const posts = await postsService.getPosts()
            return res.send(posts)


        } catch (error) {
            next(error)
        }
    }

    async getPostById(req, res, next) {
        try {

            const postId = req.params.postId
            const post = await postsService.getPostById(postId)
            return res.send(post)

        } catch (error) {
            next(error)
        }
    }


    async deletePost(req, res, next) {
        try {

            const postId = req.params.postId
            const userId = req.userInfo.id
            const message = await postsService.deletePost(postId, userId)
            return res.send(message)


        } catch (error) {
            next(error)
        }
    }
}