class TitleDisplay {
    constructor() {
        // Define colors for different title states
        this.existColor = '#4f4';
        this.emptyColor = '#ff4';
        this.missingColor = '#f44';
        this.backgroundColor = 'rgba(0, 0, 0, .8)';

        this.init();
    }

    // Method to find the highest z-index among all elements on the page
    getHighestZindex() {
        const elements = [...document.querySelectorAll('*')];
        return elements.reduce((zindex, el) => {
            const elZindex = parseInt(window.getComputedStyle(el).zIndex, 10);
            return !isNaN(elZindex) ? Math.max(zindex, elZindex) : zindex;
        }, 1);
    }

    // Method to check if an element is hidden (not displayed on the page)
    isHidden(el) {
        return el.getClientRects().length === 0;
    }

    // Method to create a label for an element with a title
    createLabel(ele, text, color) {
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
            background: this.backgroundColor,
            fontFamily: 'monospace',
            fontSize: '12px',
            pointerEvents: 'none',
            width: `${eleBox.width}px`,
            minWidth: '75px',
            zIndex: this.getHighestZindex() + 1,
        });

        return d; // Return the created label
    }

    // Method to initialize the title display process
    init() {
        let layer = document.querySelector('#title-display-layer');

        if (layer) {
            document.body.removeChild(layer);
        }

        // Create a new layer for title labels
        layer = document.createElement('div');
        layer.id = 'title-display-layer';

        Object.assign(layer.style, {
            zIndex: this.getHighestZindex() + 1,
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none',
        });

        document.body.appendChild(layer);

        document.querySelectorAll('[title]').forEach((ele) => {
            if (this.isHidden(ele)) {
                return;
            }

            // Get the title attribute and determine the label text and color
            const title = ele.getAttribute('title');
            let text, color;

            if (title === null) {
                text = 'Missing title attribute';
                color = this.missingColor;
            } else if (title.trim() === '') {
                text = 'Empty title attribute';
                color = this.emptyColor;
            } else if (title.trim().length < 10) {
                text = `Short title text: ${ele.title}`;
                color = this.emptyColor;
            } else {
                text = `Title text: ${ele.title}`;
                color = this.existColor;
            }

            // Create a label for the element and append it to the layer
            const label = this.createLabel(ele, text, color);
            layer.appendChild(label);
        });
    }
}

new TitleDisplay();
