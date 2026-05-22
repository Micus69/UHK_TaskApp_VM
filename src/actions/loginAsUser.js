// Switches mocked authenticated user.
export function loginAsUser({ store, payload }) {
    const currentState = store.getState();

    const user = currentState.users.find(user =>
        user.id === payload.userId
    );

    if (!user) {
        return;
    }

    store.setState({
        ...currentState,
        auth: {
            userId: user.id,
            role: user.role
        },
        ui: {
            ...currentState.ui,
            notification: `Logged as ${user.name}`,
            errorMessage: null
        }
    });
}