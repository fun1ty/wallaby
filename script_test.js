const heartIcons = document.querySelectorAll(".heart_icon");

heartIcons.forEach((heart) => {
  heart.addEventListener("click", toggleHeart);
});

function toggleHeart(e) {
  const heartIcon = e.currentTarget.querySelector("i");
  const isFilled = heartIcon.classList.contains("bi-suit-heart-fill");

  if (isFilled) {
    heartIcon.classList.remove("bi-suit-heart-fill");
    heartIcon.classList.add("bi-suit-heart");
    heartIcon.style.color = "#000";
  } else {
    heartIcon.classList.add("bi-suit-heart-fill");
    heartIcon.classList.remove("bi-suit-heart");
    heartIcon.style.color = "#FF0000";
  }
}
