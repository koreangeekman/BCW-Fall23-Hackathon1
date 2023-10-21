export class Comment {
    constructor(data) {
        this.body = data.body
        this.creatorId = data.creatorId
        this.creator = data.creator
        this.postId = data.postId
    }






    get CommentTemplate() {
        return `

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
    <p type="button"><i class="mdi mdi-heart-outline fs-2 text-danger"></i></p>
    </div>
    </div>`
    }
}