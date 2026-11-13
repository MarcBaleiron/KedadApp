import { Observable } from '../core/Observable.js';

/**
 * MVC — MODEL (base)
 * Owns a piece of state and notifies observers when it changes.
 * A model knows nothing about the DOM, views or controllers.
 */
export class Model extends Observable {
    #state;

    constructor(initialState = {}) {
        super();
        this.#state = initialState;
    }

    get state() {
        return this.#state;
    }

    /** Merges a patch into the state and notifies observers with the new state. */
    setState(patch) {
        this.#state = { ...this.#state, ...patch };
        this.notify(this.#state);
    }
}
