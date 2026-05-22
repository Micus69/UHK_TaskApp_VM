import { appInit } from '../actions/appInit.js';
import { enterProjectList } from '../actions/enterProjectList.js';

// Interprets actions and delegates business logic.
export function createDispatcher(store, api) {

    return async function dispatch(action) {

        switch (action.type) {

            case 'APP_INIT':
                return appInit({ store, api });

            case 'ENTER_PROJECT_LIST':
                return enterProjectList({ store });

            default:
                console.warn(`Unknown action type: ${action.type}`);
        }
    };
}