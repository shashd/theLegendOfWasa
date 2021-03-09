

// functions for creating HTML phases with different tag names
// the basic create functions for different tag names
function createBasic(tag, id, classname, content, draggable){
    const idString = createAttribute("id", id);
    const classString = createAttribute("class", classname);

    var dragString = "";
    if (draggable) {
        dragString = 'draggable="true"';
    }

    return "<" + tag + " " + idString + classString + dragString + ">" + content + "</" + tag + ">";
}

// return div HTML
function createDiv(id, classname, content){
    return createBasic("div", id, classname, content, false);
}

// return li HTML
function createLi(id, classname, content, draggable){
    return createBasic("li", id, classname, content, draggable);
}

// return p HTML
function createP(id, classname, content){
    return createBasic("p", id, classname, content, false);
}

// return i HTML
function createI(id, classname, method, content){

    const idString = createAttribute("id", id);
    const classString = createAttribute("class", classname);
    const onclickString = createAttribute("onclick", method);
    return "<i " + idString + classString + onclickString + ">" + content + "</i>";
}

// return span HTML
function createSpan(id, classname, content){
    return createBasic("span", id, classname, content, false);
}

// return a HTML
function createA(id, classname, href, content){
    const idString = createAttribute("id", id);
    const classString = createAttribute("class", classname);
    const hrefString = createAttribute("href",href);
    return "<a " + idString + classString + hrefString + ">" + content + "</a>";
}

// set attribute and values, return a string like 'id="xxx" '
// space in the end
function createAttribute(attr, val) {
    return  attr + '="' + val + '" ';
}


// ============== return to top ==============

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




