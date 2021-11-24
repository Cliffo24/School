var fs = require('fs');
var express = require('express');
var app = express();
var myParser = require("body-parser");
var filename = "./user_data.json";
var queryString = require("query-string");
var cookieParser = require('cookie-parser');
var session = require('express-session');
const { get } = require('http');

app.use(session({secret: "MySecretKey", resave: true, saveUninitialized: true}));

app.use(cookieParser());

app.use(myParser.urlencoded({ extended: true }));

if (fs.existsSync(filename)) {
    data = fs.readFileSync(filename, 'utf-8');

    user_data = JSON.parse(data);
    console.log("User_data=", user_data);

    fileStats = fs.statSync(filename);
    console.log("File " + filename + " has " + fileStats.size + " characters");
} else {
    console.log("Enter the correct filename");
}

app.get("/", function (request, response){
    if(request.session.page_views){
        request.session.page_views++;
        response.send("Welcome back. This is vist # " + request.session.page_views);
    } else {
        request.session.page_views = 1
    }
})

username = 'newuser';
user_data[username] = {};
user_data[username].password = 'newpass';
user_data[username].email = 'newuser@user.com';


app.get("/login", function (request, response) {
    // Give a simple login form
    if(typeof request.session['last_login'] != "undefined"){
        login_time = "Last login was "+ request.session["last_login"];
    } else{
        login_time = "First login";
    }
    my_cookie_name= request.cookies["username"];
    str = `
    login info : ${login_time} 
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
});

app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log("Got a POST to login");
    POST = request.body;

    user_name = POST["username"];
    user_pass = POST["password"];
    console.log("User name=" + user_name + " password=" + user_pass);

    if (user_data[user_name] != undefined) {
        if (user_data[user_name].password == user_pass) {
            // Good login
            request.session['last_login'] = Date();
            response.cookie("username", username, {"maxAge": 10*10000})
            request.session['username'] = user_name;
            response.send("Got a good login");
        } else {
            // Bad login, redirect
            response.send("Sorry bud");
        }
    } else {
        // Bad username
        response.send("Bad username");
    }
});

//Set the cookie with a timer
app.get("/set_cookie", function (request, response) {
    //console.log("Cookies=" + request.cookies);
    my_name = "Clifford Leung";

    response.cookie("My Name", my_name,{maxAge: 5000}).send("Cookie Sent");
}
);
//Use the cookie
app.get("/use_cookie", function (request, response) {
    my_cookie_name = request.cookies["My Name"];

    response.send("User " + my_cookie_name + " recognized");
}
);

app.get("/use_session", function (request, response) {
    
    response.send("Your session ID is " +request.session.id);
}
);

app.get("/register", function (request, response) {
    // Give a simple register form
    
    str = `

<body>
<form action="/register" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
<input type="email" name="email" size="40" placeholder="enter email"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
});

app.post("/register", function (request, response) {
    // process a simple register form
    console.log("Got a POST to register");
    POST = request.body;

    user_name = POST["username"];
    user_pass = POST["password"];
    user_email = POST["email"];

    console.log("User name=" + user_name + " password=" + user_pass);

    user_data[user_name] = {};
    user_data[user_name].name = user_name;
    user_data[user_name].password = user_pass;
    user_data[user_name].email = user_email;

    data = JSON.stringify(user_data);
    fs.writeFileSync(filename, data, "utf-8");

    response.send("User " + user_name + " added!");
});

app.listen(8080, () => console.log(`listening on port 8080`));