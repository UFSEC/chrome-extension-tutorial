// Quick function to make an http request.
var httpGetAsync = function(theUrl, callback){
    var xmlHttp = new XMLHttpRequest(); // create the http request object

    // Set up an event listener for when the request is returned.
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    // Create the request.
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
};

// Quick function to extract the domain from the url string.
var extractDomain = function (url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number if there is one
    domain = domain.split(':')[0];
    return domain;
};
