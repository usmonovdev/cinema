import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const StateContext = createContext();

const StateContextProvider = ({ children }) => {
    // state for filter #upcoming
    const [filterUpLang, setFilterUpLang] = useState("all")
    const [filterUpStar, setFilterUpStar] = useState("all")

    // state for filter #top rated
    const [filterTopLang, setFilterTopLang] = useState("all")
    const [filterTopStar, setFilterTopStar] = useState("all")

    // state for loadMore
    const [isCompleted, setIsCompleted] = useState(false)
    const [isCompletedTop, setIsCompletedTop] = useState(false)

    return (
        <StateContext.Provider
            value={{
                filterUpLang,
                setFilterUpLang,
                filterUpStar,
                setFilterUpStar,
                isCompleted,
                setIsCompleted,
                filterTopLang,
                setFilterTopLang,
                filterTopStar,
                setFilterTopStar,
                isCompletedTop,
                setIsCompletedTop
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