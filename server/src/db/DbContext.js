import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { PostSchema } from '../models/Post.js';
import { LikeSchema } from '../models/Like.js';
import { CommentSchema } from '../models/Comment.js';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Posts = mongoose.model('Post', PostSchema);
  Likes = mongoose.model('Like', LikeSchema);
  Comments = mongoose.model('Comment', CommentSchema)

}

export const dbContext = new DbContext()
