// ---------- Register ----------

function register() {

    let name = document.getElementById("registerName").value.trim();
    let email = document.getElementById("registerEmail").value.trim();
    let password = document.getElementById("registerPassword").value.trim();

    if (name === "" || email === "" || password === "") {
        alert("Please fill all fields.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let exists = users.find(user => user.email === email);

    if (exists) {
        alert("Email already registered.");
        return;
    }

    users.push({
        name,
        email,
        password
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful!");

    window.location.href = "index.html";
}


// ---------- Login ----------

function login() {

    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let validUser = users.find(user =>
        user.email === email &&
        user.password === password
    );

    if (validUser) {

        localStorage.setItem("loggedInUser", JSON.stringify(validUser));

        window.location.href = "home.html";

    } else {

        alert("Invalid Email or Password.");

    }

}


// ---------- Home Page ----------

function checkLogin() {

    let user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) {

        window.location.href = "index.html";
        return;

    }

    document.getElementById("welcomeUser").innerHTML =
        "Hello, " + user.name + " 👋";

}


// ---------- Logout ----------

function logout() {

    localStorage.removeItem("loggedInUser");

    alert("Logged Out Successfully.");

    window.location.href = "index.html";

}