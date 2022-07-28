import Nav from "../components/Nav";

const Home = () => {


    const authToken = false;

    const handleClick = () => {

    }

    return (

        <>
       <Nav minimal={false} authToken={authToken} />
        <div className="home">
            <h1>Swipe Right</h1>
            <button className="primary-button" onClick={handleClick}>
                {authToken ? 'Signout' : 'Create account'} 
            </button>
        </div>
        </>
    )
}

export default Home;