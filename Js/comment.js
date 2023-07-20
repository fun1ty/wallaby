"use strict";

const postComment = () => {
  const commentInput = document.getElementById("comment_input");
  const commentPostBtn = document.getElementsByClassName("comment_btn")[0];

  // 댓글 입력시 요소 생성
  const addNewComment = () => {
    const newCommentLocation =
      document.getElementsByClassName("comment_list")[0];
    const newComment = document.createElement("li");

    newComment.innerHTML = `
      <div class="user_desc">
      <b>iAmUser</b>
        <span>${commentInput.value}</span>
        <button><i class="bi bi-suit-heart"></i></button>
        </div>
      </div>
    `;

    newCommentLocation.appendChild(newComment);
    commentInput.value = "";
  };

  // 사용자 입력 들어올 시, 게시 버튼 활성화
  commentInput.addEventListener("keyup", () => {
    commentInput.value
      ? (commentPostBtn.style.opacity = "1")
      : (commentPostBtn.style.opacity = "0.1");
    if (window.event.keyCode === 13 && commentInput.value) {
      addNewComment();
    }
  });

  // 댓글 게시
  commentPostBtn.addEventListener("click", () => {
    if (commentInput.value) {
      addNewComment();
    } else {
      alert("댓글이 입력되지 않았습니다 😳");
    }
  });
};

postComment();

// https://habitual-history.tistory.com/entry/JS-westagram-%EB%8C%93%EA%B8%80-%EA%B2%8C%EC%8B%9C-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84
