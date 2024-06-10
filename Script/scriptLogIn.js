let userEmail = document.getElementById("user_email");
let userPassword = document.getElementById('user_password');
let logInButton = document.getElementById("logInButton");


logInButton.addEventListener('click', ()=>{
    if(userEmail.value == '' || userPassword.value == ''){
        alert('Se deben llenar ambos campos');
    }
})