
const ORDER_STORAGE_NAME = "orders";

function createOrder(){
    var orderBtn = document.getElementById("pay");
    orderBtn.onclick = function (){
        submitOrder();
    }
}

function submitOrder(){
    // An order can only consist of up to ten items
    var orderLimitNumber = 10;

    var checkBox = document.getElementsByClassName("i_acity");
    if (checkBox.length == 0){
        alert("Please select items in the cart");
    }
    else if (checkBox.length > orderLimitNumber){
        alert("An order cannot consist of more than 10 items");
    }
    else{
        // 1. generateOrderJSON
        var cartProductJson = generateOrderJSON();

        // 2. save to localStorage
        list = setInitOrderList(ORDER_STORAGE_NAME);
        list.push(cartProductJson)
        localStorage.setItem(ORDER_STORAGE_NAME,JSON.stringify(list));

        // 3. show info and reset cart
        alert("Successfully submit the order");
        // clear the cart
        var oCar = document.getElementById("car");
        var removeItems = document.getElementsByClassName("i_acity");
        for (var i = removeItems.length - 1; i >= 0; i--){
            oCar.removeChild(removeItems[i].parentElement.parentElement);
        }
        // reset check all box
        var checkAllBox = document.getElementsByClassName("check left")[0];
        checkAllBox.innerHTML = createI("","","checkAll()","√");
        getAmount();
    }
}


function generateOrderJSON(){
    var checkBox = document.getElementsByClassName("i_acity");
    var transaction_id = getUniqueId();
    const table_number = getTableNumber();
    var isPaid = false;
    const time = getCurrTime();

    var orderList = [];
    for (var i = 0; i < checkBox.length; i++){
        var oItem = checkBox[i].parentElement.parentElement;

        const id = oItem.getElementsByClassName("check left")[0].
        getElementsByTagName("p")[0].innerText;

        const amount = oItem.getElementsByClassName("item_count_i")[0].
        getElementsByClassName("num_count")[0].
        getElementsByClassName("c_num")[0].innerText;

        const temp = {"id":id, "amount":amount};
        orderList.push(temp);
    }
    const orderJson = {
        "transaction_id": transaction_id,
        "table_number": table_number,
        "isPaid": isPaid,
        "orderList": orderList,
        "time": time
    }
    return orderJson;
}

// set initial order list from localStorage
function setInitOrderList(key_name){
    var list = localStorage.getItem(key_name);
    if (list == "" || list == null){
        list = [];
    }else{
        list = JSON.parse(list);
        if (isArray(list) == false){
            list = [];
        }
    }
    return list;
}

// reset isPaid status from false to true by transaction_id
function modifyIsPaidStatus(transaction_id){
    var list = localStorage.getItem(ORDER_STORAGE_NAME);
    list = JSON.parse(list);

    for (var i = 0; i < list.length; i++){
        var item = list[i];
        if (item.transaction_id == transaction_id){
            item.isPaid = true;
            break;
        }
    }
    localStorage.setItem(ORDER_STORAGE_NAME,JSON.stringify(list));
}

// bartender can get orders for certain table
function getOrdersByTableNumber(table_number) {

    var list = localStorage.getItem(ORDER_STORAGE_NAME);
    list = JSON.parse(list);

    var tableOrders = [];
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        if (item.table_number == table_number){
            tableOrders.push(item);
        }
    }
    return tableOrders;
}

// bartender can get unpaid orders for certain table
function getUnPaidOrdersByTableNumber(table_number){
    var list = localStorage.getItem(ORDER_STORAGE_NAME);
    list = JSON.parse(list);

    var tableOrders = [];
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        if (item.table_number == table_number && item.isPaid == false){
            tableOrders.push(item);
        }
    }
    return tableOrders;
}

// todo: bartender can change items on an order by transaction id
function changeItemsOnOrderByTransactionId(){

}

function calculatePriceFromOrderList(orderList){
    var subTotal = []
    for (var i = 0; i < orderList.length; i++){
        const price = getBeerInfoById(orderList[i].id).price;
        const amount = orderList[i].amount;
        subTotal.push(parseInt(price)*parseInt(amount))
    }
    return subTotal;
}