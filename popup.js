document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');

  checkPageButton.addEventListener('click', function() {

    // Get the current tab so we can extract the url.
    chrome.tabs.getSelected(null, function(tab) {

      var url = 'http://ip-api.com/json/' + extractDomain(tab.url); // The url we will be making the GET request to.
      httpGetAsync(url, function(response){
        var locationInfo = document.getElementById('info');
        var data = JSON.parse(response);
        locationInfo.innerHTML = "The server is in: " + data.region + ", " + data.countryCode;
      });
    });
  });
});

// A function to handle the http request.
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
