"use strict";

const postComment = () => {
  const commentInput = document.getElementById("comment_input");
  const commentPostBtn = document.getElementsByClassName("comment_btn")[0];

  let boardID = 1;
  // 댓글 입력시 요소 생성
  const addNewComment = () => {
    const newCommentLocation =
      document.getElementsByClassName("comment_list")[0];
    const newComment = document.createElement("li");

    newComment.innerHTML = `
      <div class="user_desc">
        <span id="user_id"><b></b></span>
        <span>${commentInput.value}</span>
        <button class="like_btn"><i class="bi bi-suit-heart"></i></button>
        <button class="reply_btn">답글</button>
      </div>
    `;

    newCommentLocation.appendChild(newComment);

    // 좋아요 버튼 클릭 이벤트 추가
    const likeBtn = newComment.querySelector(".like_btn");
    likeBtn.addEventListener("click", toggleLike);

    // comments 스토리지에 저장 (린다리더님의 도움의 손길이..🥺)
    // '[{"boardID":1,"comment":["dd"]},{"boardID":2,"comment":["dd"]}]'
    let comments = localStorage.getItem("comment");
    if (comments == "") comments = [];
    else comments = JSON.parse(comments);

    let selected = null;
    for (let comment of comments) {
      if (comment["boardID"] == boardID) selected = comment;
    }
    console.log(selected);
    if (selected == null) {
      const newComment = {
        boardID: boardID,
        comment: [commentInput.value],
      };
      comments.push(newComment);
      localStorage.setItem("comment", JSON.stringify(comments));
    } else {
      selected["comment"].push(commentInput.value);
      localStorage.setItem("comment", JSON.stringify(comments));
    }

    commentInput.value = "";
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

    let likeCount = localStorage.getItem("like");
    if (likes == "") likes = [];
    else likes = JSON.parse(likes);

    let selected = null;
    console.log(selected);
    if (selected == null) {
      const likeBtn = {
        like: [likeCount.cl],
      };
      comments.push(newComment);
      localStorage.setItem("comment", JSON.stringify(comments));
    } else {
      selected["comment"].push(commentInput.value);
      localStorage.setItem("comment", JSON.stringify(comments));
    }

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
