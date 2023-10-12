import { Link } from 'react-router-dom';
import styles from './cssFile/RightSide.module.css';
import banner from "../images/banner-image.jpg"
import feed from "../images/feed-icon.svg"
import right from "../images/right-icon.svg"
function RightSide (){
    return(
        <>
         <div className={styles.Container}>
      <div className={styles.FolllowCard}>
        <div className={styles.Title}>
          <h2>Add to your feed</h2>
          <img src={feed} alt="" />
        </div>
        <ul className={styles.FeedList}>
          <li>
            <a>
              <div className={styles.Avatar}></div>
            </a>
            <div>
              <span>#Linkedin</span>
              <button>Follow</button>
            </div>
          </li>
          <li>
            <a>
            <div className={styles.Avatar}></div>
            </a>
            <div>
              <span>#Video</span>
              <button>Follow</button>
            </div>
          </li>
        </ul>
        <Link className={styles.Recommendation}>
          View all recommendations
          <img src={right} alt="" />
        </Link>
      </div>
      <div className={`${styles.BannerCard} ${styles.FolllowCard}`}>
        <img src={banner} alt="" />
      </div>
    </div>
        </>
    )
}
export default RightSide;