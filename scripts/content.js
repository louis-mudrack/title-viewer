// content.js
function createTooltip(text, className) {
  const tooltip = document.createElement('div');
  tooltip.textContent = text;
  tooltip.className = className;
  document.body.appendChild(tooltip);
  return tooltip;
}

function positionTooltip(element, tooltip) {
  const rect = element.getBoundingClientRect();
  tooltip.style.top = `${window.scrollY + rect.top}px`;
  tooltip.style.left = `${window.scrollX + rect.left}px`;
}

function showAttributes() {
  const elementsWithTitle = document.querySelectorAll('a');
  const elementsWithAlt = document.querySelectorAll('img[alt]');

  elementsWithTitle.forEach((element) => {
    const title = element.getAttribute('title');
    const tooltip = createTooltip(title || 'No title', 'custom-tooltip title-tooltip');
    positionTooltip(element, tooltip);
    if (!title) {
      tooltip.classList.add('missing-title');
    }
  });

  elementsWithAlt.forEach((element) => {
    const alt = element.getAttribute('alt');
    const tooltip = createTooltip(alt, 'custom-tooltip alt-tooltip');
    positionTooltip(element, tooltip);
  });
}

function clearTooltips() {
  const tooltips = document.querySelectorAll('.custom-tooltip');
  tooltips.forEach((tooltip) => tooltip.remove());
}

// Toggle the display of the attributes
let isShowingAttributes = false;
function toggleAttributes() {
  isShowingAttributes = !isShowingAttributes;
  if (isShowingAttributes) {
    showAttributes();
  } else {
    clearTooltips();
  }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleAttributes") {
    toggleAttributes();
  }
});
