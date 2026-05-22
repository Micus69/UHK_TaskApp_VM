// Creates a simple reactive state store.
export function createStore(initialState) {

    // Internal application state.
    let state = initialState;

    // Registered listeners.
    const listeners = [];

    return {

        // Returns current state snapshot.
        getState() {
            return state;
        },

        // Replaces state and notifies listeners.
        setState(newState) {
            state = newState;

            listeners.forEach(listener => {
                listener(state);
            });
        },

        // Registers state change listener.
        subscribe(listener) {
            listeners.push(listener);
        }
    };
}