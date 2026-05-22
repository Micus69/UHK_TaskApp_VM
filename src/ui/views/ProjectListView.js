// Renders project list screen.
export function ProjectListView({ viewState, handlers }) {
    const container = document.createElement('section');

    const title = document.createElement('h2');
    title.textContent = 'Projects';

    const list = document.createElement('ul');

    viewState.projects.forEach(project => {
        const item = document.createElement('li');

        const name = document.createElement('strong');
        name.textContent = project.name;

        const description = document.createElement('p');
        description.textContent = project.description;

        const openButton = document.createElement('button');

        openButton.textContent = 'Open project';

        openButton.addEventListener('click', () => {
            handlers.openProjectDetail(project.id);
        });

        item.appendChild(openButton);

        item.appendChild(name);
        item.appendChild(description);

        list.appendChild(item);
    });

    const button = document.createElement('button');
    button.textContent = 'Refresh project list';
    button.addEventListener('click', handlers.openProjectList);

    container.appendChild(title);
    container.appendChild(list);
    container.appendChild(button);

    return container;
}