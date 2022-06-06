import React from 'react';
import { Video } from './Video';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import * as videoService from './VideoService';
import { toast } from "react-toastify";

import './VideoItem.css'

interface Props {
  video: Video;
  loadVideos: () => void;
}

const VideoItem = ({video, loadVideos}: Props) => {

  const navigate = useNavigate();

  const handleDeleteVideo = async (id:string) => {
    await videoService.deleteVideo(id);
    toast.info('Video Deleted!');
    loadVideos();
  }

  return (
    <div className="col-md-4 p-3">
      <div className="card card-body bg-secondary text-white video-card">
        <div className="d-flex justify-content-between">
          <h1 onClick={() => navigate(`/update/${video._id}`)} >{video.title}</h1>
          <span className="text-danger" onClick={() => video._id && handleDeleteVideo(video._id)} >X</span>
        </div>
        <p>{video.description}</p>
        <div>
          <ReactPlayer 
            width='100%' 
            height='100%' 
            url={video.url} 
            controls
          />
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
