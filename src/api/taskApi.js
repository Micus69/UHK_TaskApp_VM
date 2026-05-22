import { canChangeTaskStatus as isStatusTransitionAllowed } from '../domain/taskStatusMachine.js';
import { canChangeTaskStatus as isUserAllowedToChangeStatus } from '../domain/authorization.js';
import { assertAuthorized, assertStatusTransition } from '../domain/invariants.js';

export function createTaskApi() {
    const users = [
        { id: 'u1', name: 'Project Manager', role: 'MANAGER' },
        { id: 'u2', name: 'Developer Member', role: 'MEMBER' }
    ];

    const projects = [
        {
            id: 'p1',
            name: 'Semester Project',
            description: 'Task management SPA for school assignment.',
            ownerId: 'u1',
            memberIds: ['u1', 'u2'],
            archived: false
        }
    ];

    const tasks = [
        {
            id: 't1',
            projectId: 'p1',
            title: 'Create SPA architecture',
            description: 'Prepare state, dispatcher, actions and views.',
            assigneeId: 'u2',
            status: 'TODO',
            priority: 'HIGH',
            createdBy: 'u1',
            dueDate: '2026-05-24'
        }
    ];

    // Returns initial application data.
    async function getInitialData() {
        return structuredClone({
            users,
            projects,
            tasks
        });
    }

    // Changes task status and enforces business rules.
    async function changeTaskStatus({ userId, taskId, newStatus }) {
        const user = users.find(user => user.id === userId);
        const task = tasks.find(task => task.id === taskId);

        assertAuthorized(Boolean(user));
        assertAuthorized(isUserAllowedToChangeStatus(user, task));
        assertStatusTransition(
            isStatusTransitionAllowed(task.status, newStatus)
        );

        task.status = newStatus;

        return structuredClone({
            tasks
        });
    }

    return {
        getInitialData,
        changeTaskStatus
    };
}