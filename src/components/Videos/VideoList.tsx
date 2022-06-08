import React, { useEffect, useState } from 'react';
import { Video } from './Video';
import VideoItem from './VideoItem';
import * as videoService from './VideoService'

const VideoList = () => {

  const [videos, setVideos] = useState<Video[]>([]);

  const loadVideos = async () => {
    const res = await videoService.getVideos();
    const formatedVideos = res.data
      .map((video) => {
        return {
          ...video,
          createdAt: video.createdAt ? new Date(video.createdAt) : new Date(),
          updatedAt: video.updatedAt ? new Date(video.updatedAt) : new Date(),
        };
      })
      .sort((video1, video2) => video2.createdAt.getTime() - video1.createdAt.getTime());

      setVideos(formatedVideos);
  }

  useEffect(() => {
    loadVideos();
  },[]);

  return (
    <div className="row">
        {videos.map((video,index) => {
          return(
            <VideoItem key={index} video={video} loadVideos={loadVideos} />
            )
          })
        }
    </div>
  );
};

export default VideoList;