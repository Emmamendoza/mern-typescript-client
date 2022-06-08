import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import { Video } from './Video';
import * as videoService from './VideoService';
import { toast } from "react-toastify";


type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const VideoForm = () => {

  const navigate = useNavigate();
  const { id } = useParams();


  const initialState = {
    title: "",
    description: "",
    url: ""
  }

  const [video, setVideo] = useState<Video>(initialState);

  const handleInputChange = (e: InputChange) => {
    setVideo({...video, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!id) {
      const response = await videoService.createVideo(video);
      toast.success('New Video added!');
      setVideo(initialState);
    } else {
      await videoService.updateVideo(id,video);
      toast.success('Video Updated!');
      setVideo(initialState);
    }

    navigate('/');
  }

  const getVideo = async (id: string) => {
    const res = await videoService.getVideo(id);
    const { title, description, url } = res.data;
    setVideo({title, description, url});
  }

  useEffect(() => {
    if(id) getVideo(id);
  }, [])

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <div className="card">
          <div className="card-body">
            <h3>New Video</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group p-2">
                <input
                  type="text"
                  name="title"
                  placeholder="Write a title for this video"
                  className="form-control"
                  onChange={handleInputChange}
                  value={video.title || ''}
                  autoFocus
                />
              </div>
              <div className="form-group p-2">
                <input
                  type="text"
                  name="url"
                  placeholder="https://something.com"
                  className="form-control"
                  onChange={handleInputChange}
                  value={video.url || ''}
                />
              </div>
              <div className="form-group p-2">
                <textarea
                  name="description"
                  rows={4}
                  placeholder="Write a description"
                  className="form-control"
                  onChange={handleInputChange}
                  value={video.description || ''}
                ></textarea>
              </div>
              <div className="col text-center p-2">
                {
                  id ? <button className="btn btn-info">Update Video</button> : <button className="btn btn-primary">Create Video</button>
                }
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoForm;
