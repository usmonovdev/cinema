export const reducer = (state, action) => {
    switch (action.type) {
        case "IMAGE_SIZE":
            return [...state, action.payload]
    
        default:
            return;
    }
}