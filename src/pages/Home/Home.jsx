import React from 'react';
import './Home.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Home = () => {
    const experience = [
        {
            company: "Aptive Pest Control",
            role: "Door to Door Sales Representative",
            duration: "May 2021 - Aug 2021",
            description: "Optimized daily pest control routes for field technicians.",
        },
        {
            company: "Jurrus Plaster and Stucco",
            role: "Construction Worker",
            duration: "Summers 2018-2020",
            description: "Repaired and installed plaster and stucco, installed drywall.",
        },
        {
            company: "Spire Institute and Academy",
            role: "Maintenance Worker",
            duration: "Nov 2023 - Dec 2023",
            description: "Prepared for large sporting events and provided basic maintenance.",
        },
        {
            company: "Utah State University",
            role: "Computer Science TA",
            duration: "Aug 2024 - Current",
            description: "Held office hours for students, graded assignments, and supported the professor in an intro level computer science course ",
        }
    ];

    const projects = [
        {
            name: "Restoration Tour Group",
            link: "http://restorationtourgroup.com",
            content:"resto-tours-group.png",
            description: "Created a website using React for a religious tour group company"
        },
        {
            name: "Book of Mormon Languages",
            link: "http://bom-languages.web.app/",
            content: "bom-languages.png",
            description: "Developed a website for seamlessly transitioning between many languages while reading the Book of Mormon."
        }
    ];

    return (
        <div className="container">
            <nav className="sidebar">
                <ul>
                    <li><a href="#about">About Me</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#education">Education</a></li>
                    <li><a href="#experience">Experience</a></li>
                </ul>
            </nav>

            <div className="content">
                <section id="about">
                    <h1>Jonny Jackson</h1>
                    <img src="myPfp.jpg" alt="Jonny Jackson" className="headshot" />
                    <p>
                        I'm a 20-year-old computer science major at Utah State University, originally from Kirtland, Ohio. <br/>
                        I served a mission (2021-2023) in the Dominican Republic for the Church of Jesus Christ of Latter-day Saints. <br/>
                        I love programming, long-distance running, and cycling. Fluent in Spanish and a proud Eagle Scout.
                    </p>
                    <a href="/resume-jonny-jackson.pdf" download className="download-resume-btn">Download PDF Resume</a>
                </section>

                <section id="projects">
                    <h2>Projects</h2>
                    {projects.map((project, index) => (
                        <div key={index} className="project-card">
                            <h3>{project.name}</h3>
                            <img src={project.content} alt="Project example" />
                            <p>{project.description}</p>
                            <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
                        </div>
                    ))}
                </section>

                <section id="education">
                    <h2>Education</h2>
                    <p><strong>Utah State University</strong> - Bachelors of Computer Science (Jan 2024 - Current), GPA: 3.58</p>
                    <p><strong>Lakeland Community College</strong> - Associates of Science and Arts (2021)</p>
                    <p><strong>Kirtland High School</strong> - Graduated with High Honors (2021)</p>
                </section>

                <section id="experience">
                    <h2>Work Experience</h2>
                    {experience.map((job, index) => (
                        <div key={index} className="job-card">
                            <h3>{job.role} - {job.company}</h3>
                            <p>{job.duration}</p>
                            <p>{job.description}</p>
                        </div>
                    ))}
                </section>

                <section id="contact">
                    <h2>Contact Me</h2>
                    <div className="social-links">
                        <a href="https://www.facebook.com/jonny.jackson.98229/" className="fab fa-facebook-f" target="_blank" rel="noopener noreferrer"></a>
                        <a href="mailto:jrsjackson26@gmail.com" className="fas fa-envelope"></a>
                        <a href="https://linkedin.com/in/your-profile" className="fab fa-linkedin-in" target="_blank" rel="noopener noreferrer"></a>
                        <a href="https://github.com/jonnyjackson26" className="fab fa-github" target="_blank" rel="noopener noreferrer"></a>
                        <a href="https://www.youtube.com/channel/UCUPGPAKijHmEutSMKr6cnwg" className="fab fa-youtube" target="_blank" rel="noopener noreferrer"></a>
                        <a href="https://www.instagram.com/jonnyjackson_/" className="fab fa-instagram" target="_blank" rel="noopener noreferrer"></a>
                    </div>
                </section>


            </div>
        </div>
    );
};

export default Home;
