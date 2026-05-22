import { appInit } from '../actions/appInit.js';
import { enterProjectList } from '../actions/enterProjectList.js';
import { enterProjectDetail } from '../actions/enterProjectDetail.js';
import { enterTaskDetail } from '../actions/enterTaskDetail.js';
import { changeTaskStatus } from '../actions/changeTaskStatus.js';
import { createTask } from '../actions/createTask.js';
import { loginAsUser } from '../actions/loginAsUser.js';
import { clearUiMessage } from '../actions/clearUiMessage.js';

// Interprets actions and delegates business logic.
export function createDispatcher(store, api) {

    return async function dispatch(action) {

        switch (action.type) {

            case 'APP_INIT':
                return appInit({ store, api });

            case 'ENTER_PROJECT_LIST':
                return enterProjectList({ store });

            case 'ENTER_PROJECT_DETAIL':
                return enterProjectDetail({
                    store,
                    payload: action.payload
                });

            case 'ENTER_TASK_DETAIL':
                return enterTaskDetail({
                    store,
                    payload: action.payload
                });

            case 'CHANGE_TASK_STATUS':
                return changeTaskStatus({
                    store,
                    api,
                    payload: action.payload
                });

            case 'CREATE_TASK':
                return createTask({
                    store,
                    api,
                    payload: action.payload
                });

            case 'LOGIN_AS_USER':
                return loginAsUser({
                    store,
                    payload: action.payload
                });

            case 'CLEAR_UI_MESSAGE':
                return clearUiMessage({ store });

            default:
                console.warn(`Unknown action type: ${action.type}`);
        }
    };
}