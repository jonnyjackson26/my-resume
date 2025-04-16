import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import './Projects.css';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Query all projects from Supabase
                const { data, error } = await supabase
                    .from('projects')
                    .select('*');

                if (error) {
                    console.error('Error fetching projects:', error);
                    setLoading(false);
                    return;
                }

                // Filter projects to only include those with "show" set to "yes" (case-insensitive)
                const filteredProjects = data.filter(
                    project => project.show && project.show.toLowerCase() === "yes"
                );

                setProjects(filteredProjects);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
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

        {/* Floating Action Button to Scroll Back Home */}
        <a className="back-button" href="/">
        ⬅
        </a>
        </div>
    );
};

export default Projects;