var manager_id;

//
// This function is called from the log_in-controller where it sets the users id.
// Which can later be used to retrieve information of the user.
function setManagerId (){
    manager_id = localStorage.getItem("user_id");
}

window.onload = function() {
    setManagerId();
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
    var fullName = getUserFullName(manager_id);
    $("#welcome_userName").text(fullName);
}

//
// This function enables the manager to remove a beverage from the menu
function removeTemporarilyItem(){
    var article_id = document.getElementById("art_id_remove").value; // fetches value from input
    addToRemovedBeverages(article_id); // Sends it to the Model function
}


