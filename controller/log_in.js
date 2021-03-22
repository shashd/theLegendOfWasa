
//
// When page is loading it calls for functions update_view
window.onload = function() {
    update_view_txt();
};


//
//This function iterates through the dictionary content and places the content of the related key on
// the HTML-tags
function update_view_txt() {
    keys_pic = dict['keys_pic'];
    for (i in keys_pic) {
        pic = keys_pic[i];
        $("#" + pic).attr("src", get_string(pic));
    }
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

    //todo: This function might need to be in the model (loader), to follow MVC.
    var users = get_Users();
    for(i in users){
        if( users[i].username == username &&  users[i].password == password){
            user_redirect(users[i].credentials, users[i].user_id); // calls function with the users role
        }else {
            document.getElementById("login_error").style.display = "block"; //if wrong information display error message
        }
    }
}

//
// Depending on which role the user has he/she will be directed to the correct new page.
function user_redirect(role, id){
    // This line of code stores the users id locally within the browser. Which can then be retrieved with the key "user_id"
    //  once the controller class has changed and the controller class (VIP, waitress, etc.) can display relevant information regarding the user.
    localStorage.setItem("user_id", id);
    if(role == "0"){
        window.location.href = "VIP_home.html";
    } else if (role == "1"){
        window.location.href = "waiter_home.html";
    }  else if (role == "2"){
        window.location.href = "bartender_home.html"; // TODO: Does not exist any more the Waiter and bartender is the same user
    } else if (role == "3"){
        window.location.href = "manager_home.html";
    }
}