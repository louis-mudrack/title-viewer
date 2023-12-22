document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('settings-form');

    // Load saved settings and update the form
    chrome.storage.sync.get(['selectedElements'], (result) => {
        if (result.selectedElements) {
            const checkboxes = form.elements['element'];
            checkboxes.forEach((checkbox) => {
                checkbox.checked = result.selectedElements.includes(
                    checkbox.value,
                );
            });
        }
    });

    // Save settings when the form is submitted
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const selectedElements = Array.from(form.elements['element'])
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);
        chrome.storage.sync.set({ selectedElements }, () => {
            console.log('Settings saved');
        });
    });
});
