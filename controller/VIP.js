var VIP_id;

//
// This function gives a local variable the users id. The reason why is to be able to access the correct information regarding the user to be displayed.
function setVIPId (){
    VIP_id = localStorage.getItem("user_id");
}

window.onload = function() {
    setVIPId();
    update_view_txt();
    setWelcome();
    displayBalance();
    setOrderHistory();
};

//
//This function iterates through the dictionary content and places the content of the related key on
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

//
// This function sets the welcome title to the "Welcome (users name)".
function setWelcome(){
    var fullName = getUserFullName(VIP_id); //Calls function in class "Loader", which returns the users name.
    $("#welcome_userName").text(fullName);
}

function displayBalance(){
    var balance = getBalance(VIP_id);

    $("#balance_num").text(balance + " SEK");
}

//
// This functions displays the users order history
function setOrderHistory(){
    orderHistory = getOrderHistory(VIP_id); // fetches the order list
    var order_table = document.getElementById("order_his_tab");

    var row_header = document.createElement("tr"); // first creates the row for the headers of the table

    var name_header = document.createElement("th");
    var date_header = document.createElement("th");

    name_header.textContent = get_string("order_b_name");
    date_header.textContent = get_string("order_date");

    row_header.appendChild(name_header);
    row_header.appendChild(date_header);
    order_table.appendChild(row_header);

    for(i in orderHistory) { // iterates through the orderHistory and adds a new row for each index within the array and displays the cells
        var row = document.createElement("tr");
        for(j in orderHistory[i]){
            var cell = document.createElement('td');
            cell.textContent = orderHistory[i][j];
            row.appendChild(cell);
        }
        order_table.appendChild(row);
    }
    }

    //
    // This function lets the VIP add money to their balance.
function updateVipBalance(){
    var add_num = document.getElementById("balance_input").value; // Fetches the value that the users has entered in the input

        if (confirm(get_string("confirm_transfer") + add_num + " SEK")) { // Asks the user if (s)he is sure to proceed with the transaction or cancel it
            changeBalance(VIP_id, add_num); // calls for function in Loader which changes the balance in the model
            alert(add_num + get_string("success_bal")); // Confirms transaction
            displayBalance(); // updates the balance text
        } else {
            alert(get_string("cancel_transfer")); // If user cancels transaction a confirmation of the action will appear
        }

        document.getElementById("balance_input").value = null;
    }


