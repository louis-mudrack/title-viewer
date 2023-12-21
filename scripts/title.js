(function () {
    const config = {
        // Define colors for different title states
        existColor: '#4f4',
        emptyColor: '#ff4',
        missingColor: '#f44',
        backgroundColor: 'rgba(0, 0, 0, .8)',
    };

    // Method to find the highest z-index among all elements on the page
    function getHighestZindex() {
        const elements = [...document.querySelectorAll('*')];
        return elements.reduce((zindex, el) => {
            const elZindex = parseInt(window.getComputedStyle(el).zIndex, 10);
            return !isNaN(elZindex) ? Math.max(zindex, elZindex) : zindex;
        }, 1);
    }

    // Method to check if an element is hidden (not displayed on the page)
    function isHidden(el) {
        return el.getClientRects().length === 0;
    }

    // Method to create a label for an element with a title
    function createLabel(ele, text, color) {
        const d = document.createElement('div');
        const s = d.style;
        const eleBox = ele.getClientRects()[0];

        d.textContent = text;
        // Apply styles to the label for visibility and positioning
        Object.assign(s, {
            color: color,
            boxSizing: 'border-box',
            position: 'absolute',
            top: `${window.scrollY + eleBox.top}px`,
            left: `${window.scrollX + eleBox.left}px`,
            padding: '5px',
            background: config.backgroundColor,
            fontFamily: 'monospace',
            fontSize: '12px',
            pointerEvents: 'none',
            width: `${eleBox.width}px`,
            minWidth: '75px',
            zIndex: getHighestZindex() + 1,
        });

        return d; // Return the created label
    }

    // Method to initialize the title display process
    function init() {
        let layer = document.querySelector('#title-display-layer');

        if (layer) {
            document.body.removeChild(layer);
            return;
        } else {
            // Create a new layer for title labels
            layer = document.createElement('div');
            layer.id = 'title-display-layer';

            Object.assign(layer.style, {
                zIndex: getHighestZindex() + 1,
                position: 'absolute',
                top: 0,
                left: 0,
                pointerEvents: 'none',
            });

            document.body.appendChild(layer);

            // Elements with title attribute
            const elementsWithTitles = [
                ...document.querySelectorAll('a'),
                ...document.querySelectorAll('abbr'),
                ...document.querySelectorAll('area'),
                ...document.querySelectorAll('button'),
                ...document.querySelectorAll('input'),
                ...document.querySelectorAll('label'),
                ...document.querySelectorAll('select'),
                ...document.querySelectorAll('textarea'),
                ...document.querySelectorAll('optgroup'),
                ...document.querySelectorAll('option'),
                ...document.querySelectorAll('fieldset'),
                ...document.querySelectorAll('legend'),
                ...document.querySelectorAll('iframe'),
                ...document.querySelectorAll('img'),
                ...document.querySelectorAll('map'),
                ...document.querySelectorAll('object'),
                ...document.querySelectorAll('param'),
                ...document.querySelectorAll('audio'),
                ...document.querySelectorAll('video'),
                ...document.querySelectorAll('track'),
            ];

            elementsWithTitles.forEach((ele) => {
                if (isHidden(ele)) {
                    return;
                }

                // Get the title attribute and determine the label text and color
                const title = ele.getAttribute('title');
                let text, color;

                if (title === null) {
                    text = 'Missing title attribute';
                    color = config.missingColor;
                } else if (title.trim() === '') {
                    text = 'Empty title attribute';
                    color = config.emptyColor;
                } else if (title.trim().length < 10) {
                    text = `Short title text: ${ele.title}`;
                    color = config.emptyColor;
                } else {
                    text = `Title text: ${ele.title}`;
                    color = config.existColor;
                }

                // Create a label for the element and append it to the layer
                const label = createLabel(ele, text, color);
                layer.appendChild(label);
            });
        }
    }
	init();
})();
