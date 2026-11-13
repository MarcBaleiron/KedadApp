/**
 * PATTERN 2 — OBSERVER
 * A tiny reactive store. Views subscribe to the keys they care about and are
 * notified whenever that key changes, so the chat and calendar update without
 * reloading the page and without views knowing about each other.
 */
export class Store {
    #state;
    #observers = new Map();

    /** @param {Record<string, unknown>} [initialState] */
    constructor(initialState = {}) {
        this.#state = { ...initialState };
    }

    get(key) {
        return this.#state[key];
    }

    /** Updates a key and notifies every observer subscribed to it. */
    set(key, value) {
        this.#state[key] = value;
        this.#observers.get(key)?.forEach((observer) => observer(value));
    }

    /**
     * @param {string} key
     * @param {(value: unknown) => void} observer
     * @returns {() => void} function that cancels the subscription
     */
    subscribe(key, observer) {
        if (!this.#observers.has(key)) this.#observers.set(key, new Set());
        this.#observers.get(key).add(observer);
        return () => this.#observers.get(key).delete(observer);
    }
}
