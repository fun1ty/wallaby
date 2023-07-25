// window.onload = function () {
//   buildCalendar();
// }; // 웹 페이지가 로드되면 buildCalendar 실행

$(document).ready(function () {
  buildCalendar();
});

let nowMonth = new Date(); // 현재 달을 페이지를 로드한 날의 달로 초기화
let today = new Date(); // 페이지를 로드한 날짜를 저장
today.setHours(0, 0, 0, 0); // 비교 편의를 위해 today의 시간을 초기화

// 달력 생성 : 해당 달에 맞춰 테이블을 만들고, 날짜를 채워 넣는다.
function buildCalendar() {
  let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1); // 이번달 1일
  let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0); // 이번달 마지막날

  let tbody_Calendar = document.querySelector(".Calendar > tbody");
  document.getElementById("calYear").innerText = nowMonth.getFullYear(); // 연도 숫자 갱신
  document.getElementById("calMonth").innerText = leftPad(
    nowMonth.getMonth() + 1
  ); // 월 숫자 갱신

  while (tbody_Calendar.rows.length > 0) {
    // 이전 출력결과가 남아있는 경우 초기화
    tbody_Calendar.deleteRow(tbody_Calendar.rows.length - 1);
  }

  let nowRow = tbody_Calendar.insertRow(); // 첫번째 행 추가

  for (let j = 0; j < firstDate.getDay(); j++) {
    // 이번달 1일의 요일만큼
    let nowColumn = nowRow.insertCell(); // 열 추가
  }

  for (
    let nowDay = firstDate;
    nowDay <= lastDate;
    nowDay.setDate(nowDay.getDate() + 1)
  ) {
    // day는 날짜를 저장하는 변수, 이번달 마지막날까지 증가시키며 반복

    let nowColumn = nowRow.insertCell(); // 새 열을 추가하고

    let newDIV = document.createElement("p");
    let newDIV2 = document.createElement("span");
    newDIV.innerHTML = leftPad(nowDay.getDate()); // 추가한 열에 날짜 입력
    nowColumn.appendChild(newDIV);
    nowColumn.appendChild(newDIV2);

    document
      .getElementById("dateInput")
      .addEventListener("keyup", function (event) {
        // Check if the key pressed is "Enter" (key code 13)
        if (event.keyCode === 13) {
          submitNumber();
        }
      });

    document
      .querySelector(".num_submit")
      .addEventListener("click", submitNumber);

    function submitNumber() {
      const dateInput = document.getElementById("dateInput");
      const inputContent = dateInput.value;

      const selectedDate = parseInt(newDIV.innerText);
      const todayDate = today.getDate();

      if (selectedDate === todayDate) {
        if (inputContent.trim() === "") {
          alert("숫자를 입력해주세요.🥺");
          return;
        } else if (inputContent === "0") {
          const dateInputContainer =
            document.getElementById("dateInputContainer");
          dateInputContainer.style.display = "none";

          newDIV2.innerText = "";
        } else {
          if (!newDIV2) {
            newDIV2 = document.createElement("span");
            nowColumn.appendChild(newDIV2);
          }
          newDIV2.innerText = inputContent;
          const dateInputContainer =
            document.getElementById("dateInputContainer");
          dateInputContainer.style.display = "none";
        }
      }
    }

    // document
    //   .querySelector(".num_submit")
    //   .addEventListener("click", function () {
    //     const dateInput = document.getElementById("dateInput");
    //     const inputContent = dateInput.value;

    //     const selectedDate = parseInt(newDIV.innerText);
    //     const todayDate = today.getDate();

    //     if (selectedDate === todayDate) {
    //       // 내용이 안 적혀있을 때
    //       if (inputContent.trim() === "") {
    //         alert("숫자를 입력해주세요.🥺");
    //         return;
    //       }
    //       newDIV2.innerText = inputContent;
    //       const dateInputContainer =
    //         document.getElementById("dateInputContainer");
    //       dateInputContainer.style.display = "none";
    //     }
    //   });

    if (nowDay.getDay() == 6) {
      // 토요일인 경우
      nowRow = tbody_Calendar.insertRow(); // 새로운 행 추가
    }

    if (nowDay < today) {
      // 지난날인 경우
      newDIV.className = "pastDay";
    } else if (
      nowDay.getFullYear() == today.getFullYear() &&
      nowDay.getMonth() == today.getMonth() &&
      nowDay.getDate() == today.getDate()
    ) {
      // 오늘인 경우
      newDIV.className = "today";
      newDIV.onclick = function () {
        choiceDate(this);
      };
    } else {
      // 미래인 경우
      newDIV.className = "futureDay";
      newDIV.onclick = function () {
        choiceDate(this);
      };
    }
  }
}

// 오늘 날짜 눌렀을 때 옆에 게시 뜨게 하는 함수
// let writeBoardMain = document.querySelector("#write_board_main");

// 날짜 선택
function choiceDate(newDIV) {
  if (document.getElementsByClassName("choiceDay")[0]) {
    // 기존에 선택한 날짜가 있으면
    document
      .getElementsByClassName("choiceDay")[0]
      .classList.remove("choiceDay"); // 해당 날짜의 "choiceDay" class 제거
  }
  newDIV.classList.add("choiceDay"); // 선택된 날짜에 "choiceDay" class 추가

  // let selectedDate = new Date(
  //   nowMonth.getFullYear(),
  //   nowMonth.getMonth(),
  //   parseInt(newDIV.innerText)
  // );
  // if (selectedDate.toDateString() === today.toDateString()) {
  //   // window.location.href = "../html/write_board_main.html";
  //   writeBoardMain.style.display = "";
  //   writeBoardMain.style.visibility = "visible";
  // } else {
  //   writeBoardMain.style.display = "none";
  // }

  const selectedDate = parseInt(newDIV.innerText);
  const todayDate = today.getDate();

  // 오늘 날짜 클릭하면
  if (selectedDate === todayDate) {
    const dateInputContainer = document.querySelector("#dateInputContainer");
    dateInputContainer.style.display = "";
  } else {
    const dateInputContainer = document.getElementById("dateInputContainer");
    dateInputContainer.style.display = "none";
  }
}

// 이전달 버튼 클릭
function prevCalendar() {
  nowMonth = new Date(
    nowMonth.getFullYear(),
    nowMonth.getMonth() - 1,
    nowMonth.getDate()
  ); // 현재 달을 1 감소
  buildCalendar(); // 달력 다시 생성
}
// 다음달 버튼 클릭
function nextCalendar() {
  nowMonth = new Date(
    nowMonth.getFullYear(),
    nowMonth.getMonth() + 1,
    nowMonth.getDate()
  ); // 현재 달을 1 증가
  buildCalendar(); // 달력 다시 생성
}

// input값이 한자리 숫자인 경우 앞에 '0' 붙혀주는 함수
function leftPad(value) {
  if (value < 10) {
    value = "0" + value;
    return value;
  }
  return value;
}
