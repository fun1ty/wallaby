function loadFile(input) {
  var file = input.files[0]; //선택된 파일 가져오기

  //미리 만들어 놓은 div에 text(파일 이름) 추가
  var name = document.getElementById("fileName");
  name.textContent = file.name;

  //새로운 이미지 div 추가
  var newImage = document.createElement("img");
  newImage.setAttribute("class", "img");

  //이미지 source 가져오기
  newImage.src = URL.createObjectURL(file);

  newImage.style.width = "70%";
  newImage.style.height = "70%";
  newImage.style.visibility = "hidden"; //버튼을 누르기 전까지는 이미지를 숨긴다
  newImage.style.objectFit = "contain";

  //이미지를 image-show div에 추가
  var container = document.getElementById("image-show");
  container.appendChild(newImage);
}

var submit = document.getElementById("submitButton");
submit.onclick = showImage; //Submit 버튼 클릭시 이미지 보여주기

function showImage() {
  var newImage = document.getElementById("image-show").lastElementChild;

  //이미지는 화면에 나타나고
  newImage.style.visibility = "visible";

  //이미지 업로드 버튼은 숨겨진다
  document.getElementById("image-upload").style.visibility = "hidden";

  document.getElementById("fileName").textContent = null; //기존 파일 이름 지우기
}

// x버튼 눌렀을 때 글삭제
function xButton() {
  document.getElementById("textarea").value = "";
}

// textarea 한글자 이상 입력시 버튼 활성화
const obj = document.getElementById("textarea").value;
window.addEventListener("keydown", (event) => {
  $(".submit").css("color", "blue");
  if (obj === null) {
    $(".submit").css("color", "grey");
  }
});

//localstorage 에 게시글 저장하고 board.html에 전송

$("#submit_btn").click(function () {
  event.preventDefault();
  localStorage.clear();
  localStorage.setItem("txt", $("#textarea").val());
  console.log(window.localStorage);
  let txt = localStorage.getItem("txt");

  $.ajax({
    url: "../html/board.html",
    dataType: "html",
    type: "GET",
    data: { txt: txt },
    cache: false, //캐시데이터
    success: function (data) {
      alert("게시글 등록 완료");
      console.log(data);
      location.href = "../html/board.html";
    },
    error: function (error) {
      alert("실패했습니다.");
    },
  });
});
