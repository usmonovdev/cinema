import { useState, useContext, createContext } from "react";

const StateContext = createContext();

const StateContextProvider = ({ children }) => {
    // for image size
    const [imageSize, setImageSize] = useState("w500")

    return (
        <StateContext.Provider
            value={{
                imageSize,
                setImageSize
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

// custom hook
const useStateContext = () => {
    return useContext(StateContext)
}

// export context's
export { StateContext, StateContextProvider, useStateContext }