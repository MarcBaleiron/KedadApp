import { Model } from './Model.js';

const MAX_LENGTH = 1000;

/** MVC — MODEL: chat messages and the chat business rules. */
export class ChatModel extends Model {
    #api;

    /** @param {import('../core/ApiClient.js').ApiClient} api */
    constructor(api) {
        super({ messages: [] });
        this.#api = api;
    }

    /** Business rules: not empty, at most 1000 characters. Returns '' when valid. */
    static validate(content) {
        if (!content) return 'The message cannot be empty.';
        if (content.length > MAX_LENGTH) return `The message is limited to ${MAX_LENGTH} characters.`;
        return '';
    }

    async load() {
        this.setState({ messages: await this.#api.getMessages() });
    }

    async send(content) {
        const message = await this.#api.sendMessage(content);
        this.setState({ messages: [...this.state.messages, message] });
    }

    /** Fetches only the messages newer than the last one we already have. */
    async poll() {
        const { messages } = this.state;
        const fresh = await this.#api.getMessages(messages.at(-1)?.id ?? 0);
        if (fresh.length) this.setState({ messages: [...messages, ...fresh] });
    }
}
