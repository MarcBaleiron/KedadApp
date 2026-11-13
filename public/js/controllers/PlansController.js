import { Controller } from './Controller.js';

export class PlansController extends Controller {
    bind() {
        this.view.onRefresh(() => this.#refresh());
    }

    async #refresh() {
        this.view.setBusy(true);
        this.view.showError();
        try {
            await this.model.load();
        } catch {
            this.view.showError('Plans could not be loaded. Please retry.');
        } finally {
            this.view.setBusy(false);
        }
    }
}
