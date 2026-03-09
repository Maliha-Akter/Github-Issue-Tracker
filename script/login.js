document.getElementById("login-btn").addEventListener("click",function(){
    //1. getting the input name and pass first
    const nameInput = document.getElementById("name-input");
    const nameInputShow = nameInput.value;
    console.log(nameInputShow);

    const passInput = document.getElementById("password-input");
    const passInputShow = passInput.value;
    console.log(passInputShow);

    // 2. matching the input 
    if(nameInputShow === 'admin' && passInputShow === "admin123"){
        window.location.assign("home.html");
    }
    else{
        alert("Invalid Username or Password. Please try again.");
        document.getElementById("password-input").value = "";
        window.location.replace("index.html");
        
    }
})