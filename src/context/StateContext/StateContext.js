import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const StateContext = createContext();

const StateContextProvider = ({ children }) => {
    // state for filter #upcoming
    const [filterUpLang, setFilterUpLang] = useState("all")
    const [filterUpStar, setFilterUpStar] = useState("all")

    return (
        <StateContext.Provider
            value={{
                filterUpLang,
                setFilterUpLang,
                filterUpStar,
                setFilterUpStar
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