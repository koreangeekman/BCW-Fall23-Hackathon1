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
        <div class="commentCard">
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <img class="rounded-circle" height="50px" src="${this.creator.picture}" alt="${this.creator.name}'s pic" >
                    <h5 class="ps-2">${this.creator.name}</h5>
                </div>
                ${this.ComputeDeleteButton}
            </div>
            <p class="ps-5">${this.body}</p>
        </div>
        `
    }

    get ComputeDeleteButton() {
        if (AppState.account?.id == this.creatorId) {
            return `
            <i class="fs-3 text-danger mdi mdi-trash-can" role="button" type="button"
            onclick="app.CommentsController.deleteComment('${this.id}')"></i>
            `
        }
        return ''
    }
}