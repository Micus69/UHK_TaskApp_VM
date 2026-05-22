import { createInitialState } from './state.js';
import { createStore } from '../infra/createStore.js';
import { createDispatcher } from '../infra/dispatch.js';
import { createTaskApi } from '../api/taskApi.js';
import { render } from '../ui/render.js';

// Initializes application dependencies and first render.
export function initApp(root) {
    const store = createStore(createInitialState());
    const api = createTaskApi();
    const dispatch = createDispatcher(store, api);

    store.subscribe((state) => {
        render(root, state, dispatch);
    });

    render(root, store.getState(), dispatch);

    dispatch({
        type: 'APP_INIT'
    });
}