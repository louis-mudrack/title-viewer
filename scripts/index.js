let activeTabs = {};
chrome.action.onClicked.addListener((tab) => {
    // Check if the tab is already active
    if (activeTabs[tab.id]) {
        // If active, deactivate and remove titles
        activeTabs[tab.id] = false;
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                let layer = document.querySelector('#title-display-layer');
                if (layer) {
                    layer.remove();
                }
            },
        });
    } else {
        // If not active, activate and show titles
        activeTabs[tab.id] = true;
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['/scripts/titles.js'], // Make sure the file name is correct
        });
    }

    // Update the icon based on the active state
    const icon = activeTabs[tab.id]
        ? '/images/icon-active.png'
        : '/images/icon-inactive.png';
    chrome.action.setIcon({ path: icon, tabId: tab.id });

    // Open the settings popup using chrome.windows.create
    chrome.windows.create({
        url: 'popup.html',
        type: 'popup',
        width: 400,
        height: 600,
    });
});
