$(document).ready(function () {
  // let txt = localStorage.getItem("txt");
  let posts = getPosts();
  for (let i = 0; i < posts.length; i++) {
    displayPost(posts[i]);
  }
});

// 게시물 보여주기
function displayPost(post) {
  var listItem = $("<li>").addClass("post").text(post.content);
  $("#board_ul").append(listItem);
}

function getPosts() {
  var postsJson = localStorage.getItem("posts");
  return JSON.parse(postsJson) || [];
}
