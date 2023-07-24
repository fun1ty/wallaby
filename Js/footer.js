// const nonClick = document.querySelectorAll(".non-click");

// function handleClick(event) {
//   // div에서 모든 "click" 클래스 제거
//   nonClick.forEach((e) => {
//     e.classList.remove("click");
//   });
//   // 클릭한 div만 "click"클래스 추가
//   event.target.classList.add("click");
// }

// nonClick.forEach((e) => {
//   e.addEventListener("click", handleClick);
// });

// https://velog.io/@real-bird/Javascript-%ED%81%B4%EB%A6%AD%ED%95%9C-div%EB%A7%8C-%EC%83%89%EC%83%81-%EB%B0%94%EA%BE%B8%EA%B8%B0

// $(".non-click")
//   .each(function (index) {
//     $(this).attr("a-index", index);
//   })
//   .click(function () {
//     /*클릭된 <div>의 menu-index 값을 index 변수에 할당한다.*/
//     var index = $(this).attr("a-index");
//     /*클릭한 <div>에  clicked_menu 클래스 추가*/
//     $(".non-clcik[a-index=" + index + "]").addClass("click");
//     /*그 외 <div>는  clicked_menu 클래스 삭제*/
//     $(".non-click[a-index!=" + index + "]").removeClass("click");
//   });
