var contextMenuItem = {
  "id": "verifyInformation",
  "title": "Verify Information",
  "contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData){
  console.log("WHOOHOOO", clickData)
  if (clickData.menuItemId == "verifyInformation" && clickData.selectionText){
    alert(clickData.selectionText)
  }
})
