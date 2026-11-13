/**
 * MVC — CONTROLLER (base)
 * Connects one model with one view: it listens to what the user does (view
 * events), asks the model to act, and refreshes the view when the model changes.
 *
 * PATTERN — TEMPLATE METHOD: mount() fixes the order of the steps
 * (bind → render on change → load) and subclasses fill in bind() and load().
 */
export class Controller {
    /**
     * @param {import('../models/Model.js').Model} model
     * @param {import('../views/View.js').View} view
     */
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    async mount() {
        this.model.subscribe((state) => this.view.render(state)); // Observer: model → view
        this.bind();
        try {
            await this.load();
        } catch {
            this.view.showError('Something went wrong. Please try again.');
        }
    }

    /** Registers the view's user-event handlers. */
    bind() {}

    /** Loads the initial data into the model. */
    async load() {
        await this.model.load();
    }
}
