const commentBox = document.querySelector("#commentBox");

// commentBox.addEventListener("submit", function (e) {
//   e.preventDefault();
//   const usernameInput = document.querySelector(".username");
//   const commentInput = document.querySelector(".comment");
//   console.log(usernameInput.value, commentInput.value);
// });

const username = document.querySelector(".username");
console.log(username);

const comment = commentBox.elements.comment.value;

const newComment = document.createElement("li");
const bTag = document.createElement("b");
bTag.append(username);
newComment.append(bTag);
newComment.append(`- ${comment}`);
console.log(newComment);
