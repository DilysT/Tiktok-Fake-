import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import VideoCard from './components/VideoCard';
import BottomNavbar from './components/BottomNavbar';
import TopNavbar from './components/TopNavbar';
import FooterRight from './components/FooterRight';
const baseUrl = window.location.origin; // Tự động nhận môi trường hiện tại
const videoUrls = [
  {
    url: `${baseUrl}/videos/video1.mp4`,//thêm baseUrl vào đường dẫn video
    profilePic: 'https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/9d429ac49d6d18de6ebd2a3fb1f39269~c5_100x100.jpeg?x-expires=1688479200&x-signature=pjH5pwSS8Sg1dJqbB1GdCLXH6ew%3D',
    username: 'csjackie',
    description: 'Lol nvm #compsci #chatgpt #ai #openai #techtok',
    song: 'Original sound - Famed Flames',
    likes: 430,
    comments: 13,
    saves: 23,
    shares: 1,
  },
  {
    url: `${baseUrl}/videos/video2.mp4`,//thêm baseUrl vào đường dẫn video
    profilePic: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/eace3ee69abac57c39178451800db9d5~c5_100x100.jpeg?x-expires=1688479200&x-signature=wAkVmwL7lej15%2B16ypSWQOqTP8s%3D',
    username: 'dailydotdev',
    description: 'Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes',
    song: 'tarawarolin wants you to know this isnt my sound - Chaplain J Rob',
    likes: '13.4K',
    comments: 3121,
    saves: 254,
    shares: 420,
  },
  {
    url: `${baseUrl}/videos/video3.mp4`,
    profilePic: 'https://p77-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4e6698b235eadcd5d989a665704daf68~c5_100x100.jpeg?x-expires=1688479200&x-signature=wkwHDKfNuIDqIVHNm29%2FRf40R3w%3D',
    username: 'wojciechtrefon',
    description: '#programming #softwareengineer #vscode #programmerhumor #programmingmemes',
    song: 'help so many people are using my sound - Ezra',
    likes: 5438,
    comments: 238,
    saves: 12,
    shares: 117,
  },
  {
    url: `${baseUrl}/videos/video4.mp4`,
    profilePic: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4bda52cf3ad31c728153859262c329db~c5_100x100.jpeg?x-expires=1688486400&x-signature=ssUbbCpZFJj6uj33D%2BgtcqxMvgQ%3D',
    username: 'faruktutkus',
    description: 'Wait for the end | Im RTX 4090 TI | #softwareengineer #softwareengineer #coding #codinglife #codingmemes ',
    song: 'orijinal ses - Computer Science',
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
  },
];

function App() {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0); // Track current video index
  const [isUserInteracted, setIsUserInteracted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');  // State for search query
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State for controlling popup visibility
  const videoRefs = useRef([]);

  useEffect(() => {
    setVideos(videoUrls);
  }, []);


  // Handle the keydown event to toggle the popup visibility
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        setIsPopupVisible((prev) => {
          if (!prev) {
            // Chỉ hiển thị popup khi video đang hiển thị
            return videoRefs.current[currentVideoIndex]?.paused === false;
          }
          return false;
        });
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentVideoIndex]);
  

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8,
    };

    

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        const videoElement = entry.target;
        if (entry.isIntersecting) {
          videoElement.play().catch((error) => console.error("Video playback failed:", error));
          setCurrentVideoIndex(videos.findIndex((v) => v.url === videoElement.src));
        } else {
          videoElement.pause();
        }
      });
    };
    

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    videoRefs.current.forEach((videoRef) => {
      observer.observe(videoRef);
    });

    return () => {
      observer.disconnect();
    };
  }, [videos, isUserInteracted]);

  const handleVideoRef = (index) => (ref) => {
    videoRefs.current[index] = ref;
  };
// Display user information in the popup

const currentVideo = videos[currentVideoIndex];
  const handleUserInteraction = () => {
    setIsUserInteracted(true);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
  };

  // Filter videos based on the search query
  const filteredVideos = videos.filter((video) =>
    video.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app" onClick={handleUserInteraction}>
      <div className="container">
        <TopNavbar onSearch={handleSearch} className="top-navbar" />
        <input
          type="text"
          placeholder="Search videos..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />
        {filteredVideos.map((video, index) => (
       <VideoCard
       key={index}
       username={video.username}
       description={video.description}
       song={video.song}
       likes={video.likes}
       saves={video.saves}
       comments={video.comments}
       shares={video.shares}
       url={video.url}
       profilePic={video.profilePic}
       setVideoRef={handleVideoRef(index)}
       autoplay={index === currentVideoIndex}
       onVideoClick={() => setCurrentVideoIndex(index)} // Truyền onClick
     />
     
          

        ))}
        
        <BottomNavbar className="bottom-navbar" />
        {isPopupVisible && (
        <div className="user-popup">
          <div className="popup-content">
            <h3>User Information</h3>
            <p>Username: {currentVideo.username}</p>
            <p>Description: {currentVideo.description}</p>
            <p>Song: {currentVideo.song}</p>
            <p>Likes: {currentVideo.likes}</p>
            <p>Comments: {currentVideo.comments}</p>
            <p>Saves: {currentVideo.saves}</p>
            <p>Shares: {currentVideo.shares}</p>
            <button onClick={() => setIsPopupVisible(true)}>Close</button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default App;
