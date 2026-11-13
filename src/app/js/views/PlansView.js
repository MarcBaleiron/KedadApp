import { el } from '../utils/dom.js';
import { View } from './View.js';

export class PlansView extends View {
    bind() {
        this.store.subscribe('plans', (plans) => this.render(plans));
        this.ref('suggest').addEventListener('click', () => this.#refresh());
    }

    async load() {
        this.store.set('plans', await this.api.getPlanSuggestions());
    }

    render(plans) {
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

    async #refresh() {
        const button = this.ref('suggest');
        button.disabled = true;
        this.showError();
        try {
            await this.load();
        } catch {
            this.showError('Plans could not be loaded. Please retry.');
        } finally {
            button.disabled = false;
        }
    }
}
