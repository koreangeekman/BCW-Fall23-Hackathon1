export class Comment {
    constructor(data) {
        this.id = data.id
        this.body = data.body
        this.creatorId = data.creatorId
        this.creator = data.creator
        this.postId = data.postId
    }






    get CommentTemplate() {
        return `
        <div>
        <div class="d-flex justify-content-between">
        <h5>${this.creator.name}</h5>
        <h5 onclick="app.CommentsController.deleteComment('${this.id}')" class="bg-danger">🗑️</h5>
        </div>
            <p>${this.body}</p>
        </div>`
    }
}