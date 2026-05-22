// Creates the initial application state.
export function createInitialState() {
    return {
        // Business data loaded from the API.
        projects: [],
        tasks: [],
        users: [],

        // Mocked authentication context.
        auth: {
            userId: null,
            role: 'ANONYMOUS'
        },

        // UI state is separated from business data.
        ui: {
            mode: 'PROJECT_LIST',
            selectedProjectId: null,
            selectedTaskId: null,
            status: 'IDLE',
            errorMessage: null,
            notification: null
        }
    };
}