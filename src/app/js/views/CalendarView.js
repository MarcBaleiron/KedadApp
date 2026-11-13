import { el } from '../utils/dom.js';
import { View } from './View.js';

// Share of the group available that decides the slot colour
const MID_THRESHOLD = 0.4;
const HIGH_THRESHOLD = 0.7;

export class CalendarView extends View {
    bind() {
        this.store.subscribe('availability', (availability) => this.render(availability));
    }

    async load() {
        this.store.set('availability', await this.api.getAvailability());
    }

    render({ members, rows }) {
        const body = this.ref('body');
        body.replaceChildren(
            ...rows.map(({ label, counts }) =>
                el('tr', {},
                    el('th', { text: label, attrs: { scope: 'row' } }),
                    ...counts.map((count) =>
                        el('td', {}, el('span', { className: `slot slot--${CalendarView.#level(count / members)}`, text: String(count) })),
                    ),
                ),
            ),
        );
    }

    static #level(ratio) {
        if (ratio >= HIGH_THRESHOLD) return 'high';
        if (ratio >= MID_THRESHOLD) return 'mid';
        return 'low';
    }
}
