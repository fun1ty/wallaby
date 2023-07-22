$(document).ready(function () {
  let posts = getPosts();
  for (let i = 0; i < posts.length; i++) {
    displayPost(posts[i]);
  }
});

// 게시물 보여주기
function displayPost(post) {
  let aElement = document.createElement("a");

  let listItem = document.createElement("li");
  aElement.appendChild(listItem);
  // 이미지와 내용이 모두 있는 경우에만 추가
  // const imageTag = post.img || "";
  const imageTag = post.img;
  const content = post.content || "";
  const date = post.date;
  console.log(imageTag);
  if (typeof imageTag === "undefined") {
    // 이미지가 없는 경우 이미지 부분을 숨김
    listItem.innerHTML = `
    <p>${content}</p>&nbsp
    <p class='time'>${date}</p>
  `;
  } else {
    listItem.innerHTML = `
    ${imageTag}&nbsp;&nbsp
    <p>${content}</p>&nbsp
    <p class='time'>${date}</p>
  `;
    const images = listItem.querySelectorAll("img");

    images.forEach((img) => {
      img.style.width = "200px";
      img.style.height = "200px";
    });
  }

  // listItem.innerHTML = `
  // ${
  //   imageTag
  //     ? imageTag
  //     : `<img src="" alt="uploaded image" style="display: none;" />`
  // }
  // <p>${content}</p>
  // &nbsp;<p class='time'>${date}</p>
  // `;

  // listItem.innerHTML = `${imageTag} <p>${content}</p><p class='time'>${date}</p>`;

  // 이미지의 최대 너비와 높이를 200px로 설정

  $("#postList").append(listItem);
  $("li").css({ display: "flex", "align-items": "center" });
  $("p").css({ display: "block" });
}

function getPosts() {
  var postsJson = localStorage.getItem("posts");
  return JSON.parse(postsJson) || [];
}
