/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import closeImage from "../images/close-icon.svg";
import UserImage from "../images/user.svg";
import imgVido from "../images/share-video.svg";
import imgphoto from "../images/share-image.svg";
import AnyoneImg from "../images/share-comment.svg";
import { useState } from "react";
import ReactPlayer from "react-player";
import styles from "./cssFile/main.module.css";
import { Timestamp } from "firebase/firestore";
import {
  getArticles,
  isLoadingDis,
  isLoadingfalse,
  postArticles,
} from "../store/Slices/articleSlice";
// import { makeIsloadind } from "../store/Slices/isloadinSlice";
function PostModal({ showModal, handelModel }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [post, setPost] = useState("");
  const [postCatogery, setpostCatogery] = useState("");
  const [imageSrc, setimageSrc] = useState("");
  const [vedioUrl, setvedioUrl] = useState("");

  const handleChange = (e) => {
    const image = e.target.files[0];

    if (image === "" || image === undefined) {
      alert(`not an image , the file is a ${typeof image}`);
      return;
    } else {
      setimageSrc(image);
    }
  };

  const handlePostArticles = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    const firestoreTimestamp = Timestamp.now();

    // Convert the Firestore Timestamp to a serializable format
    const timestampISO = firestoreTimestamp.toDate().toISOString();

    // Dispatch the action with the image object
    dispatch(
      postArticles({
        image: imageSrc, // Pass the image object
        video: vedioUrl,
        user: user,
        description: post,
        timestamp: timestampISO,
        name: imageSrc.name,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      })
    );
    dispatch(isLoadingDis());
    setTimeout(() => {
      dispatch(getArticles());
      dispatch(isLoadingfalse());
    }, 5000);

    reset(e);
  };
  const reset = () => {
    setPost("");
    setpostCatogery("");
    setimageSrc("");
    setvedioUrl("");
    handelModel();
  };

  return (
    <>
      {showModal && (
        <>
          <div className={styles.container}>
            <div className={styles.content}>
              <div className={styles.header}>
                <h2>Create a Post </h2>
                <button className="close " onClick={() => reset()}>
                  <img src={closeImage} alt="close" />
                </button>
              </div>
              <div className={styles.ShareContent}>
                <div className={styles.username}>
                  {user ? (
                    <img src={user.photoURL} alt="user" />
                  ) : (
                    <img src={UserImage} alt="user" />
                  )}
                  <span>{user.displayName}</span>
                </div>
                <div className={styles.text}>
                  <textarea
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                    placeholder="What do you wont to talk about "
                    autoFocus={true}
                  />
                </div>
                {postCatogery === "image" && (
                  <div className={styles.upload}>
                    {" "}
                    <input
                      type="file"
                      name="imgae"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    <p style={{ marginBottom: "10px" }}>
                      <label htmlFor="file">Slect an image to share</label>
                    </p>
                    {imageSrc && (
                      <img src={URL.createObjectURL(imageSrc)} alt="image" />
                    )}
                  </div>
                )}
                {postCatogery === "video" && (
                  <div className="upload">
                    <input
                      value={vedioUrl}
                      type="text"
                      name="imgae"
                      id="file"
                      style={{
                        width: "70%",
                        height: "30px",
                        marginLeft: "50px",
                        marginBottom: "50px",
                      }}
                      placeholder="please Enter Video Link Here "
                      onChange={(e) => setvedioUrl(e.target.value)}
                    />
                    {vedioUrl && <ReactPlayer width="100%" url={vedioUrl} />}
                  </div>
                )}
              </div>
              <div className={styles.ShareCreation}>
                <div className={styles.AttachAssets}>
                  <button
                    className={styles.AssetButton}
                    onClick={() => setpostCatogery("image")}
                  >
                    <img src={imgphoto} alt="" />
                  </button>
                  <button
                    className={styles.AssetButton}
                    onClick={() => setpostCatogery("video")}
                  >
                    <img src={imgVido} alt="" />
                  </button>
                </div>
                <div className={styles.ShareComment}>
                  <button className={styles.AssetButton}>
                    <img src={AnyoneImg} alt="" />
                    Anyone
                  </button>
                </div>
                <button
                  className={styles.PostButton}
                  onClick={(e) => {
                    handlePostArticles(e);
                  }}
                  disabled={!post ? true : false}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default PostModal;
