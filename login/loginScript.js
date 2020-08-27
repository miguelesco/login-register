var switchLoginForm = document.getElementById("login");
var switchRegisterForm = document.getElementById("register");
var btn = document.getElementById("btn");
var boxButton = document.getElementById("buttom-box");
var userDataPage = document.getElementById("switch-user-data");
var switchLoginButton = document.getElementById("switch-btn");
var btnLogin = document.getElementById('logInBtn');
btnLogin.disabled = true;

var inputs = {
    userId: false,
    password: false
}

function handleForm(event) { event.preventDefault(); } 
switchLoginForm.addEventListener('submit', handleForm);

function enableButton(text, id) {
    inputs[id] = Boolean(text.value);
    if (inputs.password && inputs.userId) {
        btnLogin.disabled = false;
    }
}

function switchRegister(){
    console.log("fuck");
    switchLoginForm.style.left = "-400px";
    switchRegisterForm.style.left = "50px";
    btn.style.width = "125px"
    boxButton.style.width = "125px";
    userDataPage.style.display = "block"
    switchLoginButton.style.display = "none"
}

function switchLogin(){
    switchLoginForm.style.left = "50px";
    switchRegisterForm.style.left = "450px";
    btn.style.left = "0px";
    switchLoginButton.style.display = "block"
    userDataPage.style.display = "none"
}

function getUserType(){
    var userType = document.getElementById("userType").value;
    var personalUser = document.getElementById("personal-user");
    var professionalUser = document.getElementById("professional-user");
    var containerInput = document.getElementsByClassName("form-box");

    console.log(userType);
    if(userType === 'professional'){
        console.log(containerInput);
        personalUser.style.display = "none";
        professionalUser.style.display = "block";
    }else {
        personalUser.style.display = "block";
        professionalUser.style.display = "none";
    }
}

