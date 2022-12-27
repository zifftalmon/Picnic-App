

const Status = () => {
    return (
        <div>
            <label className="toggle">
                <input type="checkbox"/>
                <span className="slider"></span>
                <span className="labels" data-on="Solo👤" data-off="Company👥"></span>
            </label>
        </div>
    )
}

export default Status