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

// wait until there is a click in the login button and add the class "active", after a few seconds he active the class "sucess" or "fail" deppends if the back finds the user. And if we not find the user or there is some error in the register form he display the "fail" class and remove the class "active & fail" 
$(document).ready( function(){
    $(".submit-btn").click(function(){
        $(this).addClass("active")
        setTimeout(function(){
            $(".submit-btn").addClass("success");
        }, 3700);
        setTimeout(function(){
            $(".submit-btn").removeClass("active");
            $(".submit-btn").removeClass("success");
            // $(".submit-btn").removeClass("fail");
        }, 5000)
    })

    // error css name .fail
});

/**
 * block the login button until the info has been filled 
 */
function handleForm(event) { event.preventDefault(); } 
switchLoginForm.addEventListener('submit', handleForm);

function enableButton(text, id) {
    inputs[id] = Boolean(text.value);
    btnLogin.disabled = !Boolean(inputs.password && inputs.userId);
}

/**
 * Change the page to watch the user Data
 */
function searchUser(){
    switchLoginForm.style.left = "-400px";
    dataUser.style.left = "50px";
    btn.style.width = "125px"
    boxButton.style.width = "125px";
    dataUser.style.display = "block";
    userDataButton.style.display = "block"
    switchLoginButton.style.display = "none"
    switchRegisterButton.style.display = "none"
}

function closeSesion(){
    window.location.reload();
}


