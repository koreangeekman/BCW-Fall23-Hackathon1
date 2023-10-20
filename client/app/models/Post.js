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
    this.likes = data.likes

  }


  get PostCardTemplate() {
    return `
      <div class="col-12 col-md-5 p-3">
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
          <div class="col-12 p-0 imgBody"><img class="img-fluid"
              src="${this.imgUrl}">
          </div>
          <!-- POST BODY -->
          <div class="col-12 postBody">
            <span class="d-flex justify-content-between">
              <span class="d-flex align-items-center">
                <i class="fs-3 mdi mdi-thumb-up-outline"></i>
                <i class="fs-3 mdi mdi-thumb-up"></i>
                <p class="mb-0">${this.likes}</p>
              </span>
            </span>
            <p class="commentText">${this.creator.name} • ${this.description}</p>

          </div>
          </section>
          </div>
    `
  }

}