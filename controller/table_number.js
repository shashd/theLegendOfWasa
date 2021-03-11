
//
// When page is loading it calls for functions update_view
window.onload = function() {
    update_view_txt();
    updateMenu();
};

// return to top button
window.onscroll = function(){
    scrollFunction()
};


function updateMenu(){
    var table_number = TABLE_NUMBER;
    var oGrid = document.getElementById("grid_container");

    createTableGridHTML(oGrid, table_number);
    setGridOnclick(oGrid, table_number);

}

// create table grid HTML
function createTableGridHTML(oGrid, table_number){
    for (var i = 0; i < table_number; i++){
        var strHTML = createDiv("","grid_item","Table " + i);
        oGrid.innerHTML += strHTML;
    }
}

// set grid onclick functions
function setGridOnclick(oGrid, table_number){
    var gridList = document.getElementsByClassName("grid_item");
    for (var i = 0; i < table_number; i++){
        var aGrid = gridList[i];
        aGrid.index = i;
        aGrid.onclick = function (){
            // save table number
            saveTableNumber(this.index);
            // redirect to index.html for the customers
            window.location.href = "index.html";
        }
    }
}

// set table number in local storage
function saveTableNumber(table_number){
    localStorage.setItem("table_number",table_number);
}





