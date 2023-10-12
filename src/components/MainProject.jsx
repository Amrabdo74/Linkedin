import { useDispatch, useSelector } from "react-redux";
import styles from "./cssFile/main.module.css";
import PostModal from "./PostModal";
import photo from "../images/photo-icon.svg"
import video from "../images/video-icon.svg"
import event from "../images/event-icon.svg"
import write from "../images/article-icon.svg"
import userImgae from "../images/user.svg"
import ellipsis from "../images/ellipsis.svg"
import like from "../images/like-icon.svg"
import comment from "../images/comment-icon.svg"
import share from "../images/share-icon.svg"
import send from "../images/send-icon.svg"
import isloadingImage from "../images/loader.svg"
import { useState } from "react";
import ReactPlayer from "react-player";


function MainProject() {
  const user = useSelector((state) => state.user);
  const articles = useSelector((state) => state.articles.articles);
  const isloading = useSelector((state) => state.articles.isLoading);
  const [showModal,setShowModal] = useState(false);
  const handelModel = ()=> {
    setShowModal(!showModal);
  }

  return (
    <div className={styles.Container}>
        <div className={`${styles.ShareBox} ` }>
          <div>
            {user && user.photoURL ? (
              <img src={user.photoURL} alt="" />
            ) : (
              <img src={userImgae} alt="" />
            )}
            <button
         onClick={handelModel}
          disabled={isloading ? true : false}
            >
              Start a post
            </button>
          </div>
          <div>
            <button>
              <img src={photo} alt="" />
              <span>Photo</span>
            </button>
            <button>
              <img src={video} alt="" />
              <span>Video</span>
            </button>
            <button>
              <img src={event} alt="" />
              <span>Event</span>
            </button>
            <button className={styles.Write}>
              <img src={write} alt="" />
              <span>Write article</span>
            </button>
          </div>
        </div>

        {articles.length === 0 ? (
          <p>There are no articles</p>
        ) : (
          <div className={styles.Content}>
            {isloading && <img src={isloadingImage} alt="" />}
            {articles.length > 0 &&
              articles.map((article, index) => (
                <div
                  className={`${styles.Article} ${styles.CommonCard}`}
                  key={index}
                >
                  <div className={styles.SharedActor}>
                    <a>
                      <img src={article.actor.image} />
                      <div>
                        <span style={{display:'block',fontSize:'14px',textAlign:'left',margin:'0px 0px 1px 5px'}}>{article.actor.title}</span>
                        <span style={{display:'block',fontSize:'12px',textAlign:'left',margin:'0px 0px 3px 5px',color:'rgba(0, 0, 0, 0.6)'}}>{article.actor.description}</span>
                        <span style={{display:'block',fontSize:'12px',textAlign:'left',margin:'0px 0px 3px 5px',color:'rgba(0, 0, 0, 0.6)'}}>
                          {article.actor.date.slice(0,10)}
                        </span>
                      </div>
                    </a>
                    <button>
                      <img
                      style={{width:'20px'}}
                      src={ellipsis} alt="" />
                    </button>
                  </div>
                  <div className={styles.Description}>
                    {article.description}
                  </div>
                  <div className={styles.SharedImg}>
                    <a>
                      {!article.shareImg && article.video ? (
                        <ReactPlayer width="100%" url={article.video} />
                      ) : (
                        article.shareImg && <img src={article.shareImg} />
                      )}
                    </a>
                  </div>
                  <ul className={styles.SocialCounts}>
                    <li>
                      <button>
                        <img
                        style={{width:'20px'}}
                          src="https://static-exp1.licdn.com/sc/h/2uxqgankkcxm505qn812vqyss"
                          alt=""
                        />
                        <img
                           style={{width:'20px'}}
                          src="https://static-exp1.licdn.com/sc/h/f58e354mjsjpdd67eq51cuh49"
                          alt=""
                        />
                        <span>75</span>
                      </button>
                    </li>
                    <li>
                      <a>{article.comments} comments</a>
                    </li>
                    <li>
                      <a>1 share</a>
                    </li>
                  </ul>
                  <div className={styles.SocialActions}>
                    <button>
                      <img src={like} alt="" style={{width:'20px'}}/>
                      <span>Like</span>
                    </button>
                    <button>
                      <img src={comment} alt="" style={{width:'20px'}} />
                      <span>Comment</span>
                    </button>
                    <button>
                      <img src={share} alt="" style={{width:'20px'}}/>
                      <span>Share</span>
                    </button>
                    <button>
                      <img src={send} alt="" style={{width:'20px'}}/>
                      <span>Send</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
        <PostModal
         showModal={showModal} handelModel={handelModel}
          />
    </div>
  );
}
export default MainProject;
