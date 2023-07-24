let setImageUrl;
let content;

//textarea 글자 입력할때마다 영역 증가
function autoResizeTextArea() {
  const textarea = document.getElementById("textarea");
  textarea.style.height = "auto"; // 높이를 초기화하여 높이 재계산

  // scrollHeight 값을 이용하여 textarea의 높이를 동적으로 조정
  textarea.style.height = textarea.scrollHeight + "px";
}

window.addEventListener("load", autoResizeTextArea);
window.onresize = autoResizeTextArea;

// 이미지 첨부
function insertImage() {
  const imageInput = document.getElementById("imageInput");

  // 이미지 파일을 선택하지 않은 경우
  if (!imageInput.files || !imageInput.files[0]) {
    return;
  }

  const file = imageInput.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const imageUrl = event.target.result;

    // 이미지 태그를 생성하여 에디터에 삽입
    const imageTag = `<img src="${imageUrl}" alt="uploaded image" />`;
    insertHtmlAtCaret(imageTag);

    setImageUrl = imageUrl;

    // 이미지 미리보기를 위해 이미지를 표시
    displayPreviewImage(imageUrl);
  };

  reader.readAsDataURL(file);
}

function displayPreviewImage(imageUrl) {
  // 이미지 미리보기를 위한 img 요소
  const previewImage = document.createElement("img");
  previewImage.src = imageUrl;
  previewImage.style.width = "200px";
  previewImage.style.height = "200px";

  const imageShow = document.getElementById("image-show");

  imageShow.appendChild(previewImage);

  // 이미지를 담을 li 요소 생성
  const liElement = document.createElement("li");
  liElement.appendChild(previewImage);

  //x버튼 보이기
  const create_img_xbtn = `<button class="img_x" id="img_x"><i class="bi bi-x-circle-fill"></i></button>`;
  liElement.innerHTML += create_img_xbtn;

  // li 요소를 이미지 미리보기 영역에 추가
  imageShow.appendChild(liElement);

  // x버튼 누르면 선택된 이미지 제거
  $(".img_x").click(function () {
    // $(this).parent().find("img").remove();
    $(this).parent().remove();
  });

  //x버튼 위치 조정
  const xButton = liElement.querySelector(".img_x");
  xButton.style.cssText = "position: absolute";
}

// 게시물 보여주기
function displayPost(post) {
  let listItem = document.createElement("li");
  // 이미지와 내용이 모두 있는 경우에만 추가
  const imageTag = post.img || "";
  const content = post.content || "";
  const date = post.date;
  listItem.innerHTML = `${imageTag} <p>${content}</p><p class='time'>${date}</p>`;

  // 이미지의 최대 너비와 높이를 200px로 설정
  const images = listItem.querySelectorAll("img");
  images.forEach((img) => {
    img.style.width = "200px";
    img.style.height = "200px";
  });
}

function insertHtmlAtCaret(html) {
  const sel = window.getSelection();
  if (sel.getRangeAt && sel.rangeCount) {
    let range = sel.getRangeAt(0);
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

// x버튼 눌렀을 때 글삭제
function xButton() {
  document.getElementById("textarea").value = "";
  $(".submit").css("color", "grey");
}

// textarea 한글자 이상 입력시 버튼 활성화
const obj = document.getElementById("textarea").value;
window.addEventListener("keydown", (event) => {
  if (obj === null) {
    $(".submit").css("color", "grey");
  }
  $(".submit").css("color", "blue");
});

//현재 날짜, 시간
let now = new Date();
let year = now.getFullYear().toString();
year = year.substr(2, 4);
console.log(year);
let month = now.getMonth();
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();
let settTime = `${year}.${month}.${date} ${hours}:${minutes}:${seconds}`;
console.log(settTime);

//localstorage 에 게시글 저장하고 board.html에 전송
$(".submit").click(function () {
  event.preventDefault();
  // 작성글 추가
  let txt = $("#textarea").val();
  console.log(window.localStorage);
  if (txt.trim() !== "") {
    content = txt;
    $("#textarea").val("");
  } else {
    alert("글을 작성해주세요");
    return false;
  }
  alert("게시글 등록 완료");
  addPost(setImageUrl, content);
});

//postId - 랜덤문자열 생성
const random = (length = 8) => {
  return Math.random().toString(16).substr(2, length);
};
console.log(random());

// 게시물 추가
function addPost(setImageUrl, content) {
  let imageTag = "";
  if (typeof setImageUrl !== "undefined") {
    //이미지 없을때 엑박으로 나오는거 방지
    imageTag = `<img src="${setImageUrl}"  />`;
  }
  let postId = random();
  let post = {
    id: postId,
    date: settTime,
    content: content,
    img: imageTag,
  };
  let posts = getPosts();
  posts.push(post);
  savePosts(posts);
  displayPost(posts);

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
    console.log("보드로 넘어가기");
    location.href = "../html/board.html";
  }
}
