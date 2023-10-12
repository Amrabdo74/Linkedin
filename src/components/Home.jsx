import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Leftside from "./Leftside";
import RightSide from "./RightSide";
import styles from './cssFile/RightSide.module.css';
import MainProject from "./MainProject";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function Home() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate()

//   useEffect(() => {
//     const handleBeforeUnload = (event) => {
//       event.preventDefault(); // Cancel the default behavior (show the confirmation dialog)
//       // You can add any additional logic here, such as saving data or navigating
//       // to the home page before the page is refreshed.
//       // Example navigation to the home page:
//       window.location.href = '/home';
//     };
  
//     // Attach the beforeunload event listener
//     window.addEventListener('beforeunload', handleBeforeUnload);
  
//     return () => {
//       // Remove the event listener when the component unmounts
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//     };
// }, []);
  return (
    <div className={styles.home}>
      <Header />
      <div className={styles.textHome} style={{width:'100%',textAlign:'center',color:'#000',padding:'80px 0 40px 0'}}>
          <p><Link>Hiring in a hurry? -  </Link>  
          Find talented pros in record time with Upwork and keep business
          moving.
        </p>
      </div>
      <div className={styles.linkedin} >
      <Leftside />
      <MainProject/>
      <RightSide/>
      </div>
    </div>
  );
}
export default Home;
