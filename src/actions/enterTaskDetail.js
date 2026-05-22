// Opens selected task detail screen.
export function enterTaskDetail({ store, payload }) {

    const currentState = store.getState();

    store.setState({
        ...currentState,

        ui: {
            ...currentState.ui,
            mode: 'TASK_DETAIL',
            selectedTaskId: payload.taskId
        }
    });
}