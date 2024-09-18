import React from 'react';
import './Projects.css';

const Projects = () => {
    const projects = [
        {
            name: "Restoration Tour Group",
            link: "http://restorationtourgroup.com",
            github_link: "",
            youtube_link: "",
            content: "resto-tours-group.png",
            description: "Created a website using React for a religious tour group company",
            date: "June 2024",
        },
        {
            name: "Book of Mormon Languages",
            link: "http://bom-languages.web.app/",
            github_link: "",
            youtube_link: "",
            content: "bom-languages.png",
            description: "Developed a website for seamlessly transitioning between many languages while reading the Book of Mormon.",
            date: "May 2024",
        },
        {
            name: "Using NAND gates to build custom logic gates in Logism",
            github_link: "https://github.com/jonnyjackson26/cs2810-assn1",
            youtube_link: "https://www.youtube.com/watch?v=d_SPhLhdMPU&t=3s",
            content: "cs2810assn1.png",
            description: "Custom AND, XOR, OR, NOT, Mux, DMux using only NAND Gates. Also custom 8 way and 16 way OR, 16 bit and, mux, not gates.",
            date: "September 2024",
        },
        {
            name: "Custom Half and Full Adders in Logism",
            github_link: "https://github.com/jonnyjackson26/cs2810-assn2",
            youtube_link: "",
            content: "cs2810assn2.png",
            description: "Custom half adder and full adder. 16 bit incrementor. 8 and 4 way multiplexers and demultiplexers.",
            date: "September 2024",
        },
        {
            name: "ChatGPT translations of the Book of Mormon",
            github_link: "https://github.com/jonnyjackson26/chatgpt_simplified_translation_bom",
            youtube_link: "",
            content: "chatGptTranslationsOfBom.png",
            description: "Open AI API used to make a southern, western, and simplified translation of the Book of Mormon",
            date: "June 2024",
        },
        {
            name: "Typing tutor in React",
            github_link: "https://github.com/jonnyjackson26/spring2024USU-cs2610-reactTypingTutor",
            youtube_link: "https://www.youtube.com/watch?v=A7DTQ8dOGsA",
            link: "",
            content: "typingTutor.png",
            description: "Typing tutor with React",
            date: "April 2024",
        },
        {
            name: "Web Server from scratch in Python",
            github_link: "https://github.com/jonnyjackson26/spring2024USU-cs2610-webServerFromScratch",
            youtube_link: "https://www.youtube.com/watch?v=2LZ9Ox9JErY",
            description: "Created a simple web server from scratch in Python",
            date: "April 2024",
        },
    ];

    return (
        <div className="projects-container">
            <h1>My Projects</h1>
            <div className="projects-grid">
                {projects.map((project, index) => (
                    <div key={index} className="project-card">
                        <img src={project.content} alt={project.name} className="project-image" />
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
        </div>
    );
};

export default Projects;
