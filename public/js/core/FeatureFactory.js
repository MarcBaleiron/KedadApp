import { CalendarController } from '../controllers/CalendarController.js';
import { ChatController } from '../controllers/ChatController.js';
import { PlansController } from '../controllers/PlansController.js';
import { SurveyController } from '../controllers/SurveyController.js';
import { CalendarModel } from '../models/CalendarModel.js';
import { ChatModel } from '../models/ChatModel.js';
import { PlansModel } from '../models/PlansModel.js';
import { SurveyModel } from '../models/SurveyModel.js';
import { CalendarView } from '../views/CalendarView.js';
import { ChatView } from '../views/ChatView.js';
import { PlansView } from '../views/PlansView.js';
import { SurveyView } from '../views/SurveyView.js';

/**
 * PATTERN — FACTORY
 * The HTML declares WHAT it contains (data-view="chat") and the factory builds
 * the matching Model + View + Controller triad. Adding a feature = write its
 * three classes and register them here; script.js never changes.
 */
const registry = {
    calendar: { Model: CalendarModel, View: CalendarView, Controller: CalendarController },
    chat: { Model: ChatModel, View: ChatView, Controller: ChatController },
    plans: { Model: PlansModel, View: PlansView, Controller: PlansController },
    survey: { Model: SurveyModel, View: SurveyView, Controller: SurveyController },
};

export class FeatureFactory {
    /**
     * @param {string} type value of the data-view attribute
     * @param {HTMLElement} root element of the feature
     * @param {{api: import('./ApiClient.js').ApiClient}} dependencies
     * @returns {import('../controllers/Controller.js').Controller}
     */
    static create(type, root, { api }) {
        const feature = registry[type];
        if (!feature) throw new Error(`Unknown feature: "${type}"`);
        return new feature.Controller(new feature.Model(api), new feature.View(root));
    }
}
