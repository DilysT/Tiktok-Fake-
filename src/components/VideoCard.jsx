import React, { useRef, useEffect, useState } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import './VideoCard.css';

const VideoCard = (props) => {
    const { url, username, description, song, likes, shares, comments, saves, profilePic, setVideoRef, autoplay } = props;
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Tự động phát video khi `autoplay` được kích hoạt
    useEffect(() => {
        if (autoplay && videoRef.current) {
            videoRef.current
                .play()
                .then(() => {
                    setIsPlaying(true);
                })
                .catch((error) => {
                    console.error("Video playback failed:", error);
                });
        }
    }, [autoplay]);

    // Hàm xử lý khi click vào video
    const onVideoPress = () => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current
                .play()
                .then(() => {
                    setIsPlaying(true);
                })
                .catch((error) => {
                    console.error("Video playback failed:", error);
                });
        }
    };

    return (
        <div className="video">
            {/* Phần tử video */}
            <video
                className="player"
                onClick={onVideoPress}
                ref={(ref) => {
                    videoRef.current = ref;
                    setVideoRef(ref);
                }}
                loop
                src={url}
            ></video>

            <div className="bottom-controls">
                {/* Phần trái của container */}
                <div className="footer-left">
                    <FooterLeft username={username} description={description} song={song} />
                </div>

                {/* Phần phải của container */}
                <div className="footer-right">
                    <FooterRight likes={likes} comments={comments} saves={saves} shares={shares} profilePic={profilePic} />
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
