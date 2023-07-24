const heartIcons = document.querySelectorAll(".heart_icon");

heartIcons.forEach((heart) => {
  heart.addEventListener("click", toggleHeart);
});

function toggleHeart(e) {
  const heartIcon = e.currentTarget.querySelector("i");
  const isFilled = heartIcon.classList.contains("bi-suit-heart-fill");

  let likeValue = 0;

  if (isFilled) {
    heartIcon.classList.remove("bi-suit-heart-fill");
    heartIcon.classList.add("bi-suit-heart");
    heartIcon.style.color = "#000";
    likeValue--;
  } else {
    heartIcon.classList.add("bi-suit-heart-fill");
    heartIcon.classList.remove("bi-suit-heart");
    heartIcon.style.color = "#FF0000";
    likeValue++;
  }

  likeCounts = document.createElement("span");
  likeCounts.innerHTML = `likeValue :`;
}

// let likes = localStorage.getItem("like");
// if (likes == "") likes = [];
// else likes = JSON.parse(likes);

// let selected = null;
// for (let like of likes) {
//   if (like["like"] == like) selected = like;
// }
// console.log(selected);
// if (selected == null) {
//   const likeCount = {
//     like: likeValue,
//   };
//   likes.push(likeValue);
//   localStorage.setItem("like", JSON.stringify(likes));
// } else {
//   selected["like"].push(likeValue1);
//   localStorage.setItem("like", JSON.stringify(likes));
// }
