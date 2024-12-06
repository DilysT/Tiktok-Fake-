// VideoCard.jsx
import React, { useRef, useEffect, useState } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import './VideoCard.css';

const VideoCard = (props) => {
  const { url, username, description, song, likes, shares, comments, saves, profilePic, setVideoRef, autoplay } = props;
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (autoplay && videoRef.current) {
      videoRef.current.play().catch((error) => console.error("Video playback failed:", error));
      setIsPlaying(true);
    }
  }, [autoplay]);

  const onVideoPress = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch((error) => console.error("Video playback failed:", error));
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="video">
      <video
        className="player"
        onClick={() => {
          onVideoPress();
          props.onVideoClick(); // Gọi hàm cập nhật video index
        }}
        ref={(ref) => {
          videoRef.current = ref;
          setVideoRef(ref);
        }}
        loop
        src={url}
      ></video>
      <div className="bottom-controls">
        <div className="footer-left">
          <FooterLeft username={username} description={description} song={song} />
        </div>
        <div className="footer-right">
          <FooterRight
            likes={likes}
            comments={comments}
            saves={saves}
            shares={shares}
            profilePic={'https://i.pravatar.cc/150?img=3'}
            videoUrl={url} // Pass the video URL to FooterRight
            videoRef={videoRef}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
