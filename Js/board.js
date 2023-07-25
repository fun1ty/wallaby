// let globalContents = "";
let boardID = "";

$(document).ready(function () {
  let posts = getPosts();
  let query = new URLSearchParams(location.search);
  for (let i = 0; i < posts.length; i++) {
    displayPost(posts[i]);
  }
});

// 게시물 보여주기
function displayPost(post) {
  let postList = document.querySelector("#postList");
  let listItem = document.createElement("div");
  listItem.className = "listItem";
  console.log(post);

  let aElement = document.createElement("a");
  aElement.className = "aElement";
  aElement.id = `${post.id}`;
  aElement.href = `../html/post.html?id=${post.idx}`;
  aElement.style.textDecoration = "none";
  aElement.style.color = "black";
  aElement.style.display = "flex";
  aElement.style.alignItems = "center";

  postList.appendChild(aElement);
  aElement.appendChild(listItem);
  let imgDiv = document.createElement("div");
  imgDiv.className = "imgDiv";
  aElement.appendChild(imgDiv);

  // 이미지와 내용이 모두 있는 경우에만 추가
  const imageTag = post.img || "";
  const content = post.content;
  globalContents = content;
  const date = post.date;
  const loginId = post.loginId;

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
    img.style.width = "100px";
    img.style.height = "100px";
  });

  //content와 date 담을 div
  let contentplusdateDiv = document.createElement("div");

  //div contents 담기
  let contentDiv = document.createElement("div");
  contentDiv.className = "content";

  //작성글이 너무 많을경우 자르기
  const maxLength = 90; // 최대 길이 설정

  if (content.length > maxLength) {
    const shortText = content.slice(0, maxLength) + "...";
    console.log("content.length: ", content.length);
    console.log(shortText);
    contentDiv.innerHTML = `${shortText}`;
  } else {
    console.log(content);
    contentDiv.innerHTML = `${content}`;
  }

  //div date 담기
  let dateDiv = document.createElement("div");
  dateDiv.className = "date";
  dateDiv.innerHTML = ` ${date} `;

  let loginIdDiv = document.createElement("div");
  loginIdDiv.className = "loginId";
  loginIdDiv.innerHTML = `${loginId}`;

  contentplusdateDiv.appendChild(contentDiv);
  contentplusdateDiv.appendChild(loginIdDiv);
  contentplusdateDiv.appendChild(dateDiv);
  aElement.appendChild(contentplusdateDiv);

  $("#postList").append(listItem);

  //css 동적으로 적용
  $(".loginId").css({ color: "black", "font-size": "14px" });
  $(".date").css({ color: "grey", "font-size": "13px" });
}

// 클릭이벤트 발생 시 로컬스토리지에 해당 post데이터 넣기
$("#postList").on("click", ".aElement", function () {
  let postID = $(this).attr("id");

  let contents = $(this).find(".content").text();
  console.log(contents);
  let image = $(this).find("img").attr("src");
  let loginID = $(this).find(".loginId").text();
  // 이미지 태그를 생성하여 로컬스토리지에 삽입
  const imageTag = `<img src="${image}" alt="postImg" />`;
  let date = $(this).find(".date").text();

  let postData = {
    id: postID,
    content: contents,
    img: imageTag,
    date: date,
    loginId: loginID,
  };

  window.localStorage.setItem("postData", JSON.stringify(postData));
});

function getPosts() {
  var postsJson = localStorage.getItem("posts");
  return JSON.parse(postsJson) || [];
}
