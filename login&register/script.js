var switchLoginForm = document.getElementById("login");
var switchRegisterForm = document.getElementById("register");
var btn = document.getElementById("btn");
var boxButton = document.getElementById("buttom-box");
var dataUser = document.getElementById("dataUser")
var userDataButton = document.getElementById("switch-user-data");
var switchLoginButton = document.getElementById("switch-btn-login");
var switchRegisterButton = document.getElementById("switch-btn-register");
var btnLogin = document.getElementById('logInBtn');
btnLogin.disabled = true;

// wait until there is a click in the login button and add the class "active", after a few seconds he active the class "sucess" or "fail" deppends if the back finds the user. And if we not find the user or there is some error in the register form he display the "fail" class and remove the class "active & fail" 
$(document).ready( function(){
    $(".submit-btn").click(function(){
        $(this).addClass("active")
        setTimeout(function(){
            $(".submit-btn").addClass("fail");
        }, 3700);
        // setTimeout(function(){
        //     $(".submit-btn").removeClass("active");
        //     $(".submit-btn").removeClass("fail");
        //     // $(".submit-btn").removeClass("fail");
        // }, 5000)
    })

    // error css name .fail
});

/**
 * change the page to the register form
 */
function switchRegister(){
    switchLoginForm.style.left = "-400px";
    switchRegisterForm.style.left = "50px";
    btn.style.left = "110px";
}
/**
 * change the page to the login form
 */
function switchLogin(){
    switchLoginForm.style.left = "50px";
    switchRegisterForm.style.left = "450px";
    btn.style.left = "0px";
}

var inputs = {
    userId: false,
    password: false
}
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
/**
 * deppens of the type of user(professional or personal) it change the form in the register page 
 */
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