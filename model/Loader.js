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
// This function removes an specific beverage with article id from the menu that the manager has entered
function addToRemovedBeverages(art_id){
    var removed_beverages =[];
    removed_beverages.push(art_id); // pushes the ID into an array
    localStorage.setItem("removed_bev", JSON.stringify(removed_beverages)); // stores it with local storage that stringify the array to enable local storage
}