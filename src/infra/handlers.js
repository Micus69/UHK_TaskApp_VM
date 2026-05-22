// Creates UI handlers that dispatch application actions.
export function createHandlers(dispatch) {

    return {

        openProjectList() {
            dispatch({
                type: 'ENTER_PROJECT_LIST'
            });
        },

        openProjectDetail(projectId) {
            dispatch({
                type: 'ENTER_PROJECT_DETAIL',
                payload: {
                    projectId
                }
            });
        },

        openTaskDetail(taskId) {
            dispatch({
                type: 'ENTER_TASK_DETAIL',
                payload: {
                    taskId
                }
            });
        },

        changeTaskStatus(taskId, newStatus) {
            dispatch({
                type: 'CHANGE_TASK_STATUS',
                payload: {
                    taskId,
                    newStatus
                }
            });
        }
    };
}