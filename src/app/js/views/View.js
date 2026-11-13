/**
 * Base class for every view. A view only displays data and captures user
 * actions: it asks the ApiClient for data and publishes results to the Store.
 *
 * Lifecycle: mount() → bind() (subscribe + listeners) → load() (first fetch).
 * Subclasses implement bind() and load(); render() is up to each view.
 */
export class View {
    /**
     * @param {HTMLElement} root
     * @param {{api: import('../core/ApiClient.js').ApiClient, store: import('../core/Store.js').Store}} dependencies
     */
    constructor(root, { api, store }) {
        this.root = root;
        this.api = api;
        this.store = store;
    }

    async mount() {
        this.bind();
        try {
            await this.load();
        } catch {
            this.showError('Something went wrong. Please try again.');
        }
    }

    bind() {}

    async load() {}

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
