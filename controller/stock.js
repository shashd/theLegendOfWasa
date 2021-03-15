
const STOCK_STORAGE_NAME = "stocks";

// init stock
function initStock(){
    localStorage.setItem(STOCK_STORAGE_NAME,JSON.stringify(DB2.stocks));
}

// return stocks after parsing from local storage
function getStocks(){
    return JSON.parse(localStorage.getItem(STOCK_STORAGE_NAME));
}

// save changed stock
function saveStocks(stocks){
    localStorage.setItem(STOCK_STORAGE_NAME,JSON.stringify(stocks));
}

function checkStockAndReset(){
    var stock = localStorage.getItem(STOCK_STORAGE_NAME);
    if (stock == "" || stock == null){
        initStock();
    }
}

// if the stock amount is bigger than order amount, reset the stock number and return 1
// out of stock, return 0
function checkAndChangeStockByBeerId(beer_id, amount){
    var list = getStocks();
    var ret = -1;
    for (var i = 0; i < list.length; i++) {
        if (list[i].articleid == beer_id){
            if (parseInt(list[i].amount) >= parseInt(amount)){
                list[i].amount = (parseInt(list[i].amount) - parseInt(amount)).toString();
                ret = 1;
            }else{
                ret = 0;
            }
            break;
        }
    }
    if (ret == 1){
        localStorage.setItem(STOCK_STORAGE_NAME,JSON.stringify(list));
    }
    return ret;
}
