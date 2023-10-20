import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";




class LikeService {

    async createLike(likeData) {
        const like = await dbContext.Likes.create(likeData)
        await like.populate('post')
        await like.populate('creator')
        return like
    }

    // async getLikesByPostId(postId) {
    //     const likes = await dbContext.Likes.find({ postId: postId }).populate('creator', '-email -subs')
    //     return likes
    // }



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