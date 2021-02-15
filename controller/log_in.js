
//temporary json structure of user
var temp_userList = [
    {
        "user_id": "1",
        "password": "test1",
        "username": "VIP",
        "role" : "VIP"
    },
    {
        "user_id": "2",
        "password": "test2",
        "username": "wait",
        "role" : "waitress"
    },
    {
        "user_id": "3",
        "password": "test3",
        "username": "man",
        "role" : "manager"
    },
    {
        "user_id": "4",
        "password": "test4",
        "username": "bar",
        "role" : "bartender"
    }
];



//
// When page is loading it calls for functions update_view
window.onload = function() {
    update_view_txt();
};



//
//This function iterates through the dictionary content and places the content of the related key on
// the HTML-tags
function update_view_txt() {
    keys_txt = dict["keys_txt"];
    // iterates through the text content
    for (i in keys_txt) {
        key = keys_txt[i];
        $("#" + key).text(get_string(key)); // places content within html-tag with correct ID
    }
}


//
// Very simple login functionality. Takes the values of both username_input and password_input
// then "checks" the login information with if else iteration. If username and password matches
// the role content of the user is sent to function "user_redirect".
function user_login(){
    var username = document.getElementById("username_input").value;
    var password = document.getElementById("password_input").value;

    for(i in temp_userList){
        if( temp_userList[i].username == username &&  temp_userList[i].password == password){
            user_redirect(temp_userList[i].role); // calls function with the users role
        } else {
            document.getElementById("login_error").style.display = "block"; //if wrong information display error message
        }
    }
}

//
// Depending on which role the user has he/she will be directed to the correct new page.
function user_redirect(role){
    if(role == "VIP"){
        window.location.href = "VIP_home.html";
    } else if (role == "waitress"){
        window.location.href = "waitress_home.html";
    }  else if (role == "bartender"){
        window.location.href = "bartender_home.html";
    } else if (role == "manager"){
        window.location.href = "manager_home.html";
    }
}