
function createOrder(){
    var orderBtn = document.getElementById("pay");
    orderBtn.onclick = function (){
        submitOrder();
    }
}

function submitOrder(){

    var checkBox = document.getElementsByClassName("i_acity");
    if (checkBox.length == 0){
        alert("Please select items in the cart");
    }
    else{
        // 1. generateOrderJSON
        var cartProductJson = generateOrderJSON();

        // 2. save to localStorage
        var list = localStorage.getItem("unpaid_orders");
        if (list == ""){
            list = [];
        }else{
            list = JSON.parse(list);
            if (isArray(list) == false){
                list = [];
            }
        }
        list.push(cartProductJson)
        localStorage.setItem("unpaid_orders",JSON.stringify(list));

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
    var isPaid = "false";
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