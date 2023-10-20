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
    <div class="col-12 col-md-7 data-bs-toggle="modal"
    data-bs-target="#postFormModal">
    <img class="img-fluid" src="${this.imgUrl}" alt="">
  </div>
  <div class="col-12 col-md-5">
    <h2>At the ${this.location}</h2>
    <h3>On ${this.createdAt.toLocaleDateString()}</h3>
    <h3>At ${this.updatedAt.toLocaleTimeString()}</h3>
    </div>
    `
  }

}