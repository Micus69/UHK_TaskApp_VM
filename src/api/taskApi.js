import { canChangeTaskStatus as isStatusTransitionAllowed } from '../domain/taskStatusMachine.js';

import {
    canChangeTaskStatus as isUserAllowedToChangeStatus,
    canCreateTask
} from '../domain/authorization.js';

import {
    assertAuthorized,
    assertStatusTransition,
    assertProjectExists,
    assertProjectIsActive,
    assertTaskTitle
} from '../domain/invariants.js';

// Mock API represents the authoritative data source.
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

    const taskHistory = [
        {
            id: 'h1',
            taskId: 't1',
            userId: 'u1',
            type: 'TASK_CREATED',
            message: 'Task was created.',
            createdAt: '2026-05-22 10:00'
        }
    ];

    let nextTaskId = 2;

    // Returns initial application data.
    async function getInitialData() {
        return structuredClone({
            users,
            projects,
            tasks,
            taskHistory
        });
    }

    // Changes task status and enforces business rules.
    async function changeTaskStatus({ userId, taskId, newStatus }) {
        const user = users.find(user => user.id === userId);
        const task = tasks.find(task => task.id === taskId);

        assertAuthorized(Boolean(user));
        assertAuthorized(Boolean(task));
        assertAuthorized(isUserAllowedToChangeStatus(user, task));

        assertStatusTransition(
            isStatusTransitionAllowed(task.status, newStatus)
        );

        // Stores audit history before status mutation.
        taskHistory.push({
            id: `h${taskHistory.length + 1}`,
            taskId: task.id,
            userId,
            type: 'STATUS_CHANGED',
            message: `Status changed from ${task.status} to ${newStatus}`,
            createdAt: new Date().toISOString()
        });

        task.status = newStatus;

        return structuredClone({
            tasks,
            taskHistory
        });
    }

    // Creates task and enforces project/task business rules.
    async function createTask({ userId, projectId, title, description, assigneeId, priority, dueDate }) {
        const user = users.find(user => user.id === userId);
        const project = projects.find(project => project.id === projectId);

        assertAuthorized(Boolean(user));
        assertAuthorized(canCreateTask(user));
        assertProjectExists(project);
        assertProjectIsActive(project);
        assertTaskTitle(title);

        const task = {
            id: `t${nextTaskId}`,
            projectId,
            title: title.trim(),
            description: description.trim(),
            assigneeId,
            status: 'TODO',
            priority,
            createdBy: userId,
            dueDate
        };

        nextTaskId += 1;

        tasks.push(task);

        // Stores task creation audit record.
        taskHistory.push({
            id: `h${taskHistory.length + 1}`,
            taskId: task.id,
            userId,
            type: 'TASK_CREATED',
            message: `Task "${task.title}" was created.`,
            createdAt: new Date().toISOString()
        });

        return structuredClone({
            tasks,
            taskHistory
        });
    }

    return {
        getInitialData,
        changeTaskStatus,
        createTask
    };
}