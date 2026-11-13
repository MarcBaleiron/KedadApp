/**
 * PATTERN — OBSERVER
 * Something that can be watched. Observers register with subscribe() and are
 * called every time notify() runs. Models extend this so that, when their data
 * changes, controllers can refresh the views without the model knowing who
 * is listening.
 */
export class Observable {
    #observers = new Set();

    /**
     * @param {(payload: any) => void} observer
     * @returns {() => void} function that cancels the subscription
     */
    subscribe(observer) {
        this.#observers.add(observer);
        return () => this.#observers.delete(observer);
    }

    notify(payload) {
        this.#observers.forEach((observer) => observer(payload));
    }
}
