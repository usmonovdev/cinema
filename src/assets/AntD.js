export const PopoverTitleTrending = () => {
    return (
        <div className="popoverTitleContainer">
            <p>Filter <span>#</span>Trending</p>
        </div>
    )
}
export const PopoverTitleUpcoming = () => {
    return (
        <div className="popoverTitleContainer">
            <p>Filter <span>#</span>Upcoming</p>
        </div>
    )
}
export const PopoverTitleTop = () => {
    return (
        <div className="popoverTitleContainer">
            <p>Filter <span>#</span>Top Rated</p>
        </div>
    )
}
export const DeleteAccount = () => {
    return (
        <div className="popoverTitleContainer">
            <p>Delete your account?</p>
            <p style={{opacity: ".8", fontWeight: "400"}}>If you delete your account, it will <br /> not be possible to return the data.</p>
        </div>
    )
}

export const ResetPasswordMethod = () => {
    return (
        <div className="popoverTitleContainer">
            <p style={{opacity: ".8", fontWeight: "400"}}>After entering your email <br /> address, check your email messages.</p>
        </div>
    )
}