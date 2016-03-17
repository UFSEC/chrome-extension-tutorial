document.addEventListener('DOMContentLoaded', function() {
  // Get the current tab so we can extract the url.
  chrome.tabs.getSelected(null, function(tab) {
    var url = 'http://ip-api.com/json/' + extractDomain(tab.url); // The url we will be making the GET request to.
    httpGetAsync(url, function(response){
      var data = JSON.parse(response);

      // Get the DOM elements.
      var org = document.getElementById('org');
      var location = document.getElementById('location');

      // Set the text of the elements.
      org.innerHTML = data.org;
      location.innerHTML = data.city + ", " + data.region + ", " + data.country;
    });
  });
});
