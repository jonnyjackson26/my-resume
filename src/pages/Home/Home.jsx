import React from 'react';
import './Home.css';

const Home = () => {
    const experience = [
        {
            company: "Aptive Pest Control",
            role: "Door to Door Sales Representative",
            duration: "May 2021 - Aug 2021",
            description: "Optimized daily pest control routes for field technicians.",
            reference: "Lucas Farnsworth (801) 245-0414"
        },
        {
            company: "Jurrus Plaster and Stucco",
            role: "Construction Worker",
            duration: "Summers 2018-2020",
            description: "Repaired and installed plaster and stucco, installed drywall.",
            reference: "Carl Jurrus (440) 221-1513"
        },
        {
            company: "Spire Institute and Academy",
            role: "Maintenance Worker",
            duration: "Nov 2023 - Dec 2023",
            description: "Prepared for large sporting events and provided basic maintenance.",
            reference: "Shaun Bell (440) 415-6851"
        }
    ];

    const projects = [
        {
            name: "Restoration Tour Group",
            link: "http://restorationtourgroup.com",
            description: "Created a website using React for restoration tour groups."
        },
        {
            name: "BOM Languages",
            link: "http://bom-languages.web.app/",
            description: "Developed a website for seamlessly transitioning between languages while reading the Book of Mormon."
        }
    ];

    return (
        <div className="container">
            <nav className="sidebar">
                <ul>
                    <li><a href="#about">About Me</a></li>
                    <li><a href="#experience">Experience</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#education">Education</a></li>
                </ul>
            </nav>

            <div className="content">
                <section id="about">
                    <h1>Jonny Jackson</h1>
                    <img src="your-headshot.jpg" alt="Jonny Jackson" className="headshot" />
                    <p>I'm a 20-year-old computer science major at Utah State University. I love programming, long-distance running, and cycling. Fluent in Spanish and a proud Eagle Scout.</p>
                </section>

                <section id="experience">
                    <h2>Work Experience</h2>
                    {experience.map((job, index) => (
                        <div key={index} className="job-card">
                            <h3>{job.role} - {job.company}</h3>
                            <p>{job.duration}</p>
                            <p>{job.description}</p>
                            <p><strong>Reference:</strong> {job.reference}</p>
                        </div>
                    ))}
                </section>

                <section id="projects">
                    <h2>Projects</h2>
                    {projects.map((project, index) => (
                        <div key={index} className="project-card">
                            <h3>{project.name}</h3>
                            <p>{project.description}</p>
                            <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
                        </div>
                    ))}
                </section>

                <section id="education">
                    <h2>Education</h2>
                    <p><strong>Utah State University</strong> - Bachelors of Computer Science (Jan 2024 - Current), GPA: 3.58</p>
                    <p><strong>Kirtland High School</strong> - Graduated with High Honors (2021)</p>
                    <p><strong>Lakeland Community College</strong> - Associates of Science and Arts (2021)</p>
                </section>
            </div>
        </div>
    );
};

export default Home;
