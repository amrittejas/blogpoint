import React from 'react';

function Post({ post, deletePost, editPost }) {
    return (
        <div className="post" data-id={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>

            <div className="post-actions">
                <button className="edit-btn" onClick={() => editPost(post.id)}>
                    Edit
                </button>
                <button className="delete-btn" onClick={() => deletePost(post.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default Post;
