$(document).ready(function () {
  let postData = getPostData();
  displayPost(postData);
});
// 게시물 보여주기
function displayPost(post) {
  let postList = document.querySelector("#postList");
  let listItem = document.createElement("div");
  listItem.className = "listItem";
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

  const url = new URL(window.location.href);
  console.log(url);
  const boardID = url.searchParams.get("id");
  console.log(boardID);
  if (boardID == id) {
    let commetList = querySelector("#commentList");
    let commentDiv = document.createElement("li");
    commentDiv.className = "commentDiv";
    commentDiv.innerHTML = `${comment}`;
    commetList.appendChild(commentDiv);
  }
}
function getPostData() {
  var postDataJson = localStorage.getItem("postData");
  return JSON.parse(postDataJson) || [];
}
