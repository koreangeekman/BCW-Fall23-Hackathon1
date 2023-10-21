import { AppState } from "../AppState.js"

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
       ${this.ComputeDeleteButton}
        </div>
            <p>${this.body}</p>
        </div>
        `
    }


    get ComputeDeleteButton() {
        if (AppState.account?.id == this.creatorId) {
            return `
            <h5 role="button" type="button" onclick="app.CommentsController.deleteComment('${this.id}')" class="bg-danger">🗑️</h5>
            `
        }
        return ''
    }
}