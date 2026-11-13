import { Model } from './Model.js';

/** MVC — MODEL: the active survey and its votes. */
export class SurveyModel extends Model {
    #api;

    /** @param {import('../core/ApiClient.js').ApiClient} api */
    constructor(api) {
        super({ survey: null });
        this.#api = api;
    }

    get hasVoted() {
        return this.state.survey?.votedOptionId != null;
    }

    async load() {
        this.setState({ survey: await this.#api.getSurvey() });
    }

    /** One vote per member: the rule is enforced here before asking the server. */
    async vote(optionId) {
        if (this.hasVoted) throw new Error('You have already voted.');
        this.setState({ survey: await this.#api.vote(optionId) });
    }
}
