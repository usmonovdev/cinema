export const reducer = (state, action) => {
    switch (action.type) {
        // for comments
        case "READ_MORE":
            return {
                ...state,
                sliceLast: state.sliceLast = state.length,
                read: state.read = true
            }
        case "READ_LESS":
            return {
                ...state,
                sliceLast: state.sliceLast = "180",
                read: state.read = false
            }
        // for load more
        case "LOAD_MORE":
            return {
                ...state,
                index: state.index + 4
            }
        case "IS_COMPLETED": {
            return {
                ...state,
                completed: state.completed = true
            }
        }
        // for loading
        case "LOADING": {
            return {
                ...state,
                loading: state.loading = true
            }
        }
        case "LOADING_FALSE": {
            return {
                ...state,
                loading: state.loading = false
            }
        }
        default:
            return;
    }
}

export const initial = {
    size: "w500"
}