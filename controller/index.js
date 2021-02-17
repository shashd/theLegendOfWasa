
//
// When page is loading it calls for functions update_view
window.onload = function() {
    update_view_txt();
    update_menu();
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

function update_menu(){
    beers = get_beers();
    // get handle on div
    var container = document.getElementById('beer_menu');
// create table element
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
// loop array
    for (i = 0; i < beers.length; i++) {
        // get inner array
        var vals = beers[i];
        // create tr element
        var row = document.createElement('tr');
        // loop inner array
        for (var b = 0; b < vals.length; b++) {
            // create td element
            var cell = document.createElement('td');
            // set text
            cell.textContent = vals[b];
            // append td to tr
            row.appendChild(cell);
        }
        //append tr to tbody
        tbody.appendChild(row);
    }
// append tbody to table
    table.appendChild(tbody);
// append table to container
    container.appendChild(table);
}

