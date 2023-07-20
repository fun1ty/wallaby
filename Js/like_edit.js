// const pushHeartBtn = document
//   .querySelector(".heart_icon_top")
//   .addEventListener("click", function (e) {
//     console.log(e.target);
//   });

const heart = document.querySelectorAll(".heart_icon_top");

heart.forEach((bi) => {
  bi.addEventListener("click", changeColor);
});

function changeColor(e) {
  const color = getColor();
  e.target.style.color = color;
  console.log(changeColor(e));
}

function getColor() {
  let color = "#ff0000";
}
