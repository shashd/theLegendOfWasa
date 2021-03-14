var removed_beverages =[];

function addToSet(set, item) {
    if (!set.includes(item)) {
        set.push(item);
    }
    return set;
}

function allBeverages() {
    // This is the array that will be returned containing all the beverages
    var collector = [];

    var removed_beverages = JSON.parse(localStorage.getItem("removed_bev")); // fetches from local storage and parses it from JSON so it can be used as an array

    for (i in DB2.spirits) {
        if(removed_beverages != null) { // If the removed beverages is not empty
            if (!removed_beverages.some(r => DB2.spirits[i].articleid.includes(r))) {// checks if there beverage id is not within the removed array
                collector.push([DB2.spirits[i]]);
            }
        }else{ // If the removed_beverages was empty then all beverages could be added and displayed
            collector.push([DB2.spirits[i]]);
        }
    };
    return collector;
}

//
// This functions returns an array containing solely the user information.
function get_Users(){
    var users = [];
    for(i in DB.users){
        users[i] = DB.users[i];
    }
    return users;
}

//
// This function returns the users full name to be displayed after the user has logged in to the system.
function getUserFullName(id){
    var fullName;
    for(i in DB.users){
        if(DB.users[i].user_id == id){
            fullName = DB.users[i].first_name + " " + DB.users[i].last_name;
        }
    }
    return fullName;
}

//
// This function returns the users full name to be displayed after the user has logged in to the system.
function getBalance(id){
    var balance = "0";
    for(i in DB.account){
        if(DB.account[i].user_id == id){
            balance = DB.account[i].creditSEK;
        }
    }
    return balance;
}

//
// This function returns an array with the users order history.
function getOrderHistory(id){
    var oHistory = [];
    var tempString;
    for(i in DB.sold){ // firstly iterates through the sold (order history)
        if(DB.sold[i].user_id == id){
            for(j in DB2.spirits){ // iterates through the beverages
             if(DB.sold[i].articleid == DB2.spirits[j].articleid){
              tempString = { name : DB2.spirits[j].name , date : DB.sold[i].timestamp} // adds the name and the date of the order
             }
            }
            oHistory.push(tempString);
        }
    }
    return oHistory;
}

//
// This function updates the balance of a specific VIP-guest.
function changeBalance(id, added_amount_str) {

    for (i = 0; i < DB.account.length; i++) {
        if (DB.account[i].user_id == id) { // checks the id to change balance on correct VIP
            var curr_balance_str = DB.account[i].creditSEK;
            var added_amount_int = parseInt(added_amount_str); // parse into integer so it can be added
            var curr_amount_int = parseInt(curr_balance_str); // parse into integer so it can be added

            var new_balance = curr_amount_int + added_amount_int;

            DB.account[i].creditSEK = new_balance;
        }
    }
}

//
// This functions returns a list containing all the elements of an beverage (name, id, strength, etc), but solely the ones that are removed from the menu
function getRemovedBev(){
    var removed_beverages_temp =  JSON.parse(localStorage.getItem("removed_bev")); // fetches removed beverages from local storage
    var removed_beverages = [];

    for (i in DB2.spirits) {
        if(removed_beverages_temp != null) { // If the removed beverages is not empty
            if (removed_beverages_temp.some(r => DB2.spirits[i].articleid.includes(r))) {// checks if there beverage id is  within the removed array
                removed_beverages.push([DB2.spirits[i]]); // it adds to the array
            }
            }
        }

    return removed_beverages;
}

//
// This function removes an specific beverage with article id from the menu that the manager has entered
function addToRemovedBeverages(art_id){
    var removed_beverages_old = JSON.parse(localStorage.getItem("removed_bev")); // Fetches the removed beverages from local storage

    if(removed_beverages_old != null){ // Checks if the removed beverages is not empty or exist, if not it will push the new article id into the existing array
        if(!removed_beverages_old.some(r => art_id.includes(r))){
        removed_beverages_old.push(art_id);
        localStorage.setItem("removed_bev", JSON.stringify(removed_beverages_old));
        }
    }else{ // If removed beverage is null or does not exist it will add removed beverages which is an empty array, push the newly added article id and set it into local storage
    removed_beverages.push(art_id); // pushes the ID into an array
    localStorage.setItem("removed_bev", JSON.stringify(removed_beverages)); // stores it with local storage that stringify the array to enable local storage
    }
}

//
// This function removes a article id from the array containing the removed beverages from the menu. Which would add back the beverage to the menu
function undoRemovedBeverage(id){
    var removed_beverages_old = JSON.parse(localStorage.getItem("removed_bev")); // Fetches array from localstorage

    console.log(id);
    console.log(removed_beverages_old);

    for(i in removed_beverages_old){
        if(id == removed_beverages_old[i]){ // If the id from the beverage is equal to the index
            removed_beverages_old.splice(i, 1); // Removes it from the menu
            localStorage.setItem("removed_bev", JSON.stringify(removed_beverages_old)); // Updates the array to localstorage
        }
    }
}

function getStock(){
    var stock = [];
    var tempString;
    for(i in DB2.stocks){ // firstly iterates through the sold (order history)
        for(j in DB2.spirits)
        if(DB2.spirits[j].articleid == DB2.stocks[i].articleid){
                    tempString = { name : DB2.spirits[j].name , amount : DB2.stocks[i].amount, ID : DB2.stocks[i].articleid} // adds the name, ID and stock
            }
        stock.push(tempString);
        }
    return stock;
}

