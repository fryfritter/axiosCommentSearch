import React, { useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import axiosInstance from "../util/axios";

const CommentSearch = () => {
  const [postId, setPostId] = useState(0);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = () => {
    // axios(
    //   `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    // ).then((response) => {
    //   setIsLoading(false);
    //   setComments(response.data);
    //   console.log(comments);
    // });

    axiosInstance
      .get("/comments", {
        params: {
          postId,
        },
      })
      .then((response) => {
        setIsLoading(false);
        setComments(response.data);
        console.log(comments);
      });
  };

  const searchComment = () => {
    setIsLoading(true);
    getData();
  };

  const handlePostIdChange = (e) => {
    setPostId(e.target.value);
  };
  return (
    <div>
      comment searcher <br />
      <input onChange={handlePostIdChange}></input>
      <button onClick={searchComment}> submit</button>
      {isLoading && <Loader />}
      <br />
      <br />
      {!isLoading &&
        comments.map((comment) => (
          <div>
            {" "}
            ID : {comment.id} <br />
            Body : {comment.body} <br />
            Email : {comment.email}
            <br />
            <br />
          </div>
        ))}
      {comments.length === 0
        ? `No comments available for postid: ${postId}`
        : ""}
    </div>
  );
};

export default CommentSearch;
