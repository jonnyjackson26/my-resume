import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {google_api_key, sheet_id} from '../../../api_keys';
import './Projects.css';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            const sheetId = sheet_id;
            const apiKey = google_api_key;
            const range = "Sheet1";

            const response = await axios.get(
                `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
            );

            const rows = response.data.values;
            const headers = rows[0];
            const data = rows.slice(1).map((row) => {
                let project = {};
                headers.forEach((header, index) => {
                    project[header] = row[index];
                });
                return project;
            });

            setProjects(data);
            setLoading(false);
        };

        fetchProjects();
    }, []);

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

    const [loadedVideos, setLoadedVideos] = useState({});

    const loadVideo = (index) => {
        setLoadedVideos((prev) => ({ ...prev, [index]: true }));
    };

    return (
        <div className="projects-container">
            <h1>My Projects</h1>
            {loading ? (
                <p>Loading projects...</p>
            ) : (
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div key={index} className="project-card">
                            {project.content ? (
                                <img src={project.content} alt={project.name} className="project-image" />
                            ) : project.youtube_link ? (
                                loadedVideos[index] ? (
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
                                    <div className="youtube-placeholder" onClick={() => loadVideo(index)}>
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
                    ))}
                </div>
            )}
        </div>
    );
};

export default Projects;