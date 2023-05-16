import React from 'react'

const PostComments = () => {
    //  we want to add the comments to the post page
    // we need to get the comments from the backend

    // we need to add the comments to the state of the post page
    // we need to update the comments in the state of the post page
   
    const handleComment = (e) => {

        e.preventDefault();

       const data = new FormData(e.target);
         const content = data.get("content");
        console.log(content);



        api
        .post(`/comments/${_id}/`, {user: currentUser._id, content})
        .then((res) => {
            if (res.data.success) {
                console.log(res.data.data);
                handleCommentsForPost(_id, res.data.data);
            }
        })
        .catch((err) => {
            console.log(err);
        }
        );
    };





  return (
    <div>PostComments
        <form onSubmit={handleComment}>
            <input type="text" name="content" placeholder="content" />
            <button type="submit">Comment</button>
        </form>



    </div>
  )
}

export default PostComments