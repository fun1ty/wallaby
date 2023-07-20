function insertImage() {
  const imageInput = document.getElementById("imageInput");
  const editor = document.getElementById("editor");

  // 이미지 파일을 선택하지 않은 경우
  if (!imageInput.files || !imageInput.files[0]) {
    return;
  }

  const file = imageInput.files[0];
  const file1 = imageInput.files[1];
  const reader = new FileReader();

  reader.onload = function (event) {
    const imageUrl = event.target.result;

    // 이미지 태그를 생성하여 에디터에 삽입
    const imageTag = `<img src="${imageUrl}" alt="uploaded image" />`;
    insertHtmlAtCaret(imageTag);
    // 이미지를 Base64 형식으로 인코딩하여 로컬 스토리지에 저장
    localStorage.setItem("uploadedImage", imageUrl);

    // 이미지 미리보기를 위해 이미지를 표시
    displayPreviewImage(imageUrl);
  };

  reader.readAsDataURL(file);
}

function displayPreviewImage(imageUrl) {
  // 이미지 미리보기를 위한 img 요소
  const previewImage = document.createElement("img");
  previewImage.src = imageUrl;
  previewImage.style.maxWidth = "300px";
  previewImage.style.maxHeight = "300px";

  const imageShow = document.getElementById("image-show");
  imageShow.innerHTML = ""; // 기존 이미지를 모두 제거
  imageShow.appendChild(previewImage);
}

function insertHtmlAtCaret(html) {
  const sel = window.getSelection();
  if (sel.getRangeAt && sel.rangeCount) {
    const range = sel.getRangeAt(0);
    range.deleteContents();

    const el = document.createElement("div");
    el.innerHTML = html;
    const frag = document.createDocumentFragment();
    let node;
    let lastNode;
    while ((node = el.firstChild)) {
      lastNode = frag.appendChild(node);
    }
    range.insertNode(frag);

    // Preserve the selection
    if (lastNode) {
      range = range.cloneRange();
      range.setStartAfter(lastNode);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
}

// function submitPost() {
//   const editor = document.getElementById("editor");
//   const content = editor.innerHTML;
//   // 이제 이 content를 서버로 전송하거나 다른 처리를 수행할 수 있습니다.
//   console.log(content);
// }

// function loadFile(input) {
//   var file = input.files[0]; //선택된 파일 가져오기
//   const textarea = document.getElementById("textarea");
//   const reader = new FileReader();

//   //미리 만들어 놓은 div에 text(파일 이름) 추가
//   var name = document.getElementById("fileName");
//   name.textContent = file.name;

//   //새로운 이미지 div 추가
//   // const previewImage = document.getElementById("previewImage");
//   var newImage = document.createElement("img");
//   newImage.setAttribute("class", "img");

//   //이미지 source 가져오기
//   newImage.src = URL.createObjectURL(file);

//   // newImage.style.width = "70%";
//   // newImage.style.height = "70%";
//   // newImage.style.visibility = "visible"; //버튼을 누르기 전까지는 이미지를 숨긴다
//   // newImage.style.objectFit = "contain";

//   //이미지를 image-show div에 추가
//   // var container = document.getElementById("image-show");
//   // container.appendChild(newImage);

//   reader.onload = function (event) {
//     const imageUrl = event.target.result;

//     // 이미지 태그를 생성하여 textarea에 삽입.
//     const imageTag = `<img src="${imageUrl}" alt="uploaded image" />`;
//     textarea.value += imageTag;
//   };
//   reader.readAsDataURL(file);

//   // var imageTag = `<img src="${newImage.src}" alt="uploaded image" />`;

//   // 이미지 URL을 textarea에 삽입
//   // textarea.value += imageTag;
// }

// var submit = document.getElementById("submitButton");
// submit.onclick = showImage; //Submit 버튼 클릭시 이미지 보여주기

// function showImage() {
//   var newImage = document.getElementById("image-show").lastElementChild;

//   //이미지는 화면에 나타나고
//   newImage.style.visibility = "visible";

//   //이미지 업로드 버튼은 숨겨진다
//   document.getElementById("image-upload").style.visibility = "hidden";

//   document.getElementById("fileName").textContent = null; //기존 파일 이름 지우기
// }

// x버튼 눌렀을 때 글삭제
function xButton() {
  document.getElementById("textarea").value = "";
}

// textarea 한글자 이상 입력시 버튼 활성화
const obj = document.getElementById("textarea").value;
window.addEventListener("keydown", (event) => {
  if (obj != null) {
    $(".submit").css("color", "blue");
  }
  $(".submit").css("color", "grey");
});

//현재 날짜, 시간
let now = new Date();
let year = now.getFullYear();
let month = now.getMonth();
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();
let settTime = `${year}${month}${date}${hours}${minutes}${seconds}`;
console.log(settTime);

//localstorage 에 게시글 저장하고 board.html에 전송

$("#submitButton").click(function () {
  event.preventDefault();
  // const editor = document.getElementById("editor");
  // const content = editor.innerHTML;
  // 이제 이 content를 서버로 전송하거나 다른 처리를 수행할 수 있습니다.
  console.log(content);
  // 작성글 추가
  let txt = $("#editor").val();
  console.log(window.localStorage);
  if (txt.trim() !== "") {
    addPost(txt);
    $("#editor").val("");
  }
  alert("게시글 등록 완료");
});

// 게시물 추가
function addPost(content) {
  let postId = settTime;
  let post = {
    id: postId,
    content: content,
    img: "",
  };
  let posts = getPosts();
  posts.push(post);
  savePosts(posts);
  displayPost();

  // 게시물 목록 저장
  function savePosts(posts) {
    var postsJson = JSON.stringify(posts);
    localStorage.setItem("posts", postsJson);
  }

  // 저장된 게시물 목록 가져오기
  function getPosts() {
    var postsJson = localStorage.getItem("posts");
    return JSON.parse(postsJson) || [];
  }

  // 게시물 보여주기
  function displayPost() {
    location.href = "/Team5_1st_project/html/board.html";
  }
}
