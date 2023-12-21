let activeTabs = {};

chrome.action.onClicked.addListener((tab) => {
    // Toggle the state of the tab in the activeTabs object
    activeTabs[tab.id] = !activeTabs[tab.id];

    // Determine the icon based on the active state
    const icon = activeTabs[tab.id]
        ? '/images/icon-active.png'
        : '/images/icon-inactive.png';

    // Update the extension's icon for the current tab
    chrome.action.setIcon({ path: icon, tabId: tab.id });

    // If the tab is active, execute the title.js script
    if (activeTabs[tab.id]) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['/scripts/title.js'],
        });
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // When a tab is updated and the status is 'complete', check if it's active
    if (changeInfo.status === 'complete' && activeTabs[tabId]) {
        // Set the icon to the active state
        const icon = '/images/icon-active.png';
        chrome.action.setIcon({ path: icon, tabId: tab.id });

        // Execute the title.js script on the updated tab
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['/scripts/title.js'],
        });
    }
});
