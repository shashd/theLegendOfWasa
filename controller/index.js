
//
// When page is loading it calls for functions update_view
window.onload = function() {
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

