

const TABLE_NUMBER = 20;

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

// return hidden p HTML
function createHiddenP(id, classname, content){
    const idString = createAttribute("id", id);
    const classString = createAttribute("class", classname);
    const hiddenString = 'hidden="hidden"';
    return "<p " + idString + classString + hiddenString + ">" + content + "</p>";
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

function createOption(value,content){
    const valueString = createAttribute("value", value);
    return  "<option " + valueString + ">" + content + "</option>";
}
function createSelect(id,classname,content){
    return createBasic("select", id, classname, content, false);
}
function createForm(id,name,content){
    const nameString = createAttribute("name", name);
    return "<form id=" +id + " name=" + nameString + ">" + content + "</form>"; 
}

function createInput(type,id,funcname,value){
    const typeString = createAttribute("type", type);    
    const idString = createAttribute("id", id);
    const funcString = "onclick="+funcname+" ";
    const valueString = createAttribute("value",value);
    return "<input " + typeString + idString + funcString + valueString +"></input>"; 
}

function createButton(name,funcname,content){
    const nameString = createAttribute("name", name); 
    const funcString = "onclick="+funcname+"() ";
    return "<button " + nameString + funcString + ">" + content + "</button>"; 
}

function createButtonWithIdAndClass(id, classname, method, content){
    const idString = createAttribute("id", id);
    const classString = createAttribute("class", classname);
    const methodString = "onclick=" + method + "() ";
    return "<button " + idString + classString + methodString + ">" + content + "</button>";
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

// generate uuid
function getUniqueId() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    return s.join("");
}

// get time
function getCurrTime() {
    var d = new Date(), str = '';
    str += d.getFullYear() + '-';
    str += d.getMonth() + 1 + '-';
    str += d.getDate() + ' ';
    str += d.getHours() + ':';
    str += d.getMinutes() + ':';
    str += d.getSeconds();
    return str;
}

// check if the type is array
function isArray(o){
    return Object.prototype.toString.call(o) == '[object Array]';
}


// set table number in local storage
function saveTableNumber(table_number){
    localStorage.setItem("table_number",table_number);
}

function sum(arr) {
    ret = 0;
    for (var i = 0; i < arr.length; i++){
        ret += parseInt(arr[i]);
    }
    return ret;
}