import { getNextTaskStatuses } from '../../domain/taskStatusMachine.js';

// Maps business statuses to CSS classes.
function getStatusClass(status) {

    switch (status) {

        case 'TODO':
            return 'status-todo';

        case 'IN_PROGRESS':
            return 'status-in-progress';

        case 'DONE':
            return 'status-done';

        case 'CANCELED':
            return 'status-canceled';

        default:
            return '';
    }
}

// Renders task detail screen.
export function TaskDetailView({ viewState, handlers }) {

    const container = document.createElement('section');

    const task = viewState.selectedTask;

    const title = document.createElement('h2');
    title.textContent = task.title;

    const description = document.createElement('p');
    description.textContent = task.description;

    const status = document.createElement('p');
    status.textContent = 'Status: ';

    const badge = document.createElement('span');

    badge.textContent = task.status;

    badge.className =
        `status-badge ${getStatusClass(task.status)}`;

    status.appendChild(badge);

    const nextTitle = document.createElement('h3');
    nextTitle.textContent = 'Available status changes';

    const nextStatuses = getNextTaskStatuses(task.status);

    const backButton = document.createElement('button');
    backButton.textContent = 'Back to project';

    backButton.addEventListener('click', () => {
        handlers.openProjectDetail(task.projectId);
    });

    container.appendChild(title);
    container.appendChild(description);
    container.appendChild(status);
    container.appendChild(nextTitle);

    // Renders available state transitions.
    nextStatuses.forEach(nextStatus => {

        const button = document.createElement('button');

        button.textContent = `Set ${nextStatus}`;

        button.addEventListener('click', () => {
            handlers.changeTaskStatus(task.id, nextStatus);
        });

        container.appendChild(button);
    });

    const historyTitle = document.createElement('h3');
    historyTitle.textContent = 'Task history';

    container.appendChild(historyTitle);

    const historyList = document.createElement('ul');

    viewState.selectedTaskHistory.forEach(entry => {

        const item = document.createElement('li');

        item.className = 'history-entry';

        item.textContent =
            `${entry.type} - ${entry.message}`;

        historyList.appendChild(item);
    });

    container.appendChild(historyList);

    container.appendChild(backButton);

    return container;
}