// Clears visible UI feedback messages.
export function clearUiMessage({ store }) {
    const currentState = store.getState();

    store.setState({
        ...currentState,
        ui: {
            ...currentState.ui,
            errorMessage: null,
            notification: null
        }
    });
}