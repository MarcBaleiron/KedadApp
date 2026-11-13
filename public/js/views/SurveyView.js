import { el } from '../utils/dom.js';
import { View } from './View.js';

export class SurveyView extends View {
    bind() {
        this.store.subscribe('survey', (survey) => this.render(survey));
        this.ref('form').addEventListener('submit', (event) => this.#onSubmit(event));
    }

    async load() {
        this.store.set('survey', await this.api.getSurvey());
    }

    render({ question, options, votedOptionId }) {
        const hasVoted = votedOptionId !== null;

        this.ref('question').textContent = question;
        this.ref('options').replaceChildren(
            ...options.map(({ id, label, votes }) =>
                el('label', { className: 'option' },
                    el('input', {
                        attrs: { type: 'radio', name: 'vote', value: String(id), ...(id === votedOptionId && { checked: '' }), ...(hasVoted && { disabled: '' }) },
                    }),
                    el('span', { className: 'option__label', text: label }),
                    el('span', { className: 'option__count', text: String(votes) }),
                ),
            ),
        );
        this.ref('submit').disabled = hasVoted;
    }

    async #onSubmit(event) {
        event.preventDefault();
        const selected = this.root.querySelector('input[name="vote"]:checked');
        if (!selected) {
            this.showError('Choose an option before voting.');
            return;
        }

        this.showError();
        try {
            this.store.set('survey', await this.api.vote(Number(selected.value)));
        } catch (error) {
            this.showError(error.message);
        }
    }
}
