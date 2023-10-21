import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { postsService } from "../services/PostsService.js";
import { likesService } from "../services/LikesService.js";
import { commentsService } from "../services/CommentsService.js";

export class PostsController extends BaseController {
    constructor() {
        super('api/posts')
        this.router
            .get('', this.getPosts)
            .get('/:postId', this.getPostById)
            .get('/:postId/comments', this.getCommentsByPostId)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .get('/:postId/likes', this.getLikesByPostId)
            .post('', this.createPost)
            .put('/:postId', this.updatePost)
            .delete('/:postId', this.deletePost)
    }

    async getPosts(req, res, next) {
        try {

            const posts = await postsService.getPosts()
            return res.send(posts)


        } catch (error) { next(error) }
    }

    async getPostById(req, res, next) {
        try {
            const postId = req.params.postId
            const post = await postsService.getPostById(postId)
            return res.send(post)

        } catch (error) { next(error) }
    }

    async getCommentsByPostId(req, res, next) {
        try {
            const postId = req.params.postId
            const comments = await commentsService.getCommentsByPostId(postId)
            return res.send(comments)
        } catch (error) {
            next(error)
        }
    }

    // vv AUTHORIZATION REQUIRED BELOW vv

    async getLikesByPostId(req, res, next) {
        try {
            const likesByPostId = await likesService.getLikesByPostId(req.params.postId, req.userInfo.id)
            return res.send(likesByPostId)
        } catch (error) {
            next(error)
        }
    }

    async createPost(req, res, next) {
        try {
            const postData = req.body
            postData.creatorId = req.userInfo.id
            const newPost = await postsService.createPost(postData)
            return res.send(newPost)
        } catch (error) { next(error) }
    }

    async updatePost(req, res, next) {
        try {
            const postId = req.params.postId
            const postData = req.body
            const userId = req.userInfo.id
            const updatedPost = await postsService.updatePost(postId, postData, userId)
            return res.send(updatedPost)
        } catch (error) { next(error) }
    }

    async deletePost(req, res, next) {
        try {
            const postId = req.params.postId
            const userId = req.userInfo.id
            const message = await postsService.deletePost(postId, userId)
            return res.send(message)
        } catch (error) { next(error) }
    }
}