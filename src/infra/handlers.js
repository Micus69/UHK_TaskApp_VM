// Creates UI handlers that dispatch application actions.
export function createHandlers(dispatch) {
    return {
        openProjectList() {
            dispatch({ type: 'ENTER_PROJECT_LIST' });
        }
    };
}