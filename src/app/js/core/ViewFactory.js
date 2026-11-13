import { CalendarView } from '../views/CalendarView.js';
import { ChatView } from '../views/ChatView.js';
import { PlansView } from '../views/PlansView.js';
import { SurveyView } from '../views/SurveyView.js';

/**
 * PATTERN 3 — FACTORY
 * The HTML declares WHAT it contains (data-view="chat") and the factory decides
 * WHICH class builds it. Adding a feature = write a view + register it here;
 * main.js never changes.
 */
const registry = {
    calendar: CalendarView,
    chat: ChatView,
    plans: PlansView,
    survey: SurveyView,
};

export class ViewFactory {
    /**
     * @param {string} type value of the data-view attribute
     * @param {HTMLElement} root element the view controls
     * @param {{api: import('./ApiClient.js').ApiClient, store: import('./Store.js').Store}} dependencies
     */
    static create(type, root, dependencies) {
        const ViewClass = registry[type];
        if (!ViewClass) throw new Error(`Unknown view type: "${type}"`);
        return new ViewClass(root, dependencies);
    }
}
