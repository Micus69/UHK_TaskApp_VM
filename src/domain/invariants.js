// Ensures that a project exists.
export function assertProjectExists(project) {
    if (!project) {
        throw new Error('Project does not exist.');
    }
}

// Ensures that project is not archived.
export function assertProjectIsActive(project) {
    if (project.archived) {
        throw new Error('Archived project cannot be modified.');
    }
}

// Ensures that task title is valid.
export function assertTaskTitle(title) {
    if (!title || title.trim().length === 0) {
        throw new Error('Task title is required.');
    }
}

// Ensures that status transition is valid.
export function assertStatusTransition(isAllowed) {
    if (!isAllowed) {
        throw new Error('Task status transition is not allowed.');
    }
}

// Ensures that business authorization is valid.
export function assertAuthorized(isAuthorized) {
    if (!isAuthorized) {
        throw new Error('User is not authorized for this action.');
    }
}