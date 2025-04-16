import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import './Projects.css';
import ProjectCard from '../../components/ProjectCard';

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

    return (
        <div className="projects-container">
            <h1>My Projects</h1>
            {loading ? (
                <p>Loading projects...</p>
            ) : (
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
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