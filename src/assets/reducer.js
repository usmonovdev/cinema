export const reducer = (state, action) => {
    switch (action.type) {
        // FOR COMMENTS
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
        // FOR LOAD MORE
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
        // FOR LOADING
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
        // FOR OPENMOVIES INFO PAGE
        case "OPEN_TRUE": {
            return {
                ...state,
                info: state.info = true
            }
        }
        case "OPEN_FALSE": {
            return {
                ...state,
                info: state.info = false
            }
        }
        // FOR FILTER
        case "FILTER_TRENDING": {
            return {
                ...state,
                trendingFilter: action.nextTrend
            }
        }
        case "FILTER_TOP": {
            return {
                ...state,
                topFilter: action.topFilter
            }
        }
        case "FILTER_UP": {
            return {
                ...state,
                upFilter: action.upFilter
            }
        }
        case "FILTER_SIMILAR": {
            return {
                ...state,
                simFilter: action.nextSim
            }
        }
        // FOR IMAGE SIZE CHANGING
        case "IMAGE_SIZE": {
            return {
                ...state,
                size: action.newSize
            }
        }
        // FOR RESET IMAGE SIZE
        case "DEFAULT_IMAGE_SIZE": {
            return {
                ...state,
                size: state.size = "w500"
            }
        }
        // FOR SLIDER SPEED
        case "SPEED": {
            return {
                ...state,
                speed: action.newSpeed
            }
        }
        case "DEFAULT_SLIDER_SPEED": {
            return {
                ...state,
                speed: state.speed = "10000"
            }
        }
        // FOR THEME COLOR
        case "THEME": {
            return {
                ...state,
                color: action.payload
            }
        }
        case "DEFAULT_THEME": {
            return {
                ...state,
                color: state.color = "#e6b31e"
            }
        }
        // FOR GET INPUT VALUE
        case "INPUT_VALUE": {
            return {
                ...state,
                inputValue: action.newInputValue
            }
        }
        // FOR SEARCH RESULTS
        case "SEARCH": {
            return {
                ...state,
                apiData: action.newApiData
            }
        }
        // FOR DRAWER OPEN FUNCTION
        case "DRAWER_OPEN": {
            return {
                ...state,
                drawer: state.drawer = true
            }
        }
        // FOR DRAWER CLOSE FUNCTION
        case "DRAWER_CLOSE": {
            return {
                ...state,
                drawer: state.drawer = false
            }
        }
        // FOR ADD TO LIKED MOVIES
        case "LIKE": {
            return {
                ...state,
                localMovie: action.newLocalMovie
            }
        }
        // FOR GET ERRORS IN SIGN
        case "ERR_EMAIL": {
            return {
                ...state,
                errEmail: state.errEmail = true
            }
        }
        case "ERR_EMAIL_RETURN": {
            return {
                ...state,
                errEmail: state.errEmail = false
            }
        }
        case "ERR_PASSWORD": {
            return {
                ...state,
                errPassword: state.errPassword = true
            }
        }
        case "ERR_PASSWORD_RETURN": {
            return {
                ...state,
                errPassword: state.errPassword = false
            }
        }
        case "ERR_IMAGE": {
            return {
                ...state,
                errImage: state.errImage = true
            }
        }
        case "ERR_IMAGE_RETURN": {
            return {
                ...state,
                errImage: state.errImage = false
            }
        }
        default:
            return;
    }
}

export const initial = {
    size: window.localStorage.getItem("IMAGE_QUALITY") == null ?
        "w500" : window.localStorage.getItem("IMAGE_QUALITY"),
    trendingFilter: "all",
    topFilter: "all",
    upFilter: "all",
    simFilter: "all",
    color: window.localStorage.getItem("THEME_COLOR") == null ?
        "#e6b31e" : window.localStorage.getItem("THEME_COLOR"),
    speed: window.localStorage.getItem("SLIDER_SPEED") == null ?
        "10000" : window.localStorage.getItem("SLIDER_SPEED"),
    localMovie: []
}