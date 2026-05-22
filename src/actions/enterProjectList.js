// Opens project list screen.
export function enterProjectList({ store }) {

    const currentState = store.getState();

    store.setState({
        ...currentState,

        ui: {
            ...currentState.ui,
            mode: 'PROJECT_LIST'
        }
    });
}