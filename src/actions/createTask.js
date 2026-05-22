// Creates a new task through API business rules.
export async function createTask({ store, api, payload }) {
    const currentState = store.getState();

    try {
        const result = await api.createTask({
            userId: currentState.auth.userId,
            projectId: payload.projectId,
            title: payload.title,
            description: payload.description,
            assigneeId: payload.assigneeId,
            priority: payload.priority,
            dueDate: payload.dueDate
        });

        store.setState({
            ...currentState,
            tasks: result.tasks,
            ui: {
                ...currentState.ui,
                mode: 'PROJECT_DETAIL',
                selectedProjectId: payload.projectId,
                errorMessage: null,
                notification: 'Task created.'
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