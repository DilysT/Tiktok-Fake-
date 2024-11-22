import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleCheck, faHeart, faCommentDots, faBookmark, faShare, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faThreads } from '@fortawesome/free-brands-svg-icons';
import './FooterRight.css';

function FooterRight({ likes, comments, saves, shares, profilePic }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isSharePopupVisible, setIsSharePopupVisible] = useState(false);
  const [userAddIcon, setUserAddIcon] = useState(faCirclePlus);

  const handleUserAddClick = () => {
    setUserAddIcon(faCircleCheck);
    setTimeout(() => {
      setUserAddIcon(faCirclePlus);
    }, 3000);
  };

  const parseLikesCount = (count) => {
    if (typeof count === 'string') {
      if (count.endsWith('k')) {
        return parseFloat(count) * 1000;
      }
      return parseInt(count);
    }
    return count;
  };

  const formatLikesCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    }
    return count;
  };

  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  const handleShareClick = () => {
    setIsSharePopupVisible(true);
  };

  const closeSharePopup = () => {
    setIsSharePopupVisible(false);
  };

  return (
    <div className="footer-right">
      <div className="sidebar-icons">
        {profilePic && (
          <img src={profilePic} className="userprofile" alt="Profile" style={{ width: '45px', height: '45px', color: '#616161' }} />
        )}
        <FontAwesomeIcon icon={userAddIcon} className="useradd" style={{ width: '35px', height: '35px', color: '#FF0000' }} onClick={handleUserAddClick} />
      </div>

      <div className="sidebar-icon">
        <FontAwesomeIcon icon={faHeart} style={{ width: '35px', height: '35px', color: liked ? '#FF0000' : 'white' }} onClick={handleLikeClick} />
        <p>{formatLikesCount(parseLikesCount(likes)) + (liked ? 1 : 0)}</p>
      </div>

      <div className="sidebar-icon">
        <FontAwesomeIcon icon={faCommentDots} style={{ width: '35px', height: '35px', color: 'white' }} />
        <p>{comments}</p>
      </div>

      <div className="sidebar-icon">
        {saved ? (
          <FontAwesomeIcon icon={faBookmark} style={{ width: '35px', height: '35px', color: '#ffc107' }} onClick={() => setSaved(false)} />
        ) : (
          <FontAwesomeIcon icon={faBookmark} style={{ width: '35px', height: '35px', color: 'white' }} onClick={() => setSaved(true)} />
        )}
        <p>{saved ? saves + 1 : saves}</p>
      </div>

      <div className="sidebar-icon">
        <FontAwesomeIcon icon={faShare} style={{ width: '35px', height: '35px', color: 'white' }} onClick={handleShareClick} />
        <p>{shares}</p>
      </div>

      {/* Share Popup */}
      {isSharePopupVisible && (
        <div className="share-popup">
          <div className="share-popup-header">
            <FontAwesomeIcon icon={faTimes} className="close-popup" onClick={closeSharePopup} />
          </div>
          <div className="share-options">
            <button className="share-option">
              <FontAwesomeIcon icon={faFacebook} className="share-icon" />
              Facebook
            </button>
            <button className="share-option">
              <FontAwesomeIcon icon={faInstagram} className="share-icon" />
              Instagram
            </button>
            <button className="share-option">
              <FontAwesomeIcon icon={faThreads} className="share-icon" />
              Thread
            </button>
          </div>
        </div>
      )}

      <div className="sidebar-icon record">
        <img src="https://static.thenounproject.com/png/934821-200.png" alt="Record Icon" />
      </div>
    </div>
  );
}

export default FooterRight;
