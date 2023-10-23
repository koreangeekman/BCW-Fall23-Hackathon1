import { AppState } from "../AppState.js"

export class Post {
  constructor(data) {
    this.id = data.id
    this.imgUrl = data.imgUrl
    this.location = data.location
    this.description = data.description
    this.creatorId = data.creatorId
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    this.creator = data.creator
    this.likeCount = data.likeCount || 0
    this.liked = data.liked || false
  }

  get PostCardTemplate() {
    return `
        <section class="row postCard p-3 pb-0 my-3">

          <!-- IMG BODY -->
          <div class="col-12 p-0 imgBody" onclick="app.PostsController.setActivePost('${this.id}')">
            <img class="img-fluid" src="${this.imgUrl}">
          </div>

          <!-- USER PROFILE -->
          <div class="col-12 d-flex justify-content-between align-items-center m-0 p-2 postBody">
            <span class="d-flex align-items-center">
              <span class="d-flex align-items-center pe-3">
              <p class="mb-0 px-2">${this.likeCount}</p>
                <i class="fs-3 mdi mdi-heart-multiple"></i>
              </span>
              <p class="mb-0 commentText">${this.creator.name} • ${this.description}</p>
            </span>
            
            <span class="d-flex align-items-center">
              <span class="d-block px-3">
                <p class="mb-0">${this.creator.name}</p>
                <p class="mb-0">${this.location}</p>
              </span>
              <img alt="${this.creator.name}" src="${this.creator.picture}" height="50px" class="rounded-circle">
            </span>
          </div>

        </section>
    `
  }

  get PostActiveTemplate() {
    return `
    <div class="col-12 col-xxl-8">
      <img class="activeImg rounded" src="${this.imgUrl}" alt="${this.location}">
    </div>
    <div class="col-12 col-xxl-4">
      <span>
        <span class="d-flex justify-content-between align-items-center">
          <h5>At: ${this.location}</h5>
          <span>
            <p class="smallText mb-0">${this.createdAt.toLocaleDateString()}</p>
            <p class="smallText mb-0">${this.updatedAt.toLocaleTimeString()}</p>
          </span>
        </span>
        <p>${this.description}</p>
      </span>
      <hr>
      <section id="commentDetails" class="p-2">
        <!-- DRAW COMMENTS HERE -->
      </section>
      <hr>
      <form onsubmit="app.CommentsController.createComment(event)">
        <div class="form-floating my-3">
          <input required type="text" name="body" class="form-control" id="body"
            placeholder="comment...." maxlength="250">
          <label for="body">Comment</label>
        </div>
        <span class="d-flex justify-content-between align-items-center">
          <button type="submit" class="px-2 btn btn-success">Comment</button>
        </span>
      </form>
      <hr>
    </div>
    `
  }

  // get ifLikedToggle() {
  //   if (this.liked) {
  //     return `
  //       <i type="button" class="liked mdi mdi-heart fs-2 text-danger" onclick="app.LikesController.removeLike()"></i>
  //     `
  //   }
  //   return `
  //       <i type="button" class="liked mdi mdi-heart-outline fs-2 text-danger" onclick="app.LikesController.createLike()"></i>
  //   `
  // }

  get ifLikedShow() {
    if (this.liked) {
      return `
        <i class="fs-3 mdi mdi-heart-multiple"></i>
      `
    }
    return `
        <i class="fs-3 mdi mdi-heart-outline"></i>
    `
  }

  get ComputeDeleteButton() {
    if (AppState.account?.id == this.creatorId) {
      return `
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
            onclick="app.PostsController.removePost()">Delete</button>
            `
    }
    return '&nbsp'
  }

}