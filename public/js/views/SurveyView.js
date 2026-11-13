import { el } from '../utils/dom.js';
import { View } from './View.js';

/** MVC — VIEW: renders the survey and reports the chosen option. */
export class SurveyView extends View {
    render({ survey }) {
        if (!survey) return;
        const { question, options, votedOptionId } = survey;
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

    /** @param {(optionId: number | null) => void} handler null when nothing is selected */
    onVote(handler) {
        this.ref('form').addEventListener('submit', (event) => {
            event.preventDefault();
            const selected = this.root.querySelector('input[name="vote"]:checked');
            handler(selected ? Number(selected.value) : null);
        });
    }
}
