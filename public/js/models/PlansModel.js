import { Model } from './Model.js';

/** MVC — MODEL: suggested plan templates. */
export class PlansModel extends Model {
    #api;

    /** @param {import('../core/ApiClient.js').ApiClient} api */
    constructor(api) {
        super({ plans: [] });
        this.#api = api;
    }

    async load() {
        this.setState({ plans: await this.#api.getPlanSuggestions() });
    }
}
