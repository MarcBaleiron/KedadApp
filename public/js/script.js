/**
 * Application entry point.
 * Creates the shared API client once and lets the FeatureFactory build a
 * Model + View + Controller for every element declared with data-view.
 *
 *   user → View → Controller → Model → ApiClient (Singleton)
 *                     ↑          │
 *                     └─ render ─┘  (Observer: Model notifies, Controller refreshes View)
 */
import { ApiClient } from './core/ApiClient.js';
import { FeatureFactory } from './core/FeatureFactory.js';

const dependencies = { api: ApiClient.getInstance() };

document.querySelectorAll('[data-view]').forEach((root) => {
    FeatureFactory.create(root.dataset.view, root, dependencies).mount();
});
