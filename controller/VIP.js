var VIP_id;

//
// This function gives a local variable the users id. The reason why is to be able to access the correct information regarding the user to be displayed.
function setVIPId (){
    VIP_id = localStorage.getItem("user_id");
}

window.onload = function() {
    setVIPId();
    update_view_txt();
    setWelcome();
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
// This function sets the welcome title to the "Welcome (users name)".
function setWelcome(){
    var fullName = getUserFullName(VIP_id);
    $("#welcome_userName").text(fullName);
}