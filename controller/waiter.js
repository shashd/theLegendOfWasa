
// global variable
var waitress_id;

// function area
window.onload = function() {
    setWaitressId();
    update_view_txt();        
    setWelcome();
    displayStocks();                /* display all beers' stocks */
    checkStockAndReset();
    updateOrderMenu();
    update_house();
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
    var info = document.getElementById("welcome_userName");
    var num = getNumOfOrders();
    var welcomeStr = "";

    welcomeStr = createBasic("h1","","","Waiter/Waitress: "+fullName ,false)
                +createBasic("h1","","",num+" order(s) in the system." ,false)
                +" <br/> "
                +createBasic("h2","","","Choose a table number:" ,false);
    info.innerHTML = welcomeStr;

    /* select table */
    var hSelect = document.getElementById("select_table1");
    createTableOpt(hSelect,"choose_tab1","table_option1","orderListInHome()");

}


// ==================== stock part ====================

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
            setModifyBtn();
            setOrderIsPaidBtn();
            setOrderDeleteBtn();

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

    // html for order header
    const is_paid = orderJson.isPaid;
    const transaction_id = orderJson.transaction_id;
    const time = orderJson.time;

    strHTML += createDiv("","order_header",
        createSpan("","order_transaction_id",' Transaction ID: ' + transaction_id)
        + createSpan("","order_is_paid",' Paid: ' + is_paid)
        + createSpan("","order_created_time",' Created Time: ' + time)
    );

    // html for product information
    for (var i = 0; i < product_number; i++){

        const beer_id = orderJson.orderList[i].id;
        var beer_info = getBeerInfoById(beer_id);
        // generate single product html
        strHTML += createDiv("","single_product",
            createDiv("","",createHiddenP("","beer_id",beer_id))
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

    strHTML += createDiv("","order_total_price",'Total: '+sum(subTotal))
        + createDiv("","modify_btn","Modify")
        + createDiv("","is_paid_btn","Set Paid")
        + createDiv("","order_del_btn","Delete");
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
                    alert("Cannot remove the last product in an order.")
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

function getTransactionId(single_order_node){
    var transaction_id = single_order_node.getElementsByClassName("order_header")[0]
        .getElementsByClassName("order_transaction_id")[0];
    return $.trim(transaction_id.innerText.split(":")[1]);
}

function setIsPaidStatus(single_order_node) {
    var is_paid = single_order_node.getElementsByClassName("order_header")[0]
        .getElementsByClassName("order_is_paid")[0];
    var is_paid_string = $.trim(is_paid.innerText.split(":")[1]);
    if (is_paid_string == "true") {
        alert("the status is already paid.");
    }else{
        is_paid.innerText = ' Paid: true'
    }
}

// get beer id and amount from the order menu
function getBeerIdAndAmount(single_order_node) {
    var ret = []
    var products = single_order_node.getElementsByClassName("single_product");
    for (var i = 0; i < products.length; i++) {
        const single_product = products[i];
        const beer_id = single_product.getElementsByClassName("beer_id")[0].innerText;
        const amount = single_product.getElementsByClassName("c_num")[0].innerText;
        const temp = {"id": beer_id, "amount": amount};
        ret.push(temp);
    }
    return ret;
}

// set order modify button
function setModifyBtn(){
    var modify_btn = document.getElementsByClassName("modify_btn");
    for (var i = 0; i < modify_btn.length; i++){
        modify_btn[i].onclick = function () {

            bt = this;
            var result = confirm("Confirm to modify the order?");
            if (result) {

                // 1. get transaction_id
                const single_order = this.parentElement;
                const tid = getTransactionId(single_order);

                // 2. set new order list
                const new_order_list = getBeerIdAndAmount(single_order);
                if (new_order_list.length != 0){
                    setOrderListByTransactionId(tid, new_order_list);
                }

            }
        }
    }
}

// set order delete button
function setOrderDeleteBtn() {
    var del_btn = document.getElementsByClassName("order_del_btn");
    for (var i = 0; i < del_btn.length; i++) {
        del_btn[i].onclick = function () {

            bt = this;
            var result = confirm("Confirm to delete the order?");
            if (result) {

                // 1. get transaction_id
                const single_order = this.parentElement;
                const tid = getTransactionId(single_order);

                // 2. delete html and set empty info if necessary
                var table_order_menu = single_order.parentElement;
                const single_order_length = table_order_menu.getElementsByClassName("single_order").length;
                table_order_menu.removeChild(single_order);
                // if it's the last single order and add empty info
                if (single_order_length == 1){
                    table_order_menu.innerHTML +=
                        createSpan("","empty_info","This table don't have any orders yet.");
                }

                // 3. delete order from storage by tid
                deleteOrderByTransactionId(tid);

            }
        }
    }
}


// set order paid status
function setOrderIsPaidBtn() {
    var paid_btn = document.getElementsByClassName("is_paid_btn");
    for (var i = 0; i < paid_btn.length; i++) {
        paid_btn[i].onclick = function () {
            bt = this;
            var result = confirm("Confirm the order is paid?");
            if (result){
                // 1. get transaction_id
                const single_order = this.parentElement;
                const tid = getTransactionId(single_order);

                // 2. change the html
                setIsPaidStatus(single_order);

                // 3. change the storage
                modifyIsPaidStatus(tid);
            }

        }
    }
}

// ==================== on the house ===================

// get order with parsing from local storage
function getOrders(){
    return JSON.parse(localStorage.getItem("orders"));
}

function saveOrders(orders){
    localStorage.setItem("orders",JSON.stringify(orders));
}

function getNumOfOrders(){
    orders = getOrders();
    return orders.length;
}

// get the table number in one assigned order
function getTableNumber(i){
    orders = getOrders();
    return orders[i].table_number;
}

function update_house(){
    /* select table */
    var hSelect = document.getElementById("select_table");
    createTableOpt(hSelect,"choose_tab2","table_option2","orderListInHouse()");
}

function createTableOpt(hSelect,formid,selectid,funcname){
    orders = getOrders();
    var optionStr = "";
    for(i=0; i<orders.length; i++){
        const table = getTableNumber(i);    
        optionStr += createOption(table,"Table "+table);
    }   
    hSelect.innerHTML = createForm(formid,"",
                        createSelect(selectid,"",optionStr)
                        +createInput("button","select_tab2",funcname,"Show")
                     );
}

function getOrderJsonByTable(table){
    orders = getOrders();
    
    for(i=0; i<orders.length; i++){

        if(orders[i].table_number == table){
         
            return orders[i].orderList;
        } 
    }
}

function orderListInHome(){
    var selectid = "#table_option1";
    var hUl = document.getElementsByTagName("ul")[2];
    hUl.innerHTML = "";

    showOrderListHTML(selectid,hUl);
}

function orderListInHouse(){
    var selectid = "#table_option2";
    var hUl = document.getElementsByTagName("ul")[3];
    hUl.innerHTML = "";

    showOrderListHTML(selectid,hUl);
}

// show order list according table number 
function showOrderListHTML(selectid,hUl){
    var table = $(selectid).val();
    var orderJson = getOrderJsonByTable(table);
    var beer_info; 
   
    for(j=0; j < orderJson.length; j++){
        beer_id = orderJson[j].id;
        beer_amount = orderJson[j].amount;
        beer_info = getBeerInfoById(beer_id);
       
        liHTML = createLi("","",
              createP("","",beer_id)
            + createP("","",beer_info.name)  
            + createP("","",beer_info.price)
            + createP("","",beer_amount)
            ,false);
        hUl.innerHTML += liHTML;
    }

}

function onHouse(){
    // get values that the user inputs
	var beer_id = document.forms.on_the_house.id.value;
	var houseAmount = document.forms.on_the_house.amount.value;
    beer_info = getBeerInfoById(beer_id);
    var houseValue = -beer_info.price * houseAmount;

    var table = $("#table_option2").val();
    var orderJson = getOrderJsonByTable(table);

    // calcuation & alert final result
    var subTotal = calculatePriceFromOrderList(orderJson);
    subTotal.push(houseValue)
    var newTotal = sum(subTotal);
    var calString="New total(after on the house) is: "+ newTotal;
    alert(calString);
}

// ==================== Notify Security ===================
function alertSecurity() {
    var txt;
    if (confirm("Are you sure to notify Security?")) {
        alert("Already notified Security.");
    } else {
        alert("Canceled to notify Security!");
    }
  }