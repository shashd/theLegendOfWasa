
function beverageTypes() {
    var types = [];
    for (i = 0; i < DB2.spirits.length; i++) {
        addToSet(types, DB2.spirits[i].varugrupp);
    };
    return types;
}

function addToSet(set, item) {
    if (!set.includes(item)) {
        set.push(item);
    }
    return set;
}

function allBeverages() {
    // Using a local variable to collect the items.
    var collector = [];

    // The DB is stored in the variable DB2, with "spirits" as key element. If you need to select only certain
    // items, you may introduce filter functions in the loop... see the template within comments.
    //
    for (i = 0; i < DB2.spirits.length; i++) {
        collector.push([DB2.spirits[i]]);
    }
    ;
    //
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
function getDebt(id){
    var debt = "0";
    for(i in DB.account){
        if(DB.account[i].user_id == id){
            debt = DB.account[i].creditSEK;
        }
    }
    return debt;
}