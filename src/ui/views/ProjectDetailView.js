// Renders project detail screen.
export function ProjectDetailView({ viewState, handlers }) {

    const container = document.createElement('section');

    const title = document.createElement('h2');
    title.textContent = viewState.selectedProject.name;

    const description = document.createElement('p');
    description.textContent = viewState.selectedProject.description;

    const taskTitle = document.createElement('h3');
    taskTitle.textContent = 'Tasks';

    const taskList = document.createElement('ul');

    viewState.projectTasks.forEach(task => {

        const item = document.createElement('li');

        const button = document.createElement('button');

        button.textContent =
            `${task.title} [${task.status}]`;

        button.addEventListener('click', () => {
            handlers.openTaskDetail(task.id);
        });

        item.appendChild(button);

        taskList.appendChild(item);
    });

    const backButton = document.createElement('button');

    backButton.textContent = 'Back to projects';

    backButton.addEventListener('click', () => {
        handlers.openProjectList();
    });

    container.appendChild(title);
    container.appendChild(description);
    container.appendChild(taskTitle);
    container.appendChild(taskList);
    container.appendChild(backButton);

    return container;
}