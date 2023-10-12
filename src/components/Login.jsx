import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
import styles from './cssFile/Login.module.css';
 import { useNavigate } from "react-router-dom";
// import { userData } from "../store/userSlice";
import { Link } from "react-router-dom";
import { signInAndFetchUserData } from "../store/Slices/userSlice";
import { useEffect } from "react";
import logo from "../images/login-logo.svg";
import googleImg from "../images/google.svg"
import loginImge from "../images/login-hero.svg"

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user)
  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user]);

  return (<>
  <div className={styles.container}>

    <div className={styles.nav}>
      <Link  to="/">
        <img src={logo} alt="" />
      </Link>
      <div className={styles.Join}>
        <button className={styles.SignIn}>Join now</button>
        <button className={styles.SignIn}>Sign in</button>
      </div>
    </div>
    <div className={styles.section}>
      <div className={styles.Hero}>
        <h1>Welcome to your professional community</h1>
        <img src={loginImge} alt="" />
      </div>
      <div className={styles.Form}>
        <button className={styles.Google} onClick={() =>{
          // dispatch(userData())
         dispatch(signInAndFetchUserData())
          }}>
          <img src={googleImg} alt="" />
          Sign in with Google
        </button>
      </div>
    </div>
  </div>
  </>);
}


export default Login;