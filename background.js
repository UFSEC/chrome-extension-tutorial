var updateLocation = function(){
  chrome.tabs.getSelected(null, function(tab) {
    var url = 'http://ip-api.com/json/' + extractDomain(tab.url); // The url we will be making the GET request to.
    httpGetAsync(url, function(response){
      var data = JSON.parse(response);
      chrome.browserAction.setBadgeText({text: data.region});
    });
  });
};

// Called whenever a tab is updated (change URL).
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(changeInfo.status === 'complete'){
      updateLocation();
    }
});

// Called when a new tab is activated (switching tabs/ new tab).
chrome.tabs.onActivated.addListener(function(activeInfo) {
    updateLocation();
});
