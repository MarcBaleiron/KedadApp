import { Controller } from './Controller.js';

export class SurveyController extends Controller {
    bind() {
        this.view.onVote((optionId) => this.#vote(optionId));
    }

    async #vote(optionId) {
        if (optionId === null) {
            this.view.showError('Choose an option before voting.');
            return;
        }

        this.view.showError();
        try {
            await this.model.vote(optionId);
        } catch (error) {
            this.view.showError(error.message);
        }
    }
}
