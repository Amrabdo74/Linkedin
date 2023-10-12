import { Link } from 'react-router-dom';
import styles from './cssFile/leftSide.module.css';
import plusImage from "../images/plus-icon.svg"
import item from "../images/item-icon.svg"
import widget from "../images/widget-icon.svg"
import { useSelector } from 'react-redux';
function Leftside (){
    const user = useSelector(state=>state.user)
    return(
        <>
         <div className={styles.container}>
      <div className={styles.ArtCard}>
        <div className={styles.UserInfo}>
          <div className={styles.CardBackground}></div>
          <Link>
          <div className={styles.Photo}></div>
            <div className={styles.Link}>
              Welcome, 
              {user ? user.displayName : "there!"}
            </div>
          </Link>
          <Link>
            <div className={styles.AddPhotoText}>Add a photo</div>
          </Link>
        </div>
        <div className={styles.Widget}>
          <a>
            <div>
              <span>Connections</span>
              <span>Grow your network</span>
            </div>
            <img src={widget} alt="" />
          </a>
        </div>
        <Link className={styles.Item}>
          <span>
            <img src={item} alt="" />
            My Items
          </span>
        </Link>
      </div>
      <div className={`${styles.CommunityCard} ${styles.ArtCard}`}>
        <a>
          <span>Groups</span>
        </a>
        <a>
          <span>
            Events
            <img src={plusImage} alt="" />
          </span>
        </a>
        <a>
          <span>Follows Hashtags</span>
        </a>
        <a>
          <span>Discover more</span>
        </a>
      </div>
    </div>
        </>
    )
}
export default Leftside