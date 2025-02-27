// // console.log(chrome)

// document.querySelector('#content').innerHTML = JSON.stringify(chrome, null, 2);

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if(tab.url && tab.url.includes('youtube.com')) {
//     chrome.scripting.executeScript({
//       target: { tabId: tabId },
//       function: changeBackgroundColor
//     });
//   }
//   // if (changeInfo.status === 'complete' && tab.url && tab.url.includes('youtube.com')) {
//   //   chrome.scripting.executeScript({
//   //     target: { tabId: tabId },
//   //     function: changeBackgroundColor
//   //   });
//   // }
// });

// function changeBackgroundColor() {
//   document.body.style.backgroundColor = 'red';
// }
chrome.identity.getAuthToken({ interactive: true }, (token) => {
  if (chrome.runtime.lastError) {
    console.error(chrome.runtime.lastError);
    return;
  }

  fetch("https://www.googleapis.com/youtube/v3/playlistItems", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json"
    },
    params: {
      part: "snippet",
      playlistId: "WL", // "WL" is the ID for the "Watch Later" playlist
      maxResults: 50
    }
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Watch Later Videos:", data.items);
      chrome.storage.local.set({ watchLaterVideos: data.items });
    })
    .catch((error) => console.error("Error fetching data:", error));
});