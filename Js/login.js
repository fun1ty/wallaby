function handleCredentialResponse(response) {
  console.log("JWT ID token: " + response);

  if (response.credential) {
    let jwt = response.credential;
    let user = JSON.parse(atob(jwt.split(".")[1]));
    console.log(user);

    console.log("ID : " + user.sub);
    console.log("Email : " + user.email);

    // 로컬 스토리지에 저장하기

    let set_token = localStorage.setItem("token", user);

    var my_id = localStorage.setItem("ID", user.sub);
    var my_name = localStorage.setItem("Name", user.name);
    var my_email = localStorage.setItem("Email", user.email);
    console.log("set id info : ", my_id);

    console.log("set id token : ", set_token);

    // 화면에 로그인 한 정보 보이게 하기

    document.getElementById("profile").innerHTML = `
      
      <h2> name : ${user.name}<br>
          <h2>E-mail : ${user.email}<br>
              <img class="mypicture" src="${user.picture}"/><br>`;

    document.getElementById("logout_button").style.display = "block";
    document.getElementById("buttonDiv").style.display = "none";
  }
}

function handleLogout() {
  google.accounts.id.disableAutoSelect();
  localStorage.removeItem("token");
  google.accounts.id.prompt();
  document.getElementById("profile").innerHTML = "";
  document.getElementById("logout_button").style.display = "none";
}

function init() {
  google.accounts.id.initialize({
    client_id:
      "60173758193-md5dvv304s4tkenvv8mfii77tl4uu9cm.apps.googleusercontent.com",
    auto_select: true,
    callback: handleCredentialResponse,
  });

  google.accounts.id.renderButton(
    document.getElementById("buttonDiv"),

    // customization attributes
    { theme: "outline", size: "large", width: 100 }
  );

  google.accounts.id.prompt();
}
