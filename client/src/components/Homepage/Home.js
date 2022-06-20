import HomeCarouselComponent from "./Carousel";
import CategroyComp from "./CategoryComp";
const Home = (props) => {


    return (
        <div >
            <HomeCarouselComponent />
            <CategroyComp onQuantityChangeHandler={props.onQuantityChangeHandler} addItemtoCart={props.addItemtoCart}/>
        </div>
    )
}

export default Home;