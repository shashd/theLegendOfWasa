var language = "eng"

//
// Current dictionary containing both swedish text and english
// and the the images of english and swedish flag images
dict = {
    "keys_txt": ["welcome_txt","lang_txt", "log_in_txt", "welcome_login", "enter_credentials", "username_lbl", "password_lbl", "login_btn", "login_error", "beer_menu_title", "order_btn", "welcome_title", "balance_txt", "ord_his_tit"],
    "keys_pic" : ["lang_pic"],

    "eng": {
        "welcome_txt": "Welcome to Legend of Wasa",
        "lang_txt": "Svenska",
        "lang_pic" : "../../images/swe.png", //needs to contain folder structure from index.html
        "log_in_txt" : "Log in",
        "welcome_login": "Welcome to The Flying Dutchman", // login page welcome
        "enter_credentials": "Kindly enter your account credentials to log in", // login page prompt
        "username_lbl" : "Username",
        "password_lbl" : "Password",
        "login_btn" : "Login",
        "login_error" : "Wrong password or username",
        "beer_menu_title" : "Beer menu",
        "order_btn": "Order",
        "welcome_title" : "Welcome ",
        "balance_txt" : "Your debt is: ",
        "ord_his_tit" : "Your order history",
        "order_date" : "Date of the order",
        "order_b_name" : "Beer name"
    },
    "sve": {
        "welcome_txt": "Välkommen till Legenden av Vasa",
        "lang_txt": "English",
        "lang_pic" : "../../images/eng.png", //needs to contain folder structure from index.html
        "log_in_txt" : "Logga in",
        "welcome_login": "Välkommen",
        "enter_credentials": "Stoppa i infon tack",
        "username_lbl" : "Användarnamn",
        "password_lbl" : "Lösenord",
        "login_btn" : "Logga in",
        "login_error" : "Fel användarnamn eller lösenord",
        "beer_menu_title" : "Öl meny",
        "order_btn" : "Beställ",
        "welcome_title" : "Välkommen ",
        "balance_txt" : "Din skuld är: ",
        "ord_his_tit" : "Din orderhistorik",
        "order_date": "Order datum",
        "order_b_name" : "Öl namn"
    }
}


// returns the dictionary containing with specified language (english/swedish) and the content of specified key
function get_string(key){
    return dict[language][key];
}

//
// This function changes the value of variable "language" which is used to specify what language should be used within the dict
// , it is called from the html-file.
//
function change_lang() {
    if (language=="eng") {
        language = "sve";
    } else {language = "eng"}
    update_view_txt(); // Calls method within controller to update the view with new language.
}