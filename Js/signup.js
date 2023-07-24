// id
const input = document.querySelector("#id_box");
const input_one = input.querySelector("input");

// pw
const password = document.querySelector("#pw_box");
const password_one = password.querySelector("input");

// btn
// const form = document.querySelector(".join_btn");
// console.log(form);
// console.log("input id : ", input_one);

//

function handleSubmitId(event) {
  console.log("Start handleSubmitId");

  let currentId = input_one.value;
  let currentPw = password_one.value;

  localStorage.setItem(currentId, currentPw);

  console.log("set item");
}

// function init() {
//   form.addEventListner("click", handleSubmitId);
//   console.log("Login init");
// }

// init();
