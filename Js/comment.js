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
        <span id="user_id"><b>user</b></span>
        <span>${commentInput.value}</span>
        <button class="like_btn"><i class="bi bi-suit-heart"></i></button>
        <button class="reply_btn">답글</button>
      </div>
    `;

    newCommentLocation.appendChild(newComment);
    commentInput.value = "";

    // 좋아요 버튼 클릭 이벤트 추가
    const likeBtn = newComment.querySelector(".like_btn");
    likeBtn.addEventListener("click", toggleLike);
  };

  // 사용자 입력 들어올 시, 게시 버튼 활성화
  commentInput.addEventListener("keyup", () => {
    commentInput.value
      ? (commentPostBtn.style.opacity = "1")
      : (commentPostBtn.style.opacity = "0.1");
    // enter 키로 댓글 입력
    if (window.event.keyCode === 13 && commentInput.value) {
      addNewComment();
    } else if (window.event.keyCode == 13) {
      alert("댓글이 입력되지 않았습니다 🥺");
    }
  });

  // 클릭으로 댓글 입력
  commentPostBtn.addEventListener("click", () => {
    if (commentInput.value) {
      addNewComment();
    } else {
      alert("댓글이 입력되지 않았습니다 🥺");
    }
  });

  // 좋아요 버튼 토글 함수
  const toggleLike = (e) => {
    const heartIcon = e.currentTarget.querySelector("i");
    const isFilled = heartIcon.classList.contains("bi-suit-heart-fill");

    if (isFilled) {
      heartIcon.classList.remove("bi-suit-heart-fill");
      heartIcon.classList.add("bi-suit-heart");
      heartIcon.style.color = "#000";
    } else {
      heartIcon.classList.add("bi-suit-heart-fill");
      heartIcon.classList.remove("bi-suit-heart");
      heartIcon.style.color = "#FF0000";
    }
  };
};

postComment();

// 댓글 로컬스토리지에 저장 왜 안돼 씨

document.getElementById("comment_wrap").onsubmit = function (e) {
  e.preventDefault();

  let name = document.getElementById("user_id").value;
  let comment = document.getElementById("comment_input").value;

  let commentSave = {
    user: name,
    content: comment,
  };

  let comments = getComment();

  comments.push(commentSave);

  localStorage.setItem("comments", JSON.stringify(comments));

  loadComments();

  document.getElementById("comment_wrap").reset();
};

function getComments() {
  let comments = localStorage.getItem("comments");

  if (comments) {
    return JSON.parse(comments);
  } else {
    return [];
  }
}

function loadComments() {
  let commentList = document.getElementById("commentList");
  commentList.innerHTML = "";

  let comments = getComments();

  for (let i = 0; i < comments.length; i++) {
    let comment = comments[i];

    let listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${comment.user}:</strong>+${comment.content}`;

    commentList.appendChild(listItem);
  }
}
