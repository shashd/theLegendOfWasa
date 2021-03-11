
// global variable
var waitress_id;

// function area
window.onload = function() {
    setWaitressId();
    update_view_txt();        
    setWelcome();
    setInitStorage();               /* initial data in local storage */ 
    displayStocks();                /* display all beers' stocks */
    updateOrderMenu();
};

// return to top button
window.onscroll = function(){
    scrollFunction()
};

function setWaitressId(){
    waitress_id = localStorage.getItem("user_id");
}

// This function sets the welcome title to the "Welcome (users name)".
function setWelcome(){
    var fullName = getUserFullName(waitress_id);
    $("#welcome_userName").text(fullName);
}


// ==================== stock part ====================

function setInitStorage(){
    localStorage.setItem("stocks",JSON.stringify(DB2.stocks));
}

// return stocks after parsing from local storage
function getStocks(){
    return JSON.parse(localStorage.getItem("stocks"));
}

function saveStocks(stocks){
    localStorage.setItem("stocks",JSON.stringify(stocks));
}

function modifyStocks() {
    var stocks = getStocks();

    // get values that the user inputs
	var id = document.forms.current_stock.id.value;
	var newAmount = document.forms.current_stock.amount.value;

    for (i = 0; i < stocks.length; i++) {
        if(stocks[i].articleid == id){
            stocks[i].amount = newAmount;
        }
    }

    saveStocks(stocks);      /* update stocks in local storage */
	displayStocks();
}

function displayStocks(){
    var stocks = getStocks();   
    var list = "<tr><th>ID</th><th>Amount</th></tr>\n";

    for (i = 0; i < stocks.length; i++) {
        id = stocks[i].articleid;
        amount = stocks[i].amount;
        list += "<tr><td>" + id + "</td>\n<td>" + amount + "</td></tr>\n";
    }

    document.getElementById('stock_tab').innerHTML = list;
}


// ==================== order part ====================

function updateOrderMenu(){
    var table_number = TABLE_NUMBER;
    var oGrid = document.getElementById("grid_container");

    // create table HTML
    createTableGridHTML(oGrid, table_number);
    // set section button
    setSecBtn();

}

// set section button
function setSecBtn(){

    var order = document.getElementById("order_sec_btn");
    var stock = document.getElementById("stock_sec_btn");

    order.innerHTML += createSpan("","","Order Section");
    stock.innerHTML += createSpan("","","Stock Section");

    order.onclick = function (){
        $("#order_sec").toggle();
    }

    stock.onclick = function (){
        $("#stock_sec").toggle();
    }

}

// create table grid HTML
function createTableGridHTML(oGrid, table_number){
    for (var i = 0; i < table_number; i++){
        var strHTML = createDiv("","grid_item","Table " + i);
        oGrid.innerHTML += strHTML;
    }
}




