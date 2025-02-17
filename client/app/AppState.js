import { Comment } from "./models/Comment.js"
import { Like } from "./models/Like.js"
import { Post } from "./models/Post.js"
import { EventEmitter } from './utils/EventEmitter.js'
import { isValidProp } from './utils/IsValidProp.js'
import { loadState } from './utils/Store.js'

class ObservableAppState extends EventEmitter {
  page = ''
  user = null
  /** @type {import('./models/Account.js').Account | null} */
  // @ts-ignore
  account = null
  socketData = []


  /** @type {Post[]} */
  posts = []

  /** @type {Post | null} */
  activePost = null

  /** @type {Comment[]} */
  comments = []

  liked = false

  sort = 'likesInv'

  init() {

  }
}

export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})