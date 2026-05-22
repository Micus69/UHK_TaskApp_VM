// Changes task status using API business rules.
export async function changeTaskStatus({ store, api, payload }) {
    const currentState = store.getState();

    try {
        const result = await api.changeTaskStatus({
            userId: currentState.auth.userId,
            taskId: payload.taskId,
            newStatus: payload.newStatus
        });

        store.setState({
            ...currentState,
            tasks: result.tasks,
            ui: {
                ...currentState.ui,
                notification: 'Task status changed.',
                errorMessage: null
            }
        });
    } catch (error) {
        store.setState({
            ...currentState,
            ui: {
                ...currentState.ui,
                errorMessage: error.message
            }
        });
    }
}