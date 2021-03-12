
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
    scrollFunction();
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
    var all_table_number = TABLE_NUMBER;
    var oGrid = document.getElementById("grid_container");

    // 1. set all Accordion buttons
    setAccordBtn();

    // 2. create table HTML
    createTableGridHTML(oGrid, all_table_number);

    // 3. save table number and get mask layer by clicking
    setTableOnclick(oGrid,all_table_number);

    // 4. set order html
    setMaskLayer();
    setOrderHeaderHTML();

}

function setAccordBtn(){
    var acc = document.getElementsByClassName("accordion");

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
        });
    }
}

// create table grid HTML
function createTableGridHTML(oGrid, all_table_number){
    for (var i = 0; i < all_table_number; i++){
        var strHTML = createDiv("","grid_item","Table " + i);
        oGrid.innerHTML += strHTML;
    }
}

// set table onclick function to display order list and modify order button
function setTableOnclick(oGrid, all_table_number){
    var gridList = document.getElementsByClassName("grid_item");
    for (var i = 0; i < all_table_number; i++){
        var aGrid = gridList[i];
        aGrid.index = i;
        aGrid.onclick = function (){
            // save table_number
            saveTableNumber(this.index);
            setOrderMenuHTML(this.index);

        }
    }
}

// set mask layer
function setMaskLayer(){
    $(".grid_item").on('click', function() {
        $(".mask_div").show();
    });
    $(".close_btn").on("click", function() {
        $(".mask_div").hide();
    })
}


function setOrderHeaderHTML(){
    var oth = document.getElementsByClassName("table_order_header")[0];
    oth.innerHTML = createSpan("","","Table Order Menu");
}

function setOrderMenuHTML(){

    var table_number = localStorage.getItem("table_number")
    var orderList = getOrdersByTableNumber(table_number);
    var table_order_menu = document.getElementsByClassName("table_order_menu")[0];
    table_order_menu.innerHTML = "";

    if (orderList.length == 0){
        table_order_menu.innerHTML +=
                createSpan("","empty_info","This table don't have any orders yet.");

    }else{
        for (var i = 0; i < orderList.length; i++){
            const orderJson = orderList[i];
            var strHTML = createDiv("","single_order",setProductListHTML(orderJson));
            table_order_menu.innerHTML += strHTML;
        }
    }
}

function setProductListHTML(orderJson){
    var strHTML = "";
    const product_number = orderJson.orderList.length;
    var subTotal = calculatePriceFromOrderList(orderJson.orderList);
    for (var i = 0; i < product_number; i++){

        const beer_id = orderJson.orderList[i].id;
        var beer_info = getBeerInfoById(beer_id);

        strHTML += createDiv("","single_product",
            createHiddenP("","",beer_id)
            + createP("","",'Name: ' + beer_info.name)
            + createP("","",'Price: ' + beer_info.price)
            + createP("","",'Amount: ' + orderJson.orderList[i].amount)
            + createP("","",'SubTotal: ' + subTotal[i])
        );
    }

    strHTML += createDiv("","order_total_price",'Total: '+sum(subTotal));

    return strHTML;
}


