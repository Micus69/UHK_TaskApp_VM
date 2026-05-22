// Creates view model for the current UI screen.
export function selectViewState(state) {

    const selectedProject = state.projects.find(project =>
        project.id === state.ui.selectedProjectId
    );

    const selectedTask = state.tasks.find(task =>
        task.id === state.ui.selectedTaskId
    );

    const projectTasks = state.tasks.filter(task =>
        task.projectId === state.ui.selectedProjectId
    );

    const selectedTaskHistory = state.taskHistory.filter(history =>
        history.taskId === state.ui.selectedTaskId
    );

    return {
        screen: state.ui.mode,
        status: state.ui.status,
        errorMessage: state.ui.errorMessage,

        auth: state.auth,

        users: state.users,
        projects: state.projects,
        tasks: state.tasks,

        selectedProject,
        selectedTask,
        projectTasks,
        selectedTaskHistory
    };
}