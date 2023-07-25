"use strict";

let boardID = "";

//postId - 랜덤문자열 생성
const random = (length = 8) => {
  return Math.random().toString(16).substr(2, length);
};
console.log(random());

// 저장된 사용자 정보 가져오기
let savedUserId = localStorage.getItem("id");
if (savedUserId === null) {
  savedUserId = `익명의 왈라비${random()}`;
}

//현재 날짜, 시간
let now = new Date();
let year = now.getFullYear().toString();
year = year.substr(2, 4);
console.log(year);
let month = now.getMonth();
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();
let settTime = `${year}.${month}.${date} ${hours}:${minutes}:${seconds}`;
console.log(settTime);

$(document).ready(function () {
  //boardID 확인하기
  let query = new URLSearchParams(location.search);
  let comments = localStorage.getItem("comment");
  boardID = query.get("id");

  console.log(query);
  console.log("실행-1");
  if (comments == "") comments = [];
  else comments = JSON.parse(comments);

  // 현재 페이지에 해당하는 댓글 데이터만 필터링
  const currentComments = comments.filter(
    (comment) => comment.boardID == boardID
  );

  // 댓글을 최신순으로 정렬
  currentComments.forEach((commentData) => {
    commentData.comment.reverse(); // 댓글 배열을 뒤집어서 최신순으로 정렬
  });

  console.log("실행0");
  console.log("currentComments", currentComments);

  const commentList = $(".commentList_ul");

  // 댓글 데이터를 화면에 추가
  currentComments.forEach((commentData) => {
    commentData.comment.forEach((commentText) => {
      let liElement = document.createElement("li");
      liElement.innerHTML = `<div>${savedUserId}</div>
      <div>${commentText}</div>
      <div>${settTime}</div>
      <button class="like_btn"><i class="bi bi-suit-heart"></i></button>`;
      commentList.prepend(liElement);
      liElement.className = "newComment";
      liElement.style.display = "flex";
      liElement.style.justifyContent = "space-evenly";
    });
  });
  // // 좋아요 버튼 클릭 이벤트 추가
  // const likeBtn = liElement.querySelector(".like_btn");
  // likeBtn.addEventListener("click", () => {
  //   toggleLike(commentData);
  // });

  console.log("배열실행");
  postComment();
});

const postComment = () => {
  console.log("실행2");
  const commentInput = document.getElementById("comment_input");
  const commentPostBtn = document.getElementsByClassName("comment_btn")[0];
  // 리더님의 도움이..

  // 댓글 입력시 요소 생성
  const addNewComment = () => {
    const newCommentLocation =
      document.getElementsByClassName("commentList_ul")[0];

    // const liElement = document.createElement("li");
    const newComment = document.createElement("li");
    newComment.className = "newComment";
    newComment.style.display = "flex";
    newComment.style.justifyContent = "space-evenly";
    newComment.innerHTML = `
        <div>${savedUserId}</div>
        <div>${commentInput.value}</div>
        <div>${settTime}</div>
        <button class="like_btn"><i class="bi bi-suit-heart"></i></button>
    `;

    newCommentLocation.prepend(newComment);

    console.log("실행3");
    newCommentLocation.appendChild(newComment);

    // 좋아요 버튼 클릭 이벤트 추가
    const likeBtn = newComment.querySelector(".like_btn");
    likeBtn.addEventListener("click", toggleLike);

    // comments 스토리지에 저장 (린다리더님의 도움의 손길이..🥺)
    let comments = localStorage.getItem("comment");
    if (comments === "") comments = [];
    else comments = JSON.parse(comments);

    let selected = null;
    const currentBoardId = comments.filter(
      (comment) => comment.boardID == boardID
    );

    for (let comment of comments) {
      if (comment["boardID"] == boardID) selected = comment;
    }
    console.log(selected);

    if (currentBoardId.length === 0) {
      const newComment = {
        boardID: boardID,
        comment: [commentInput.value],
        userId: savedUserId,
      };
      comments.push(newComment);
    } else {
      selected["comment"].push(commentInput.value);
    }
    // comments를 문자열로 변환하여 저장
    localStorage.setItem("comment", JSON.stringify(comments));

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
    } else if (window.event.keyCode === 13) {
      // alert("댓글이 입력되지 않았습니다 🥺");
    }
  });

  // 클릭으로 댓글 입력
  commentPostBtn.addEventListener("click", () => {
    if (commentInput.value) {
      addNewComment();
    } else {
      // alert("댓글이 입력되지 않았습니다 🥺");
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
