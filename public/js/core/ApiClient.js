import { mockDb } from '../data/mockData.js';

const LATENCY_MS = 150;

/**
 * PATTERN 1 — SINGLETON
 * The Presentation Layer talks to the server through ONE API client module
 * (see the architecture document). Only one instance may exist, so every view
 * shares the same connection point and, for now, the same mock database.
 *
 * Views never know how data is stored: they depend only on these methods
 * (the API contract). To go live, replace the bodies with fetch() calls.
 */
export class ApiClient {
    static #instance = null;
    #db;

    /** @returns {ApiClient} the single shared instance */
    static getInstance() {
        ApiClient.#instance ??= new ApiClient();
        return ApiClient.#instance;
    }

    constructor() {
        if (ApiClient.#instance) throw new Error('ApiClient is a singleton: use ApiClient.getInstance().');
        this.#db = structuredClone(mockDb);
    }

    /** Simulates network latency and returns a copy, like a JSON response would. */
    #respond(data) {
        return new Promise((resolve) => setTimeout(() => resolve(structuredClone(data)), LATENCY_MS));
    }

    /** @param {number} [afterId] only messages newer than this id (used by polling) */
    getMessages(afterId = 0) {
        return this.#respond(this.#db.messages.filter((message) => message.id > afterId));
    }

    /** @param {string} content already validated by the view */
    sendMessage(content) {
        const lastId = this.#db.messages.at(-1)?.id ?? 0;
        const message = { id: lastId + 1, author: 'You', own: true, content, sentAt: new Date().toISOString() };
        this.#db.messages.push(message);
        return this.#respond(message);
    }

    getSurvey() {
        return this.#respond(this.#db.survey);
    }

    /** One vote per member per survey, as in the business rules. */
    vote(optionId) {
        const { survey } = this.#db;
        const option = survey.options.find((candidate) => candidate.id === optionId);
        if (!option) return Promise.reject(new Error('Unknown option.'));
        if (survey.votedOptionId !== null) return Promise.reject(new Error('You have already voted.'));

        option.votes += 1;
        survey.votedOptionId = optionId;
        return this.#respond(survey);
    }

    getAvailability() {
        return this.#respond(this.#db.availability);
    }

    getPlanSuggestions() {
        return this.#respond(this.#db.plans);
    }
}
