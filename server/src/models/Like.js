import { Schema } from "mongoose";



export const LikeSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
    postId: { type: Schema.Types.ObjectId, required: true, ref: "Post" }
}, { timestamps: true, toJSON: { virtuals: true } })

LikeSchema.virtual('creator', {
    localField: "creatorId",
    foreignField: "_id",
    justOne: true,
    ref: "Account"
})

LikeSchema.virtual('post', {
    localField: "postId",
    foreignField: "_id",
    justOne: true,
    ref: "Post"
})

LikeSchema.index({ postId: 1, creatorId: 1, { unique: true }})