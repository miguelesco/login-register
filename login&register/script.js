var switchLoginForm = document.getElementById("login");
var switchRegisterForm = document.getElementById("register");
var btn = document.getElementById("btn");
var boxButton = document.getElementById("buttom-box");
var dataUser = document.getElementById("dataUser")
var userDataButton = document.getElementById("switch-user-data");
var switchLoginButton = document.getElementById("switch-btn-login");
var switchRegisterButton = document.getElementById("switch-btn-register");
var btnLogin = document.getElementById('logInBtn');


function switchRegister(){
    switchLoginForm.style.left = "-400px";
    switchRegisterForm.style.left = "50px";
    btn.style.left = "110px";
}
function switchLogin(){
    switchLoginForm.style.left = "50px";
    switchRegisterForm.style.left = "450px";
    btn.style.left = "0px";
}

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

async function searchUser(){
    await loading();
    switchLoginForm.style.left = "-400px";
    dataUser.style.left = "50px";
    btn.style.width = "125px"
    boxButton.style.width = "125px";
    dataUser.style.display = "block";
    userDataButton.style.display = "block"
    switchLoginButton.style.display = "none"
    switchRegisterButton.style.display = "none"
}

async function loading() {
    var stopAnimation;
    var checkAnimationTime;
    btnLogin.focus({animation: 'spin ' + stopAnimation + 's' + '500ms' + 'forwards'});
    btnLogin.focus(svg, {animation: 'check ' + '500ms ' + checkAnimationTime + 'ms ' + 'forwards'})
}

function closeSesion(){
    window.location.reload();
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