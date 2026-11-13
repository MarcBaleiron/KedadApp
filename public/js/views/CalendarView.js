import { el } from '../utils/dom.js';
import { View } from './View.js';

/** MVC — VIEW: renders the availability table. */
export class CalendarView extends View {
    render({ rows }) {
        this.ref('body').replaceChildren(
            ...rows.map(({ label, cells }) =>
                el('tr', {},
                    el('th', { text: label, attrs: { scope: 'row' } }),
                    ...cells.map(({ count, level }) =>
                        el('td', {}, el('span', { className: `slot slot--${level}`, text: String(count) })),
                    ),
                ),
            ),
        );
    }
}
