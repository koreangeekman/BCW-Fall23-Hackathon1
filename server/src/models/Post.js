import { Schema } from "mongoose";

export const PostSchema = new Schema({
    imgUrl: {
        type: String, maxLength: 500, required: true, default: "https://images.unsplash.com/photo-1571931264778-8ca45c9bb16d?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    location: { type: String, required: true, maxLength: 50 },
    description: { type: String, required: true, maxLength: 250 },
    // liked: { type: Array, required: false },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
}, { timestamps: true, toJSON: { virtuals: true } })

PostSchema.virtual("creator", {
    localField: "creatorId",
    foreignField: "_id",
    justOne: true,
    ref: "Account"
})

PostSchema.virtual("likeCount", {
    localField: "_id",
    foreignField: "postId",
    count: true,
    ref: "Like"
})