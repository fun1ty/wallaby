$(document).ready(function () {
  // let txt = localStorage.getItem("txt");
  let posts = getPosts();
  for (let i = 0; i < posts.length; i++) {
    displayPost(posts[i]);
  }
});

// 게시물 보여주기
function displayPost(post) {
  var listItem = document.createElement("li");
  // 이미지와 내용이 모두 있는 경우에만 추가
  const imageTag = post.img || "";
  const content = post.content || "";
  const date = post.date;
  listItem.innerHTML = `${imageTag} <p>${content}</p><p class='time'>${date}</p>`;

  // 이미지의 최대 너비와 높이를 200px로 설정
  const images = listItem.querySelectorAll("img");
  images.forEach((img) => {
    img.style.maxWidth = "150px";
    img.style.maxHeight = "150px";
  });

  $("#postList").append(listItem);
  $("li").css({ display: "flex", "align-items": "center" });
  $("p").css({ display: "block" });
}

function getPosts() {
  var postsJson = localStorage.getItem("posts");
  return JSON.parse(postsJson) || [];
}
