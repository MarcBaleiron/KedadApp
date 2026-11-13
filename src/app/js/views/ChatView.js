import { el } from '../utils/dom.js';
import { View } from './View.js';

const MAX_LENGTH = 1000;
const POLL_INTERVAL_MS = 3000; // serverless hosting: no WebSockets, so we poll
const timeFormat = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' });

export class ChatView extends View {
    bind() {
        this.store.subscribe('messages', (messages) => this.render(messages));
        this.ref('form').addEventListener('submit', (event) => this.#onSubmit(event));
    }

    async load() {
        this.store.set('messages', await this.api.getMessages());
        setInterval(() => this.#poll(), POLL_INTERVAL_MS);
    }

    render(messages) {
        const list = this.ref('list');
        list.replaceChildren(...messages.map(ChatView.#renderMessage));
        list.scrollTop = list.scrollHeight;
    }

    static #renderMessage({ author, own, content, sentAt }) {
        return el('li', { className: own ? 'message message--own' : 'message' },
            el('span', { className: 'message__author', text: author }),
            el('p', { className: 'message__text', text: content }),
            el('time', { className: 'message__time', text: timeFormat.format(new Date(sentAt)), attrs: { datetime: sentAt } }),
        );
    }

    /** Business rules: not empty, at most 1000 characters. */
    static #validate(content) {
        if (!content) return 'The message cannot be empty.';
        if (content.length > MAX_LENGTH) return `The message is limited to ${MAX_LENGTH} characters.`;
        return '';
    }

    async #onSubmit(event) {
        event.preventDefault();
        const input = this.ref('input');
        const content = input.value.trim();

        const problem = ChatView.#validate(content);
        this.showError(problem);
        if (problem) return;

        const button = this.ref('send');
        button.disabled = true;
        try {
            const message = await this.api.sendMessage(content);
            this.store.set('messages', [...this.store.get('messages'), message]);
            input.value = '';
        } catch {
            this.showError('The message could not be sent. Please retry.');
        } finally {
            button.disabled = false;
        }
    }

    /** Asks only for messages newer than the last one we already have. */
    async #poll() {
        try {
            const current = this.store.get('messages');
            const fresh = await this.api.getMessages(current.at(-1)?.id ?? 0);
            if (fresh.length) this.store.set('messages', [...current, ...fresh]);
        } catch {
            // Transient failure: the next tick tries again.
        }
    }
}
