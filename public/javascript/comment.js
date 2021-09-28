let deleteCommentEl = document.querySelectorAll(".fa-trash-alt")

async function commentFormHandler(event) {
    event.preventDefault();
  
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
  
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            document.location.reload();
        } 
        else {
            alert(response.statusText);
        }
    }
}

async function deleteComment(event){
    //if button is clicked, delete the element with that id from the db
    const commentId = this.getAttribute("data-id");
    const response = await fetch('/api/comments/'+commentId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    if (response.ok) {
        document.location.reload();
    } 
    else {
        alert(response.statusText);
    }

}

deleteCommentEl.forEach((button)=>{
    button.addEventListener("click", deleteComment);
})
  
document.querySelector('.add-comment-form').addEventListener('submit', commentFormHandler);
