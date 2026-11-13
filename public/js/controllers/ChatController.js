import { ChatModel } from '../models/ChatModel.js';
import { Controller } from './Controller.js';

const POLL_INTERVAL_MS = 3000; // serverless hosting: no WebSockets, so we poll

export class ChatController extends Controller {
    bind() {
        this.view.onSend((content) => this.#send(content));
    }

    async load() {
        await super.load();
        setInterval(() => this.#poll(), POLL_INTERVAL_MS);
    }

    async #send(content) {
        const problem = ChatModel.validate(content);
        this.view.showError(problem);
        if (problem) return;

        this.view.setSending(true);
        try {
            await this.model.send(content);
            this.view.clearInput();
        } catch {
            this.view.showError('The message could not be sent. Please retry.');
        } finally {
            this.view.setSending(false);
        }
    }

    async #poll() {
        try {
            await this.model.poll();
        } catch {
            // Transient failure: the next tick tries again.
        }
    }
}
