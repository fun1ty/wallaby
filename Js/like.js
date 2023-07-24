const heartIcons = document.querySelectorAll(".heart_icon");

heartIcons.forEach((heart) => {
  heart.addEventListener("click", toggleHeart);
});

function toggleHeart(e) {
  const heartIcon = e.currentTarget.querySelector("i");
  const isFilled = heartIcon.classList.contains("bi-suit-heart-fill");

  let likeValue = 0;

  if (isFilled) {
    const icon = document.querySelector(".heart_icon > span");
    icon.remove();

    heartIcon.classList.remove("bi-suit-heart-fill");
    heartIcon.classList.add("bi-suit-heart");
    heartIcon.style.color = "#000";
    console.log(likeValue--);
  } else {
    heartIcon.classList.add("bi-suit-heart-fill");
    heartIcon.classList.remove("bi-suit-heart");
    heartIcon.style.color = "#FF0000";
    likeValue++;
    const icon = document.querySelector(".heart_icon");
    const span = document.createElement("span");
    const text = `좋아요 ${likeValue}개`;
    span.innerText = text;
    icon.append(span);
  }

  // likeCounts = document.createElement("span");
  // likeCounts.innerHTML = `likeValue :`;
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
