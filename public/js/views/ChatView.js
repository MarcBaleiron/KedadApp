import { el } from '../utils/dom.js';
import { View } from './View.js';

const timeFormat = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' });

/** MVC — VIEW: renders the message list and reports submitted text. */
export class ChatView extends View {
    render({ messages }) {
        const list = this.ref('list');
        list.replaceChildren(...messages.map(ChatView.#renderMessage));
        list.scrollTop = list.scrollHeight;
    }

    /** @param {(content: string) => void} handler called with the trimmed text */
    onSend(handler) {
        this.ref('form').addEventListener('submit', (event) => {
            event.preventDefault();
            handler(this.ref('input').value.trim());
        });
    }

    clearInput() {
        this.ref('input').value = '';
    }

    setSending(isSending) {
        this.ref('send').disabled = isSending;
    }

    static #renderMessage({ author, own, content, sentAt }) {
        return el('li', { className: own ? 'message message--own' : 'message' },
            el('span', { className: 'message__author', text: author }),
            el('p', { className: 'message__text', text: content }),
            el('time', { className: 'message__time', text: timeFormat.format(new Date(sentAt)), attrs: { datetime: sentAt } }),
        );
    }
}
