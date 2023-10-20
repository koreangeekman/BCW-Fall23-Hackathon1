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
              src="${this.imgUrl}">
            <span class="d-block">
              <p class="mb-0">${this.creatorId.name}</p>
              <p class="mb-0">${this.location}</p>
            </span>
          </div>
          <!-- IMG BODY -->
          <div class="col-12 p-0 imgBody"><img class="img-fluid"
              src="https://images.unsplash.com/photo-1594329852649-012d9528deda?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2NlbmljfGVufDB8fDB8fHww">
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
            <p class="">${this.creatorId.name} • ${this.description}</p>

          </div>
          </section>
          </div>
    `
  }

}