$(document).ready(function () {
  let postData = getPostData();
  displayPost(postData);
});

// 게시물 보여주기
function displayPost(post) {
  let postList = document.querySelector("#postList");
  let listItem = document.createElement("div");
  listItem.className = "listItem";

  let commentsByBoardID = groupCommentsByBoardID();

  postList.appendChild(listItem);
  let imgDiv = document.createElement("div");
  imgDiv.className = "imgDiv";
  // 이미지와 내용이 모두 있는 경우에만 추가
  const imageTag = post.img || "";
  const content = post.content;
  const date = post.date;
  const loginId = post.loginId;
  //loginId와 date 담을 div
  let loginAndDateDiv = document.createElement("div");
  //loginId 담기
  let loginIdDiv = document.createElement("div");
  loginIdDiv.className = "loginIdDiv";
  loginIdDiv.innerHTML = `${loginId}`;
  loginAndDateDiv.appendChild(loginIdDiv);
  //div date 담기
  let dateDiv = document.createElement("div");
  dateDiv.innerHTML = `${date}`;
  dateDiv.className = "dateDiv";
  loginAndDateDiv.appendChild(dateDiv);
  listItem.appendChild(loginAndDateDiv);
  //이미지 div 추가
  listItem.appendChild(imgDiv);
  // 이미지가 로드되지 않은 경우에는 이미지 태그를 숨김
  imgDiv.innerHTML = `
        ${
          imageTag
            ? imageTag
            : '<img src="" onerror="this.style.display = \'none\'" />'
        }&nbsp;&nbsp
      `;
  const images = postList.querySelectorAll("img");
  // 이미지의 최대 너비와 높이를 200px로 설정
  images.forEach((img) => {
    img.style.width = "200px";
    img.style.height = "200px";
  });
  //content담을 div
  let contentplusdateDiv = document.createElement("div");
  contentplusdateDiv.className = "contentplusdateDiv";
  //div contents 담기
  let contentDiv = document.createElement("div");
  contentDiv.className = "contentDiv";
  contentDiv.innerHTML = `${content}`;
  contentplusdateDiv.appendChild(contentDiv);
  listItem.appendChild(contentplusdateDiv);

  let comments = getcommentsByBoardID[postItem.boardID] || [];
  displayComments(comments, listItem);

  $("#postList").append(listItem);
  $(".contentplusdateDiv").css({
    "text-align": "center",
  });
  $(".listItem").css({
    "text-align": "center",
  });
  $(".dateDiv").css({
    "font-size": "13px",
    color: "grey",
  });
  $(".contentDiv").css({
    "font-size": "14px",
    "text-align": "left",
  });
  $(".loginIdDiv").css({
    "font-weight": "bold",
  });
}
const url = new URL(window.location.href);
console.log(url);
const boardID = url.searchParams.get("id");
console.log(boardID);

// 특정 게시물의 댓글 데이터를 local storage에서 가져오기
function getCommentsByBoardID(boardID) {
  let comments = localStorage.getItem("comment");
  if (comments) {
    comments = JSON.parse(comments);
    return comments.filter((comment) => comment.boardID === boardID);
  }
  return [];
}

// 댓글을 boardID 별로 그룹화하여 반환
function groupCommentsByBoardID() {
  let comments = localStorage.getItem("comment");
  let groupedComments = {};

  if (comments) {
    comments = JSON.parse(comments);
    comments.forEach((comment) => {
      const boardID = comment.boardID;
      if (!groupedComments[boardID]) {
        groupedComments[boardID] = [];
      }
      groupedComments[boardID].push(...comment.comment);
    });
  }

  return groupedComments;
}

// 특정 게시물의 댓글 표시
function displayComments(comments, listItem) {
  let commentList = document.createElement("ul");
  commentList.className = "commentList";

  comments.forEach((comment) => {
    let commentListItem = document.createElement("li");
    commentListItem.innerHTML = `
      <div class="user_desc">
        <span id="user_id"><b></b></span>
        <span>${comment}</span>
        <button class="like_btn"><i class="bi bi-suit-heart"></i></button>
      </div>
    `;
    commentList.appendChild(commentListItem);
  });

  listItem.appendChild(commentList);

  function getPostData() {
    var postDataJson = localStorage.getItem("postData");
    return JSON.parse(postDataJson) || [];
  }
}
