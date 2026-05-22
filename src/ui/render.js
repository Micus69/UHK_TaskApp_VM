import { selectViewState } from '../infra/selectors.js';
import { createHandlers } from '../infra/handlers.js';
import { ProjectListView } from './views/ProjectListView.js';

// Renders the whole application from the current state.
export function render(root, state, dispatch) {
    root.replaceChildren();

    const viewState = selectViewState(state);
    const handlers = createHandlers(dispatch);

    const appContainer = document.createElement('main');

    const title = document.createElement('h1');
    title.textContent = 'TaskFlow';

    const status = document.createElement('p');
    status.textContent = `Status: ${viewState.status}`;

    const role = document.createElement('p');
    role.textContent = `Logged role: ${viewState.auth.role}`;

    appContainer.appendChild(title);
    appContainer.appendChild(status);
    appContainer.appendChild(role);

    if (viewState.screen === 'PROJECT_LIST') {
        appContainer.appendChild(ProjectListView({ viewState, handlers }));
    }

    root.appendChild(appContainer);
}