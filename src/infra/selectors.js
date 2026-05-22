// Creates view model for the current UI screen.
export function selectViewState(state) {
    return {
        screen: state.ui.mode,
        status: state.ui.status,
        errorMessage: state.ui.errorMessage,
        auth: state.auth,
        projects: state.projects,
        tasks: state.tasks
    };
}