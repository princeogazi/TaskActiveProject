import TA from '../images/TaskActive.png';
import Footer from './Footer';
import Navbar from "./Navbar";

function Dashboard() {
    return(
        <>
        <Navbar />
        <div className='flex-container'>
            <div className='flexbox2'>
                <img src={TA} alt="image" />
            </div>
            <div className='flexbox1'>
                Welcome<br/>to<br/><b>TaskActive</b>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default Dashboard;