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
    setBevStock();
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
// This function sets the stock list for the manager. It displays the stock for each beverage.
function setBevStock(){
 var stock_list = getStock(); // Fetches the stock array
    var html_list = document.getElementById("beverage_stock_list");

    // This for-loop places each beverage with their ID, name and amount in stock
    for(i in stock_list){
        const liHTML = createLi("", "beverage_line", createP("", "bev_id", get_string("bev_id") + stock_list[i].ID)+
            createP("", "bev_name", get_string("bev_name") + stock_list[i].name) +
            createP("", "bev_amount", get_string("bev_amount") + stock_list[i].amount),
            false);

        html_list.innerHTML += liHTML;
    }
}


//
// TODO: Add amount to each item
// This function sets the list of the removed beverages.
function setRemovedBev(){

    var html_list = document.getElementById("removed_bev_list");
    var removed_beverage_list = getRemovedBev(); // fetches an array of the removed beverages containing name, id, etc.
    clearList(html_list);

    var name;
    var id;

    if(removed_beverage_list != null){ // If it is not empty fill the list with the removed beverages
        for(i in removed_beverage_list){
            id = removed_beverage_list[i][0].articleid; // Sets id to the beverage id within the removed_beverage array
            name = removed_beverage_list[i][0].name; // Sets id to the beverage name within the removed_beverage array
            var elementI = createI(id, "btn", "undoBeverage(id)", get_string("undo"));
           const liHTML = createLi("", "removed_beverage_line", createP("", "removed_bev_id", get_string("bev_id") + id) +
               elementI + createP("", "removed_bev_name", get_string("bev_name") + name), false);

            html_list.innerHTML += liHTML;
         }
    }
}



//
// This function adds an removed beverage back to the menu
function undoBeverage(id){
    if (confirm(get_string("confirm_undo_bev"))) { // Asks the user if (s)he is sure to proceed with adding back the beverage to the menu
        undoRemovedBeverage(id); // Removes the beverage from the removed beverages list
        setRemovedBev(); // updates list
    } else {
        alert(get_string("cancel_undo_bev")); // If user cancels the action a confirmation of the action will appear
    }
}

//
// This function clears the removed beverage list
function clearList(list){
    //This while loop removes the items on the list before applying each removed beverage. the reasoning is so the list do not
    // duplicates if the user enters a new removed beverage
    while( list.firstChild ){
        list.removeChild( list.firstChild );
    }
}

//
// This function enables the manager to remove a beverage from the menu
function removeTemporarilyItem(){
    var article_id = document.getElementById("art_id_remove").value; // fetches value from input
    if (confirm(get_string("confirm_remove_bev"))) { // Asks the user if (s)he is sure to proceed with the removal of the beverage
        if(article_id != ""){
            doit(addToRemovedBeverages(article_id)); // Sends it to the Model function
            setRemovedBev(); //Updates the list
        } else {
            alert("You have to enter a article_id")
        }}else {
        alert(get_string("cancel_undo_bev"));// If user cancels the action a confirmation of the action will appear
    }
}