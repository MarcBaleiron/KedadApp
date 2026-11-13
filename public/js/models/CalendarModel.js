import { Model } from './Model.js';

// Share of the group available that decides how "free" a slot is
const MID_THRESHOLD = 0.4;
const HIGH_THRESHOLD = 0.7;

/** MVC — MODEL: group availability, already classified by level. */
export class CalendarModel extends Model {
    #api;

    /** @param {import('../core/ApiClient.js').ApiClient} api */
    constructor(api) {
        super({ rows: [] });
        this.#api = api;
    }

    async load() {
        const { members, rows } = await this.#api.getAvailability();
        this.setState({
            rows: rows.map(({ label, counts }) => ({
                label,
                cells: counts.map((count) => ({ count, level: CalendarModel.#level(count / members) })),
            })),
        });
    }

    static #level(ratio) {
        if (ratio >= HIGH_THRESHOLD) return 'high';
        if (ratio >= MID_THRESHOLD) return 'mid';
        return 'low';
    }
}
