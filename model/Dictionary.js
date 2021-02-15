var language = "eng"

//
// Current dictionary containing both swedish text and english
// and the the images of english and swedish flag images
dict = {
    "keys_txt": ["welcome_txt","lang_txt", "log_in_txt", "username_lbl", "password_lbl", "login_btn", "login_error"],
    "keys_pic" : ["lang_pic"],

    "eng": {
        "welcome_txt": "Welcome to Legend of Wasa",
        "lang_txt": "Svenska",
        "lang_pic" : "../../images/swe.png", //needs to contain folder structure from index.html
        "log_in_txt" : "Log in",
        "username_lbl" : "Username: ",
        "password_lbl" : "Password: ",
        "login_btn" : "Login",
        "login_error" : "Wrong password or username"
    },
    "sve": {
        "welcome_txt": "Välkommen till Legenden av Vasa",
        "lang_txt": "English",
        "lang_pic" : "../../images/eng.png", //needs to contain folder structure from index.html
        "log_in_txt" : "Logga in",
        "username_lbl" : "Användarnamn: ",
        "password_lbl" : "Lösenord: ",
        "login_btn" : "Logga in",
        "login_error" : "Fel användarnamn eller lösenord"
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