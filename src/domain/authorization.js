// Checks if user can create a project.
export function canCreateProject(user) {
    return user.role === 'MANAGER';
}

// Checks if user can create a task.
export function canCreateTask(user) {
    return user.role === 'MANAGER';
}

// Checks if user can archive a project.
export function canArchiveProject(user) {
    return user.role === 'MANAGER';
}

// Checks if user can change task status.
export function canChangeTaskStatus(user, task) {
    return user.role === 'MANAGER' || task.assigneeId === user.id;
}

// Checks if user can comment on task.
export function canCommentTask(user, project) {
    return project.memberIds.includes(user.id);
}