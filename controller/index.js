
//
// When page is loading it calls for functions update_view
window.onload = function() {
    update_menu();
    update_view_txt();
};


window.onscroll = function(){
    scrollFunction()
};

// When the webpage slides down 20px, a "back to top" button appears
function scrollFunction(){
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
        document.getElementById("toTop").style.display = "block";
    }else{
        document.getElementById("toTop").style.display = "none";
    }
}

// Click the button to return to the top
function topFunction(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

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
//This functions add new elements to the menu area of the html. For each items that is supposed to be added it
// creates the element in HTML and then places the content from the array.
// todo: Seperate into minor functions
function update_menu(){

    beers = allBeverages();

    var oBox = document.getElementById("box");
    var oCar = document.getElementById("car");
    var oUl = document.getElementsByTagName("ul")[0];

    /* menu area */
    for (var i = 0; i < beers.length; i++) {
        var oLi = document.createElement("li");
        var data = beers[i];

        oLi.innerHTML += '<p>' +'Name: ' + data[0].name + '</p>';
        oLi.innerHTML += '<p>'+ 'Producer:'+ data[0].producer + '</p>';
        oLi.innerHTML += '<p>'+ 'Price:'+ data[0].priceinclvat + '</p>';
        oLi.innerHTML += '<p>'+ 'Alcohol:'+ data[0].alcoholstrength + '</p>';
        oLi.innerHTML += '<div class="add_btn">order</div>';
        oUl.appendChild(oLi);
    }

    /* Shopping Cart */

    // get all the order buttons
    var aBtn = getClass(oBox, "add_btn");
    var number = 0;
    // cart product list
    for (var i = 0;i < aBtn.length; i++){
        number++;
        aBtn[i].index = i;
        aBtn[i].onclick = function() {
            var oDiv = document.createElement("div");
            var data = beers[this.index][0];
            oDiv.className = "row hid";
            oDiv.innerHTML += '<div class="check left"> <i class="i_check" id="i_check" onclick="i_check()" >√</i></div>';
            oDiv.innerHTML += '<div class="name left"><span>' + data.name + '</span></div>';
            oDiv.innerHTML += '<div class="price left"><span>' + data.priceinclvat + 'kr</span></div>';
            oDiv.innerHTML +=' <div class="item_count_i"><div class="num_count"><div class="count_d">-</div>' +
                '<div class="c_num">1</div><div class="count_i">+</div></div> </div>'
            oDiv.innerHTML += '<div class="subtotal left"><span>' + data.priceinclvat + 'kr</span></div>'
            oDiv.innerHTML += '<div class="ctrl left"><a href="javascript:;">×</a></div>';
            oCar.appendChild(oDiv);
            var check = oDiv.firstChild.getElementsByTagName("i")[0];
            check.onclick = function() {
                if (check.className == "i_check i_acity") {
                    check.classList.remove("i_acity");

                } else {
                    check.classList.add("i_acity");
                }
                getAmount();
            }
            // delete product button
            var delBtn = oDiv.lastChild.getElementsByTagName("a")[0];
            delBtn.onclick = function() {
                var result = confirm("Confirm to delete?");
                if (result) {
                    oCar.removeChild(oDiv);
                    number--;
                    getAmount();
                }
            }
            // Get all the quantity plus button and calculate the subtotal price
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
                    // Remove the currency unit - "kr"
                    price = price.substring(0, price.length - 2);
                    // Calculate subtotal value
                    at.innerText = price * num + "kr";
                    // Calculate the total value
                    getAmount();
                }
            }
            // Get all the quantity minus button and calculate the subtotal price
            var d_btn = document.getElementsByClassName("count_d");
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
                    // Remove the currency unit - "kr"
                    price = price.substring(0, price.length - 2);
                    // Calculate subtotal value
                    at.innerText = price * num + "kr";
                    // Calculate the total value
                    getAmount();
                }
            }

            delBtn.onclick = function() {
                var result = confirm("Confirm to delete?");
                if (result) {
                    oCar.removeChild(oDiv);
                    number--;
                    getAmount();
                }
            }

        }

    }
}

// get class of a certain tag name
function getClass(oBox, tagname) {
    var aTag = oBox.getElementsByTagName("*");
    var aBox = [];
    for (var i = 0; i < aTag.length; i++) {
        // check whether has the same value
        if (aTag[i].className == tagname) {
            aBox.push(aTag[i]);
        }
    }
    return aBox;
}

var index = false;
// check all products in the cart
function checkAll() {
    var choose = document.getElementById("car").getElementsByTagName("i");
    if (choose.length != 1) {
        for (i = 1; i < choose.length; i++) {
            if (!index) {
                choose[0].classList.add("i_acity2")
                choose[i].classList.add("i_acity");
            } else {
                choose[i].classList.remove("i_acity");
                choose[0].classList.remove("i_acity2")
            }
        }
        index = !index;
    }
    getAmount();
}

// calculate total price
function getAmount() {
    ns = document.getElementsByClassName("i_acity");
    console.log(ns);
    sum = 0;
    // Check box
    document.getElementById("price_num").innerText = sum;
    for (var y = 0; y < ns.length; y++) {
        amount_info = ns[y].parentElement.parentElement.lastElementChild.previousElementSibling;
        num = parseInt(amount_info.innerText);
        sum += num;
        document.getElementById("price_num").innerText = sum;
    }
}

