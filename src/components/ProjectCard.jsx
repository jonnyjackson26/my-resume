import React, { useState } from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
    const [videoLoaded, setVideoLoaded] = useState(false);

    const getYouTubeThumbnailUrl = (youtubeLink) => {
        const url = new URL(youtubeLink);
        const videoId = url.searchParams.get("v");
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;  // High-quality thumbnail
    };

    const getYouTubeEmbedUrl = (youtubeLink) => {
        const url = new URL(youtubeLink);
        const videoId = url.searchParams.get("v");
        return `https://www.youtube.com/embed/${videoId}`;
    };

    const loadVideo = () => {
        setVideoLoaded(true);
    };

    return (
        <div className="project-card">
            {project.content ? (
                <img src={project.content} alt={project.name} className="project-image" />
            ) : project.youtube_link ? (
                videoLoaded ? (
                    <iframe
                        className="project-video"
                        width="100%"
                        height="300px"
                        src={getYouTubeEmbedUrl(project.youtube_link)}
                        title={project.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                ) : (
                    <div className="youtube-placeholder" onClick={loadVideo}>
                        <img
                            src={getYouTubeThumbnailUrl(project.youtube_link)}
                            alt={project.name}
                            className="youtube-thumbnail"
                        />
                        <div className="play-button-overlay">
                            <div className="play-button"></div>
                        </div>
                    </div>
                )
            ) : (
                <p>No content available</p>
            )}
            <div className="project-info">
                <h3>{project.name}</h3>
                <p className="project-date">{project.date}</p>
                <p>{project.description}</p>
                <div className="project-links">
                    {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer">Live Site</a>}
                    {project.github_link && <a href={project.github_link} target="_blank" rel="noopener noreferrer">GitHub</a>}
                    {project.youtube_link && <a href={project.youtube_link} target="_blank" rel="noopener noreferrer">YouTube</a>}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard; 