import { AiOutlineInfoCircle } from "react-icons/ai"
import "./antd.scss"

export const PopoverTitleTrending = () => {
    return (
        <div className="popoverTitleContainer">
            <p>Filter <span>#</span>Trending</p>
            <AiOutlineInfoCircle />
        </div>
    )
}