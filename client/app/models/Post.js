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
    this.likeCount = data.likeCount
  }

  get PostCardTemplate() {
    return `
      <div class="col-7 m-5">
        <section class="row card">

          <!-- USER PROFILE -->
          <div class="col-12 userProfile d-flex align-items-center">
            <img height="69" alt="UserName"
              src="${this.creator.picture}" class="rounded-circle p-3">
            <span class="d-block">
              <p class="mb-0">${this.creator.name}</p>
              <p class="mb-0">${this.location}</p>
            </span>
          </div>

          <!-- IMG BODY -->
          <div onclick="app.PostsController.setActivePost('${this.id}')" class="col-12 p-0 imgBody"><img class="img-fluid"
              src="${this.imgUrl}">
          </div>

          <!-- POST BODY -->
          <div class="col-12 postBody">
            <span class="d-flex justify-content-between">
              <span class="d-flex align-items-center">
                <i class="fs-3 mdi mdi-thumb-up-outline"></i>
                <i class="fs-3 mdi mdi-thumb-up"></i>
                <p class="mb-0">${this.likeCount}</p>
              </span>
            </span>
            <p class="commentText">${this.creator.name} • ${this.description}</p>

          </div>
        </section>
      </div>
    `
  }


  get PostActiveTemplate() {
    return `
    <div class="col-12 col-md-7 data-bs-toggle="modal" data-bs-target="#postFormModal">
      <img class="activeImg" src="${this.imgUrl}" alt="">
    </div>
    <section id="commentDetails" class="row"></section>
    <div class="col-12 col-md-5">
      <span class="d-flex justify-content-between align-items-center">
        <h5>At: ${this.location}</h5>
        <span>
          <p class="smallText mb-0">${this.createdAt.toLocaleDateString()}</p>
          <p class="smallText mb-0">${this.updatedAt.toLocaleTimeString()}</p>
        </span>
      </span>
      <form onsubmit="app.CommentsController.createComment(event)">
        <div class="form-floating mb-3">
          <input required type="text" name="body" class="form-control" id="body"
            placeholder="comment...." maxlength="250">
          <label for="body">Comment</label>
          <div class="d-flex justify-content-between">
            <button type="submit" class="p-2 btn btn-success">Comment</button>
          </div>
        </div>
      </form>
      <i type="button" class="mdi mdi-heart-outline fs-2 text-danger"></i>
      </div>
    </div>
    `
  }

}