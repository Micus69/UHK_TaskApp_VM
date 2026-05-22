// Defines allowed task status transitions.
const allowedTransitions = {
    TODO: ['IN_PROGRESS', 'CANCELED'],
    IN_PROGRESS: ['DONE', 'CANCELED'],
    DONE: [],
    CANCELED: []
};

// Checks if task status transition is allowed.
export function canChangeTaskStatus(fromStatus, toStatus) {
    return allowedTransitions[fromStatus]?.includes(toStatus) ?? false;
}

// Returns available next statuses for a task.
export function getNextTaskStatuses(currentStatus) {
    return allowedTransitions[currentStatus] ?? [];
}