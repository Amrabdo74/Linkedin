import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./cssFile/Header.module.css";
import { getuserData, logOut } from "../store/Slices/userSlice";
import { useEffect } from "react";
// import { auth } from "../firebase";
// import {  signOut } from "firebase/auth";

// import {logOut}  from "../store/userSlice";
import img1 from "../images/home-logo.svg"
import img2 from "../images/search-icon.svg"
import img3 from "../images/nav-home.svg"
import img4 from "../images/nav-network.svg"
import img5 from "../images/nav-jobs.svg"

import img6 from "../images/nav-messaging.svg"
import img7 from "../images/nav-notifications.svg" 
import img8 from '../images/user.svg'
import img9 from "../images/down-icon.svg"
import img10 from "../images/nav-work.svg"
import img11 from "../images/down-icon.svg"
const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  // dispatch(getuserData())
  useEffect(() => {
    if (!user) {
      navigate('/',{replace:true});
    }
  }, [user, navigate]);
  return (
    <div className={styles.Container}>
      <div className={styles.Content}>
        <span className={styles.Logo}>
          <a href="/home" className={styles}>
            <img src={img1} alt="" />
          </a>
        </span>
        <div className={styles.Search}>
          <div className={styles.searchDiv}>
            <input type="text" placeholder="Search" />
            <div className={styles.SearchIcon}>
              <img src={img2} alt="" />
            </div>
          </div>
        </div>
        <div className={styles.nav}>
          <ul className={styles.NavListWrap}>
            <li className={styles.active}>
              <Link>
                <img src={img3} alt="" />
                <span>Home</span>
              </Link>
            </li>
            <li className={styles.Network}>
              <Link >
                <img src={img4} alt="" />

                <span>My Network</span>
              </Link>
            </li>
            <li>
              <Link>
                <img src={img5} alt="" />

                <span>Jobs</span>
              </Link>
            </li>
            <li>
              <Link>
                <img src={img6} alt="" />

                <span>Messaging</span>
              </Link>
            </li>
            <li>
              <Link>
                <img src={img7} alt="" />
                <span>Notifications</span>
              </Link>
            </li>
            <li className={styles.User}>
              <Link className={styles.logOutLink}>
               
                  {user  ?<img  src={user.photoURL} alt="...." />:<img src={img8} alt="...." />}

                  <span>
                    Me
                    <img className={styles.rotate} src={img9} alt="" />
                  
                </span>
              </Link>
              <span className={styles.SignOut}>
                <Link onClick={()=>{dispatch(logOut())
                // navigate('/')
                }}>Sign Out</Link>
              </span>
            </li>
            <li className={styles.Work}>
              <Link>
                <img src={img10} alt="" />
                <span>
                  Work
                  <img src={img11} alt="" />
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
