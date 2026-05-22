// Renders the whole application from the current state.
export function render(root, state, dispatch) {
    root.replaceChildren();

    const appContainer = document.createElement('main');

    const title = document.createElement('h1');
    title.textContent = 'TaskFlow';

    const status = document.createElement('p');
    status.textContent = `Status: ${state.ui.status}`;

    const screen = document.createElement('p');
    screen.textContent = `Current screen: ${state.ui.mode}`;

    const user = document.createElement('p');
    user.textContent = `Logged user role: ${state.auth.role}`;

    const projectCount = document.createElement('p');
    projectCount.textContent = `Projects: ${state.projects.length}`;

    const taskCount = document.createElement('p');
    taskCount.textContent = `Tasks: ${state.tasks.length}`;

    const button = document.createElement('button');
    button.textContent = 'Open Project List';

    // Dispatches action instead of modifying state directly.
    button.addEventListener('click', () => {
        dispatch({
            type: 'ENTER_PROJECT_LIST'
        });
    });

    appContainer.appendChild(title);
    appContainer.appendChild(status);
    appContainer.appendChild(screen);
    appContainer.appendChild(user);
    appContainer.appendChild(projectCount);
    appContainer.appendChild(taskCount);
    appContainer.appendChild(button);

    root.appendChild(appContainer);
}