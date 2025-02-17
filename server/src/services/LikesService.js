import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class LikesService {
    async getLikes() {
        const likes = await dbContext.Likes.find()
        return likes
    }

    async createLike(likeData) {
        const like = await dbContext.Likes.create(likeData)
        await like.populate('post')
        await like.populate('creator')
        return like
    }

    async getUserLikesByPostId(postId, userId) {
        const likes = await dbContext.Likes.find({ postId: postId, creatorId: userId }).populate('creator', '-email -subs')
        return likes
    }

    async destroyLikes(likeId, userId) {
        const like = await dbContext.Likes.findById(likeId).populate('creator post')
        if (!like) {
            throw new BadRequest(`unable to unlike: ${likeId}`)
        }

        if (like.creatorId != userId) {
            throw new Forbidden(`not allowed`)
        }

        await like.remove()
        // @ts-ignore
        return `${like.creator.name} unliked ${like.post.id}`
    }

}

export const likesService = new LikesService()