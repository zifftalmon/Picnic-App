import SearchLocation from "./SearchLocation"

const Home = (props) => {
    return (
        <div className="homeDiv">
            <h1>Home</h1>
            <SearchLocation/>
            <h3>Welcome! Our guess is you're going on a picnic...</h3>
            <h1>great!</h1>
            <h3>Let's find a cool place suited for your needs, if you need some help take a look at our reccomandations page.<br/>
            Happy picnicing!<br/>🌲</h3>
        </div>
    )
}

export default Home