export const reducer = (state, action) => {
    switch (action.type) {
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
        default:
            return;
    }
}