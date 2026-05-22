import { getNextTaskStatuses } from '../../domain/taskStatusMachine.js';

// Renders task detail screen.
export function TaskDetailView({ viewState, handlers }) {
    const container = document.createElement('section');

    const task = viewState.selectedTask;

    const title = document.createElement('h2');
    title.textContent = task.title;

    const description = document.createElement('p');
    description.textContent = task.description;

    const status = document.createElement('p');
    status.textContent = `Status: ${task.status}`;

    const nextTitle = document.createElement('h3');
    nextTitle.textContent = 'Available status changes';

    const nextStatuses = getNextTaskStatuses(task.status);

    nextStatuses.forEach(nextStatus => {
        const button = document.createElement('button');
        button.textContent = `Set ${nextStatus}`;

        button.addEventListener('click', () => {
            handlers.changeTaskStatus(task.id, nextStatus);
        });

        container.appendChild(button);
    });

    const backButton = document.createElement('button');
    backButton.textContent = 'Back to project';

    backButton.addEventListener('click', () => {
        handlers.openProjectDetail(task.projectId);
    });

    container.appendChild(title);
    container.appendChild(description);
    container.appendChild(status);
    container.appendChild(nextTitle);
    container.appendChild(backButton);

    return container;
}