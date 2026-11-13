import { el } from '../utils/dom.js';
import { View } from './View.js';

/** MVC — VIEW: renders plan cards and reports refresh requests. */
export class PlansView extends View {
    render({ plans }) {
        this.ref('list').replaceChildren(
            ...plans.map(({ category, title, distanceKm }) =>
                el('li', { className: 'plan' },
                    el('span', { className: 'plan__cat', text: category }),
                    el('h3', { className: 'plan__title', text: title }),
                    el('p', { className: 'plan__meta', text: `${distanceKm} km from the group midpoint` }),
                ),
            ),
        );
    }

    /** @param {() => void} handler */
    onRefresh(handler) {
        this.ref('suggest').addEventListener('click', handler);
    }

    setBusy(isBusy) {
        this.ref('suggest').disabled = isBusy;
    }
}
