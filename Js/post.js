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
  listItem.appendChild(imgDiv);

  // 이미지와 내용이 모두 있는 경우에만 추가
  const imageTag = post.img || "";
  const content = post.content;
  const date = post.date;

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

  //content와 date 담을 div
  let contentplusdateDiv = document.createElement("div");

  //div contents 담기
  let contentDiv = document.createElement("div");
  contentDiv.innerHTML = `${content}`;

  //div date 담기
  let dateDiv = document.createElement("div");
  dateDiv.innerHTML = `${date}`;

  contentplusdateDiv.appendChild(contentDiv);
  contentplusdateDiv.appendChild(dateDiv);
  listItem.appendChild(contentplusdateDiv);

  $("#postList").append(listItem);
  $("li").css({ display: "flex", "align-items": "center" });
  $("p").css({ display: "block" });
}

function getPostData() {
  var postDataJson = localStorage.getItem("postData");
  return JSON.parse(postDataJson) || [];
}
