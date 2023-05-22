import React from 'react'

const deletePostComments = () => {

    // we want to delete the comments from the state of post page
    // we need to delete the comments from the backend
    // we need to update the comments in the state of the post page

    const handleDeleteComment = (id) => {
        api
        .delete(`/comments/${id}`)
        .then((res) => {
            if (res.data.success) {
                handleCommentsForPost(_id, res.data.data);
            }

        })

    }

    // and then in the jsx we need to add the delete button to the comments
    // and then we need to add the handleDeleteComment function to the delete button

    <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
    
   
    



  return (
    <div>deletePostComments</div>
  )
}

export default deletePostComments