
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
    beers = get_beers();

    var menu_area = document.getElementById("menu"); // Identifies menu_area in index

    for (var i = 0; i < beers.length; i++) {
        var beer_menu = document.createElement("beer_menu"); // creates element that will structure the beer menu
        beer_menu.setAttribute("id", "beer_menu");

        var beer_name = document.createElement("beer_name"); // creates element with each item of the array
        var beer_producer = document.createElement("beer_producer");
        var beer_price = document.createElement("beer_price");
        var beer_strength = document.createElement("beer_strength");
        var btn = document.createElement("btn");

        btn.setAttribute("class", "btn"); // sets attributes to the elements(id and class), so manipulation with CSS is possible
        btn.setAttribute("id", "order_btn");

        beer_name.setAttribute("id", "beer_name");
        beer_producer.setAttribute("id", "beer_producer");
        beer_price.setAttribute("id", "beer_price");
        beer_strength.setAttribute("id", "beer_strength");

        beer_name.innerHTML = 'Name: ' + beers[i].name; // sets the text with in each element
        beer_producer.innerHTML = 'Producer: ' + beers[i].producer;
        beer_price.innerHTML = 'Price: ' + beers[i].price;
        beer_strength.innerHTML = 'Alcohol: ' + beers[i].strength;

        btn.innerHTML = get_string("order_btn");

        menu_area.appendChild(beer_menu);

        beer_menu.appendChild(beer_name);
        beer_menu.appendChild(beer_producer);
        beer_menu.appendChild(beer_price);
        beer_menu.appendChild(beer_strength);
        beer_menu.appendChild(btn);
    }
}

