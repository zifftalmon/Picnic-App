import SearchLocation from "./SearchLocation"

const Home = (props) => {
    return (
        <div className="homeDiv">
            <div>
                <h2>Home</h2>
                <h4>Welcome! Our guess is you're going on a picnic...</h4>
                <h2>great!</h2>
                <h4>Let's find a cool place suited for your needs, if you need some help take a look at our reccomandations page.<br/>
                Happy picnicing!<br/>🌲</h4>
            </div>
                <SearchLocation/>
        </div>
    )
}

export default Home