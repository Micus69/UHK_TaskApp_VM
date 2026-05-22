// Renders task creation form.
export function TaskFormView({ viewState, handlers }) {
    const form = document.createElement('form');

    const titleInput = document.createElement('input');
    titleInput.placeholder = 'Task title';

    const descriptionInput = document.createElement('textarea');
    descriptionInput.placeholder = 'Task description';

    const assigneeSelect = document.createElement('select');

    viewState.users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = `${user.name} (${user.role})`;
        assigneeSelect.appendChild(option);
    });

    const prioritySelect = document.createElement('select');

    ['LOW', 'MEDIUM', 'HIGH'].forEach(priority => {
        const option = document.createElement('option');
        option.value = priority;
        option.textContent = priority;
        prioritySelect.appendChild(option);
    });

    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.value = '2026-05-24';

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Create task';

    form.addEventListener('submit', event => {
        event.preventDefault();

        handlers.createTask({
            projectId: viewState.selectedProject.id,
            title: titleInput.value,
            description: descriptionInput.value,
            assigneeId: assigneeSelect.value,
            priority: prioritySelect.value,
            dueDate: dueDateInput.value
        });
    });

    form.appendChild(titleInput);
    form.appendChild(descriptionInput);
    form.appendChild(assigneeSelect);
    form.appendChild(prioritySelect);
    form.appendChild(dueDateInput);
    form.appendChild(submitButton);

    return form;
}