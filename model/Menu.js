var beers_temp, myJSON, beers, obj;

// Initializes variable
beers_temp = [
    {
        "name": "Sol",
        "producer": "Sol brewery",
        "country": "Spain",
        "type": "Lager",
        "strength": "4,5 %",
        "serving" : "Bottle",
        "price" : "35 kr",
        "allergies" :  ""
    },
    {
        "name": "Brewdog Punk IPA",
        "producer": "Brewdog",
        "country": "UK",
        "type": "IPA",
        "strength": "5,6 %",
        "serving": "Tap",
        "price": "45 kr",
        "allergies": "Gluten"
    },
    {
        "name": "Melleruds lager",
        "producer": "Melleruds bryggeri",
        "country": "Sweden",
        "type": "Lager",
        "strength": "4,5 %",
        "serving": "Tap",
        "price": "40 kr",
        "allergies": "Gluten"
    },
    {
        "name": "Hoegaarden",
        "producer": "InBev",
        "country": "Belgium",
        "type": "Wheat beer",
        "strength": "4,9 %",
        "serving": "Bottle",
        "price": "50 kr",
        "allergies": "Gluten"
    }
];

// Storing data
myJSON = JSON.stringify(beers_temp);
localStorage.setItem("beerJSON", myJSON);

// Retrieving data
beers = localStorage.getItem("beerJSON");
obj = JSON.parse(beers);

//Writes out beer name and information for each JSON object
for (var i = 0; i < beers_temp.length; i++) {
    //document.getElementById("demo").innerHTML = obj.name;
    document.write("<br><br>" + beers_temp[i].name);
    obj = beers_temp[i];
    for (var key in obj) {
        var value = obj[key];
        document.write("<br> - " + key + ": " + value);
    }
}

// Have not gotten it to work
/*function loadJSON(file, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
};*/

/*function get_beers() {
    /*loadJSON("model/beers_db_temp.json", function (text) {
        beers = JSON.parse(text);
    });

    return beers_temp;*/