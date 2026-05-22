// Renders mocked user switch controls.
export function UserSwitchView({ viewState, handlers }) {
    const container = document.createElement('section');

    const title = document.createElement('h2');
    title.textContent = 'Mock login';

    const select = document.createElement('select');

    viewState.users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = `${user.name} (${user.role})`;

        if (user.id === viewState.auth.userId) {
            option.selected = true;
        }

        select.appendChild(option);
    });

    const button = document.createElement('button');
    button.textContent = 'Switch user';

    button.addEventListener('click', () => {
        handlers.loginAsUser(select.value);
    });

    container.appendChild(title);
    container.appendChild(select);
    container.appendChild(button);

    return container;
}