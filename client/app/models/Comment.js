export class Comment {
    constructor(data) {
        this.body = data.body
        this.creatorId = data.creatorId
        this.creator = data.creator
        this.postId = data.postId
    }






    get CommentTemplate() {
        return `
        <div class="commentArea">
        <h5>${this.creator.name}</h5>
        <p>${this.body}</p>
        </div>`
    }
}