
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
    setOrderHeaderHTML();

    // 3. display / hide mask layer
    setMaskLayer();

    // 4. save table number and get mask layer by clicking
    setTableOnclick(oGrid,all_table_number);

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

            saveTableNumber(this.index);
            setOrderMenuHTML(this.index);
            // set button actions
            increaseBtn();
            decreaseBtn();
            deleteBtn();

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

// set order header html
function setOrderHeaderHTML(){
    var oth = document.getElementsByClassName("table_order_header")[0];
    oth.innerHTML = createSpan("","","Table Order Menu");
}

// set order menu html
function setOrderMenuHTML(){

    var table_number = localStorage.getItem("table_number");
    // get order list by table number
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
        // generate single product html
        strHTML += createDiv("","single_product",
            createDiv("","",createHiddenP("","",beer_id))
            + createDiv("","",createSpan("","",beer_info.name))
            + createDiv("","",createSpan("","",beer_info.price))
            + createDiv("","item_count_i",
                createDiv("","num_count",
                    createDiv("","count_d","-")
                    + createDiv("","c_num",orderJson.orderList[i].amount)
                    + createDiv("","count_i","+")))
            + createDiv("","subtotal",createSpan("","",subTotal[i]))
            + createDiv("","product_del_btn",createA("","","javascript:;","×"))
        );
    }
    strHTML += createDiv("","order_total_price",'Total: '+sum(subTotal));
    return strHTML;
}


// increase btn for single product
function increaseBtn(){
    var i_btn = document.getElementsByClassName("count_i");
    for (var k = 0; k < i_btn.length; k++) {
        i_btn[k].onclick = function() {
            bt = this;
            // Get subtotal node
            at = this.parentElement.parentElement.nextElementSibling;
            // Get unit price node
            pt = this.parentElement.parentElement.previousElementSibling;
            // Get quantity value
            node = bt.parentNode.childNodes[1];
            num = node.innerText;
            num = parseInt(num);
            num++;
            node.innerText = num;
            // Get unit price
            price = pt.innerText;
            // Calculate subtotal value
            at.innerText = price * num;
            // Calculate the total value
            resetTotalPrice(bt.parentElement.parentElement.parentElement.parentElement);
        }
    }
}
// decrease btn for single product
function decreaseBtn(){
    var d_btn = document.getElementsByClassName("count_d");
    var i_btn = document.getElementsByClassName("count_i");
    for (k = 0; k < i_btn.length; k++) {
        d_btn[k].onclick = function() {
            bt = this;
            // Get subtotal node
            at = this.parentElement.parentElement.nextElementSibling;
            // Get unit price node
            pt = this.parentElement.parentElement.previousElementSibling;
            // Get quantity value
            node = bt.parentNode.childNodes[1];
            num = node.innerText;
            num = parseInt(num);
            if (num > 1) {
                num--;
            }
            node.innerText = num;
            // Get unit price
            price = pt.innerText;
            // Calculate subtotal value
            at.innerText = price * num
            // Calculate the total value
            resetTotalPrice(bt.parentElement.parentElement.parentElement.parentElement);
        }
    }
}

// delete product from order
function deleteBtn() {
    var del_btn = document.getElementsByClassName("product_del_btn");
    for (k = 0; k < del_btn.length; k++) {
        del_btn[k].onclick = function () {
            bt = this;
            var result = confirm("Confirm to delete?");
            if (result) {
                single_order = this.parentElement.parentElement;
                single_product = this.parentElement;

                const single_product_length = single_order.getElementsByClassName("single_product").length;
                // if it's the last single product
                if (single_product_length == 1){
                    table_order_menu = single_order.parentElement;
                    const single_order_length = table_order_menu.getElementsByClassName("single_order").length;
                    table_order_menu.removeChild(single_order);
                    // if it's the last single order and add empty info
                    if (single_order_length == 1){
                        table_order_menu.innerHTML +=
                            createSpan("","empty_info","This table don't have any orders yet.");
                    }
                }else{
                    single_order.removeChild(single_product);
                    resetTotalPrice(single_order);
                }
            }
        }
    }
}

function resetTotalPrice(single_order_node) {

    var subtotal_list = [];
    var products = single_order_node.getElementsByClassName("single_product");

    for (var i = 0; i < products.length; i++){
        const single_product = products[i];
        const subtotal = single_product.getElementsByClassName("subtotal")[0].innerText;
        subtotal_list.push(subtotal);
    }

    var totalPrice = single_order_node.getElementsByClassName("order_total_price")[0];
    totalPrice.innerText = "Total: " + sum(subtotal_list);;
}