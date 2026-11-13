/**
 * Application entry point.
 * Builds the shared dependencies once and lets the ViewFactory create every
 * view declared in the HTML with a data-view attribute.
 *
 *   html (data-view) → ViewFactory → View → ApiClient (Singleton) + Store (Observer)
 */
import { ApiClient } from './core/ApiClient.js';
import { Store } from './core/Store.js';
import { ViewFactory } from './core/ViewFactory.js';

const dependencies = {
    api: ApiClient.getInstance(),
    store: new Store(),
};

document.querySelectorAll('[data-view]').forEach((root) => {
    ViewFactory.create(root.dataset.view, root, dependencies).mount();
});
