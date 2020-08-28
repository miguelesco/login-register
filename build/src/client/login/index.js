var switchLoginForm = document.getElementById("login");
var switchRegisterForm = document.getElementById("register");
var btn = document.getElementById("btn");
var boxButton = document.getElementById("buttom-box");
var userDataButton = document.getElementById("switch-user-data");
var switchLoginButton = document.getElementById("switch-btn-login");
var btnLogin = document.getElementById("logInBtn");
btnLogin.disabled = true;

var inputs = {
    userId: false,
    password: false
};

// wait until there is a click in the login button and add the class "active",
// after a few seconds he active the class "sucess" or "fail" deppends if
// the back finds the user. And if we not find the user or there is some error 
// in the register form he display the "fail" class and remove the class "active & fail" 
$(document).ready( function(){
    $(".submit-btn").click(function(){
        $(this).addClass("active");
        
        // Logs the user in and creates the labels of data
        logIn()
        .then((response) => {

            $(".submit-btn").addClass("success");

            setTimeout(() => {
                $(".submit-btn").removeClass("active");
                $(".submit-btn").removeClass("success");
                searchUser();
                updateData(response.data, response.id, response.script);
            }, 500);
        })
        .catch((err) => {
            console.error(err);
            $(".submit-btn").addClass("fail");
            
            setTimeout(() => {
                $(".submit-btn").removeClass("active");
                $(".submit-btn").removeClass("fail");
            }, 1500);

        });
    });

});

/**
 * Updates all data of the user
 * @param {object} data 
 * @param {string} id 
 * @param {string|undefined} script 
 */
function updateData(data, id, script) {
    const div = document.getElementById('personal-user');
    
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
function searchUser() {
    switchLoginForm.style.left = "-400px";
    switchRegisterForm.style.left = "50px";
    btn.style.width = "125px";
    boxButton.style.width = "125px";
    userDataButton.style.display = "block";
    switchLoginButton.style.display = "none";
}

function closeSesion() {
    window.location.reload();
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
