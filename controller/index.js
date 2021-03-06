
//
// When page is loading it calls for functions update_view
window.onload = function() {
    update_menu();
    update_view_txt();
    loadDraggableMenu();
};

// return to top button
window.onscroll = function(){
    scrollFunction()
};


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
function update_menu(){

    beers = allBeverages();

    var oBox = document.getElementById("box");
    var oCar = document.getElementById("car");
    var oUl = document.getElementsByTagName("ul")[0];

    // create product menu
    createProductMenuHTML(beers,oUl);
    // create shopping cart
    createCart(beers,oBox,oCar);

}

// create beer menu list HTML
function createProductMenuHTML(beers,oUl){
    for (var i = 0; i < beers.length; i++) {
        const data = beers[i];
        const liHTML = createLi("","beer_line",
            createP("","beer_name",'Name: ' + data[0].name)
            + createP("","beer_producer",'Producer:'+ data[0].producer)
            + createP("","beer_price",'Price:'+ data[0].priceinclvat)
            + createP("","beer_strength",'Alcohol:'+ data[0].alcoholstrength)
            + createDiv("","add_btn","order"),
            true);
        oUl.innerHTML += liHTML;
    }
}

function createCart(beers,oBox,oCar){
    // find all the class with name "add_btn"
    var aBtn = getClass(oBox, "add_btn");
    var number = 0;
    for (var i = 0;i < aBtn.length; i++){
        number++;
        aBtn[i].index = i;
        aBtn[i].onclick = function() {
            var oDiv = document.createElement("div");
            var data = beers[this.index][0];
            createProductCartHTML(oDiv,data,oCar);
            // check box
            checkBox(oDiv);
            // Get all the quantity plus button and calculate the subtotal price
            increaseBtn();
            // Get all the quantity minus button and calculate the subtotal price
            decreaseBtn();
            // delete product button
            deleteBtn(oCar,oDiv,number);
        }
    }
}

// create the cart beer HTML
function createProductCartHTML(oDiv,data,oCar){
    oDiv.className = "row hid";
    oDiv.innerHTML += generateCartBasicHTML(data.name, data.priceinclvat);
    oCar.appendChild(oDiv);
}

function generateCartBasicHTML(beerName, beerPrice){
    const cartHTML = createDiv("","check left",
        createI("i_check","i_check","i_check()","√")) +

        createDiv("","name left",createSpan("","",beerName)) +

        createDiv("","price left",createSpan("","",beerPrice + "kr")) +

        createDiv("","item_count_i",
            createDiv("","num_count",
                createDiv("","count_d","-")
                + createDiv("","c_num","1")
                + createDiv("","count_i","+"))) +

        createDiv("","subtotal left",createSpan("","",beerPrice + "kr")) +

        createDiv("","ctrl left",createA("","","javascript:;","×"));
    return cartHTML;
}

function checkBox(oDiv){
    var check = oDiv.firstChild.getElementsByTagName("i")[0];
    check.onclick = function() {
        if (check.className == "i_check i_acity") {
            check.classList.remove("i_acity");

        } else {
            check.classList.add("i_acity");
        }
        getAmount();
    }
}

function deleteBtn(oCar,oDiv,number){
    var delBtn = oDiv.lastChild.getElementsByTagName("a")[0];
    delBtn.onclick = function() {
        var result = confirm("Confirm to delete?");
        if (result) {
            oCar.removeChild(oDiv);
            number--;
            getAmount();
        }
    }
}

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
            // Remove the currency unit - "kr"
            price = price.substring(0, price.length - 2);
            // Calculate subtotal value
            at.innerText = price * num + "kr";
            // Calculate the total value
            getAmount();
        }
    }
}

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
            // Remove the currency unit - "kr"
            price = price.substring(0, price.length - 2);
            // Calculate subtotal value
            at.innerText = price * num + "kr";
            // Calculate the total value
            getAmount();
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

// ==================== drag and drop part ====================

function loadDraggableMenu(){
    // get all the draggable elements
    var Drag = document.getElementsByClassName("beer_line");
    // set event listener for all elements
    for (var i = 0; i < Drag.length; i++) {
        Drag[i].addEventListener("dragstart",
            function(e) {
                var objDtf = e.dataTransfer;
                var pList = this.getElementsByTagName("p");
                // get beer name and beer price
                var beerName = pList[0].innerText.split(":")[1];
                var beerPrice = pList[2].innerText.split(":")[1];
                // transfer data
                objDtf.setData("text/html", dragToCart(beerName,beerPrice));
            },
            true);
    }

    var oCar = document.getElementById("car");
    var number = 0;
    oCar.addEventListener("drop",
        function(e) {
            number++;

            // get transferred data
            var objDtf = e.dataTransfer;
            var textHTML = objDtf.getData("text/html");
            this.innerHTML += textHTML;

            // get all the divs in the cart
            var oDivs = this.getElementsByClassName("row hid");

            // set functions for all divs
            for(var i = 0; i<oDivs.length; i++){
                var oDiv = oDivs[i];
                dragToCartBtnFunctions(oDiv,oCar,number);
            }

            e.preventDefault();
            e.stopPropagation();
        },
        false);

    // Add page ondragover event
    document.ondragover = function(e) {
        e.preventDefault();
    }
    // Add page ondrop event
    document.ondrop = function(e) {
        e.preventDefault();
    }

    // Add the product html to cart
    function dragToCart(beerName,beerPrice){
        const cartHTML = createDiv("","row hid",generateCartBasicHTML(beerName, beerPrice));
        return cartHTML;
    }

    // add drag to cart btn onclick functions
    function dragToCartBtnFunctions(oDiv,oCar,number){
        checkBox(oDiv);
        deleteBtn(oCar,oDiv,number);
        increaseBtn();
        decreaseBtn();
    }
}


