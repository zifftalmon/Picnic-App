import Map from "./Map"

const Home = () => {
    return (
        <div className="intro">
             <h4>Welcome! Our guess is you're going on a picnic...</h4>
                <h2>Great!</h2>
                <h4>Let's find a cool place suited for your needs, if you need some help take a look at our reccomandations page.<br/>
                Happy picnicing!<br/>🌲</h4>
                <Map/>
        </div>
    )
}

export default Home