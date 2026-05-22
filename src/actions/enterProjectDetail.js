// Opens selected project detail screen.
export function enterProjectDetail({ store, payload }) {

    const currentState = store.getState();

    store.setState({
        ...currentState,

        ui: {
            ...currentState.ui,
            mode: 'PROJECT_DETAIL',
            selectedProjectId: payload.projectId
        }
    });
}