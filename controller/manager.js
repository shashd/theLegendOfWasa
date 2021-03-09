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
    setRemovedBev();
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



function setRemovedBev(){
    var removed_beverages =  JSON.parse(localStorage.getItem("removed_bev"));

    var list = document.getElementById("removed_bev_list");

    if(removed_beverages != null){
        for(i in removed_beverages){
            var id = removed_beverages[i];
            var elementI = createI(id, "btn", "undoBeverage(id)", "undo");
           const liHTML = createLi("", "removed_beverage_line", createP("", "removed_bev_id", "Article ID: " + removed_beverages[i]) +
               elementI, false);

            list.innerHTML += liHTML;
         }
    }
}


function undoBeverage(id){
    if (confirm(get_string("confirm_transfer") + " SEK")) { // Asks the user if (s)he is sure to proceed with the transaction or cancel it
        undoRemovedBeverage(id);
        setRemovedBev();
    } else {
        alert(get_string("cancel_transfer")); // If user cancels transaction a confirmation of the action will appear
    }
}

//
// This function enables the manager to remove a beverage from the menu
function removeTemporarilyItem(){
    var article_id = document.getElementById("art_id_remove").value; // fetches value from input
    if(article_id != ""){
    addToRemovedBeverages(article_id); // Sends it to the Model function
    } else {
        alert("You have to enter a article_id")
    }
}


