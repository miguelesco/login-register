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

async function searchUser(){
    await loading();
    switchLoginForm.style.left = "-400px";
    switchRegisterForm.style.left = "50px";
    btn.style.width = "125px"
    boxButton.style.width = "125px";
    userDataPage.style.display = "block"
    switchLoginButton.style.display = "none"
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


