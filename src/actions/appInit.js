// Loads initial data from the API into the state.
export async function appInit({ store, api }) {
    const currentState = store.getState();

    store.setState({
        ...currentState,
        ui: {
            ...currentState.ui,
            status: 'LOADING',
            errorMessage: null
        }
    });

    try {
        const data = await api.getInitialData();

        store.setState({
            ...store.getState(),
            users: data.users,
            projects: data.projects,
            tasks: data.tasks,
            taskHistory: data.taskHistory,
            auth: {
                userId: 'u1',
                role: 'MANAGER'
            },
            ui: {
                ...store.getState().ui,
                status: 'READY'
            }
        });
    } catch (error) {
        store.setState({
            ...store.getState(),
            ui: {
                ...store.getState().ui,
                status: 'ERROR',
                errorMessage: error.message
            }
        });
    }
}