import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = ({ url, type }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const player = videojs(videoRef.current, {
            controls: true,
            autoplay: false,
            preload: 'auto',
        });

        return () => {
            if (player) {
                player.dispose();
            }
        };
    }, [url]);

    return (
        <div data-vjs-player>
            <video ref={videoRef} className="video-js vjs-big-play-centered" style={{ width: '100%' }}>
                <source src={url} type={type} />
                <p className="vjs-no-js">
                    To view this video please enable JavaScript, and consider upgrading to a web browser that
                    <a href="http://videojs.com/html5-video-support/" target="_blank" rel="noopener noreferrer">supports HTML5 video</a>
                </p>
            </video>
        </div>
    );
};

export default VideoPlayer;
