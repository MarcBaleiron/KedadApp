/**
 * MVC — VIEW (base)
 * A view only displays data and reports what the user does. It never calls
 * the API, never holds business rules and never knows the model or controller:
 * the controller hands it data (render) and registers handlers (onXxx).
 */
export class View {
    /** @param {HTMLElement} root element this view controls */
    constructor(root) {
        this.root = root;
    }

    /** Finds an element declared in the HTML with data-ref="name". */
    ref(name) {
        const node = this.root.querySelector(`[data-ref="${name}"]`);
        if (!node) throw new Error(`Missing data-ref="${name}" in <${this.root.localName} data-view="${this.root.dataset.view}">`);
        return node;
    }

    /** Shows (or clears, when empty) the view's error line. */
    showError(message = '') {
        const target = this.root.querySelector('[data-ref="error"]');
        if (!target) return;
        target.textContent = message;
        target.hidden = !message;
    }
}
