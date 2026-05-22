import { selectViewState } from '../infra/selectors.js';
import { createHandlers } from '../infra/handlers.js';
import { ProjectListView } from './views/ProjectListView.js';
import { ProjectDetailView } from './views/ProjectDetailView.js';
import { TaskDetailView } from './views/TaskDetailView.js';

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
        appContainer.appendChild(
            ProjectListView({ viewState, handlers })
        );
    } else if (viewState.screen === 'PROJECT_DETAIL') {
        appContainer.appendChild(
            ProjectDetailView({ viewState, handlers })
        );
    } else {
        const error = document.createElement('p');
        error.textContent = 'Unknown screen.';
        appContainer.appendChild(error);
    }

    if (viewState.screen === 'TASK_DETAIL') {
        appContainer.appendChild(
            TaskDetailView({ viewState, handlers })
        );
    }

    if (viewState.errorMessage) {
        const error = document.createElement('p');
        error.textContent = viewState.errorMessage;
        appContainer.appendChild(error);
    }

    root.appendChild(appContainer);
}