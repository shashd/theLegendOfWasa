// global variable
var waitress_id;
var id_list = [];
var length;

// function area
window.onload = function() {
    setWaitressId();
    update_view_txt();        
    setWelcome();
    initialStorage();               /* initial data in local storage */ 
    displayStock();                 /* display all beers' stocks */
};

function setWaitressId(){
    waitress_id = localStorage.getItem("user_id");
}

// This function iterates through the dictionary content and places the content of the related key on
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

// This function sets the welcome title to the "Welcome (users name)".
function setWelcome(){
    var fullName = getUserFullName(waitress_id);
    $("#welcome_userName").text(fullName);
}

function initialStorage(){
    // store all beers in one row in local storage
    localStorage.setItem("stocks",JSON.stringify(DB2.stocks))

    // fetch stocks data from local storage
    var stocks = localStorage.getItem("stocks");
    stocks = JSON.parse(stocks);

    for (i = 0; i < stocks.length; i++) {
        // record all beer ids in a global array
        id_list.push(stocks[i].articleid);
        // store each beer one by one in local storage
        localStorage.setItem(stocks[i].articleid,stocks[i].amount);
    }

    length = id_list.length;
}

function ModifyItem() {
    
    // fetch stocks data from local storage
    var stocks = localStorage.getItem("stocks");
    stocks = JSON.parse(stocks);

	var id = document.forms.current_stock.id.value;
	var newAmount = document.forms.current_stock.amount.value;

    for (i = 0; i < stocks.length; i++) {
        if(stocks[i].articleid == id){
            localStorage.setItem(stocks[i].articleid,newAmount);
        }
    }
	
	displayStock();
}


function displayStock(){
    var id, amount;    
    var list = "<tr><th>ID</th><th>Amount</th></tr>\n";

    for (i = 0; i < length; i++) {
        id = id_list[i];
        amount = localStorage.getItem(id);
        list += "<tr><td>" + id + "</td>\n<td>"
                + amount + "</td></tr>\n";
    }

    document.getElementById('stock_tab').innerHTML = list;
}

