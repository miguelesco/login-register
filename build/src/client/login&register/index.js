var switchLoginForm = document.getElementById("login");
var switchRegisterForm = document.getElementById("register");
var btn = document.getElementById("btn");
var boxButton = document.getElementById("buttom-box");
var dataUser = document.getElementById("dataUser");
var userDataButton = document.getElementById("switch-user-data");
var switchLoginButton = document.getElementById("switch-btn-login");
var switchRegisterButton = document.getElementById("switch-btn-register");
var btnLogin = document.getElementById('logInBtn');
btnLogin.disabled = true;

// wait until there is a click in the login button and add the class "active",
// after a few seconds he active the class "sucess" or "fail" deppends if
// the back finds the user. And if we not find the user or there is some error 
// in the register form he display the "fail" class and remove the class "active & fail" 
$(document).ready( function(){
    $("#logInBtn").click(function(){
        clickBtn(true);
    });

    $("#register-btn").click(function(){
        clickBtn(false);
    });

});

function clickBtn(isLogin) {
    $(this).addClass("active");

    const btnClass = isLogin ? '.submit-btn' : '.register-btn';
        
    // Logs the user in and creates the labels of data
    (isLogin ? logIn : register)()
    .then((response) => {

        $(btnClass).addClass("success");

        setTimeout(() => {
            $(btnClass).removeClass("active");
            $(btnClass).removeClass("success");
            searchUser(false);
            updateData(response.data, response.id, response.script);
        }, 500);
    })
    .catch((err) => {
        console.error(err);
        $(btnClass).addClass("fail");
        
        setTimeout(() => {
            $(btnClass).removeClass("active");
            $(btnClass).removeClass("fail");
        }, 1500);

    });
}

/**
 * block the login button until the info has been filled 
 */
function handleForm(event) { event.preventDefault(); } 
switchLoginForm.addEventListener('submit', handleForm);

/**
 * Updates all data of the user
 * @param {object} data 
 * @param {string} id 
 * @param {string|undefined} script 
 */
function updateData(data, id, script, type) {

    const div = document.getElementById(type === 'professional' ? 'professional-user-info' : 'personal-user-info');
    
    Object.entries(data)
    .forEach(([key, value]) => {
        createLabel(div, key, value);
    });

    createLabel(div, 'id', id);

    if (script) {
        createLabel(div, 'script', script);
    }
}

/**
 * Creates a label of data
 * @param {HTMLElement} div The container where the data will be visible
 * @param {string} name The name of the data
 * @param {string} value The value of the data
 */
function createLabel(div, name, value) {
    const label = document.createElement('label');
    label.innerHTML = `${name.toUpperCase()}: ${value}`;
    label.setAttribute('class', 'text-drop-menu');
    div.appendChild(label);

    const divWhiteLine = document.createElement('div');
    divWhiteLine.setAttribute('class', 'white-line');
    div.appendChild(divWhiteLine);
    
    const divSpace = document.createElement('div');
    divSpace.setAttribute('class', 'space');
    div.appendChild(divSpace);
}

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


function enableButton(text, id) {
    inputs[id] = Boolean(text.value);
    btnLogin.disabled = !Boolean(inputs.password && inputs.userId);
}
/**
 * Change the page to watch the user Data
 */
function searchUser(isLogin){
    if(!isLogin){
        switchRegisterForm.style.left = "450px";
        btn.style.left = "0px";
    }
    switchLoginForm.style.left = "-400px";
    dataUser.style.left = "50px";
    btn.style.width = "125px";
    boxButton.style.width = "125px";
    dataUser.style.display = "block";
    userDataButton.style.display = "block";
    switchLoginButton.style.display = "none";
    switchRegisterButton.style.display = "none";
}

function closeSesion(){
    window.location.reload();
}

/**
 * deppens of the type of user(professional or personal) it change the form in the register page 
 */
function changeUserTypeRegister(){
    var userType = document.getElementById("userTypeRegister").value;
    var personalUser = document.getElementById("personal-user");
    var professionalUser = document.getElementById("professional-user");
    var containerInput = document.getElementsByClassName("form-box");

    if(userType === 'professional'){
        personalUser.style.display = "none";
        professionalUser.style.display = "block";
    }else {
        personalUser.style.display = "block";
        professionalUser.style.display = "none";
    }
}

/**
 * Make a fetch call to the backend to log in the user
 */
async function logIn() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var body = JSON.stringify(
        {
            id: document.getElementById('id').value, 
            password: document.getElementById('password').value,
            type: document.getElementById("userTypeLogin").value
        });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body,
        redirect: 'follow'
    };

    try {
        let response = await fetch("http://localhost:3001/api/login", requestOptions);
        if (response.status !== 200) throw await response.text();
        return response.json();
    } catch (err) {
        throw err;
    }
}

/**
 * Make a fetch call to the backend to register the user
 */
async function register() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const userType = document.getElementById("userTypeRegister").value;
    let body;

    if (userType === 'professional') {
        body = JSON.stringify(
            {
                data: {
                    website: document.getElementById('website').value,
                    url1: document.getElementById('url1').value,
                    message1: document.getElementById('url2').value,
                    url2: document.getElementById('url2').value,
                    message2: document.getElementById('message2').value
                },
                password: document.getElementById('passwordPro').value,
                type: userType 
            }
        );
    } else {
        body = JSON.stringify(
            {
                data: {
                    gender: document.getElementById('gender').value, 
                    age: Number(document.getElementById('age').value),
                    location: document.getElementById('location').value
                },
                password: document.getElementById('passwordPer').value,
                type: userType 
            }
        );
    }

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body,
        redirect: 'follow'
    };

    try {
        let response = await fetch("http://localhost:3001/api/register", requestOptions);
        if (response.status !== 200) throw await response.text();
        return response.json();
    } catch (err) {
        throw err;
    }
}