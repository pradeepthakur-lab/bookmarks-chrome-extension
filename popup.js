document.addEventListener('DOMContentLoaded', function() {
    var bookmarkButton = document.getElementById('bookmark');
    var bookmarksDiv = document.getElementById('bookmarks');
    
    chrome.storage.sync.get('bookmarks', function(data) {
        // console.log('data', data)
      if (data.bookmarks) {
        var bookmarks = JSON.parse(data.bookmarks);
        for (var i = 0; i < bookmarks.length; i++) {
          var bookmark = bookmarks[i];
          var bookmarkLink = document.createElement('a');
          bookmarkLink.setAttribute('href', bookmark.url);
          bookmarkLink.textContent = bookmark.title;
          bookmarksDiv.appendChild(bookmarkLink);
        }
      }
    });
    
    bookmarkButton.addEventListener('click', function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            var activeTab = tabs[0];
            // console.log('activeTab', activeTab)
            // Do something with the active tab
            chrome.storage.sync.get('bookmarks', function(data) {
                var bookmarks = [];
                if (data.bookmarks) {
                  bookmarks = JSON.parse(data.bookmarks);
                }
                bookmarks.push({title: activeTab.title, url: activeTab.url});
                chrome.storage.sync.set({'bookmarks': JSON.stringify(bookmarks)}, function() {
                  var bookmarkLink = document.createElement('a');
                  bookmarkLink.setAttribute('href', activeTab.url);
                  bookmarkLink.textContent = activeTab.title;
                  bookmarksDiv.appendChild(bookmarkLink);
                });
            });
        });
    });
  });
  