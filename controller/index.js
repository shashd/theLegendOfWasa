
//
// When page is loading it calls for functions update_view
window.onload = function() {
    update_menu();
    update_view_txt();
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
//This functions add new elements to the menu area of the html. For each items that is supposed to be added it
// creates the element in HTML and then places the content from the array.
// todo: Seperate into minor functions
function update_menu(){

    beers = allBeverages();

    console.log(beers);

    //var oBox = document.getElementById("box");
    var oUl = document.getElementsByTagName("ul")[0];
    //var oCar = document.getElementById("car");

    /* menu area */
    for (var i = 0; i < beers.length; i++) {
        var oLi = document.createElement("li");
        var data = beers[i];

        oLi.innerHTML += '<p>' +'Name: ' + data[0].name + '</p>';
        oLi.innerHTML += '<p>'+ 'Producer:'+ data[0].producer + '</p>';
        oLi.innerHTML += '<p>'+ 'Price:'+ data[0].priceinclvat + '</p>';
        oLi.innerHTML += '<p>'+ 'Alcohol:'+ data[0].alcoholstrength + '</p>';
        oLi.innerHTML += '<div class="btn" id="order_btn">order</div>';
        oUl.appendChild(oLi);
    }

    /* Shopping Cart */

    ///////////////////
    //To be continued//
    ///////////////////
}

