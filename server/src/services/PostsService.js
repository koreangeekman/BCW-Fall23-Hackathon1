import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class PostsService {

    async getPosts() {
        const posts = await dbContext.Posts.find().populate('creator likeCount', '-email -subs')
        return posts
    }

    async getPostById(postId) {
        const post = (await dbContext.Posts.findById(postId))
        if (!post) {
            throw new BadRequest(`Invalid Post Id: ${postId}`)
        }
        return post
    }

    // vv AUTHORIZATION REQUIRED BELOW vv

    async createPost(postData) {
        const newPost = await dbContext.Posts.create(postData)
        await newPost.populate('creator', '-email -subs')
        return newPost
    }

    async deletePost(postId, userId) {
        const deletePost = await this.getPostById(postId)
        if (userId != deletePost.creatorId.toString()) {
            throw new Forbidden(`You can't delete a post that isn't yours`)
        }
        await deletePost.remove()
        return `post was deleted! ${deletePost.id}`
    }

}

export const postsService = new PostsService()