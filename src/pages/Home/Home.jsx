import React, { useState, useEffect } from 'react';
import './Home.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { supabase } from '../../supabaseClient';

const Home = () => {
    const [profileImageUrl, setProfileImageUrl] = useState(null);
    const [education, setEducation] = useState([]);
    const [experience, setExperience] = useState([]);
    const [socialLinks, setSocialLinks] = useState([]);
    const [bioContent, setBioContent] = useState('');
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetchProfileImage();
        fetchEducation();
        fetchWorkExperience();
        fetchSocialLinks();
        fetchBio();
    }, []);

    // Function to fetch profile image from Supabase
    const fetchProfileImage = async () => {
        try {
            const { data, error } = await supabase
                .storage
                .from('photos')
                .getPublicUrl('myPfp.jpg');
            
            if (error) {
                console.error('Error fetching profile image:', error);
                return;
            }
            
            setProfileImageUrl(data.publicUrl);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Function to fetch bio data
    const fetchBio = async () => {
        try {
            const { data, error } = await supabase
                .from('bio')
                .select('content')
                .single();
            
            if (error) {
                console.error('Error fetching bio:', error);
                return;
            }
            
            setBioContent(data?.content || '');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Function to fetch education data
    const fetchEducation = async () => {
        try {
            const { data, error } = await supabase
                .from('education')
                .select('*');
            
            if (error) {
                console.error('Error fetching education:', error);
                return;
            }
            
            setEducation(data || []);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Function to fetch work experience data
    const fetchWorkExperience = async () => {
        try {
            const { data, error } = await supabase
                .from('work_experience')
                .select('*');
            
            if (error) {
                console.error('Error fetching work experience:', error);
                return;
            }
            
            setExperience(data || []);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch social links data
    const fetchSocialLinks = async () => {
        try {
            const { data, error } = await supabase
                .from('social_links')
                .select('*');
            
            if (error) {
                console.error('Error fetching social links:', error);
                return;
            }
            
            setSocialLinks(data || []);
        } catch (error) {
            console.error('Error:', error);
        }
    };

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

    // Handler to scroll to a specific section by ID
    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    };

    // Function to download resume from Supabase storage
    const downloadResume = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase
                .storage
                .from('resume-pdf')
                .download('resume-jonny-jackson.pdf');
            
            if (error) {
                console.error('Error downloading resume:', error);
                return;
            }
            
            // Create a download link for the PDF
            const url = URL.createObjectURL(data);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'resume-jonny-jackson.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container">
            <nav className="sidebar">
                <ul>
                    <li><button onClick={() => scrollToSection('about')}>About Me</button></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><button onClick={() => scrollToSection('education')}>Education</button></li>
                    <li><button onClick={() => scrollToSection('experience')}>Experience</button></li>
                </ul>
            </nav>

            <div className="content">
                <section id="about">
                    <h1>Jonny Jackson</h1>
                    <img 
                        src={profileImageUrl || 'myPfp.jpg'} 
                        alt="Jonny Jackson" 
                        className="headshot" 
                    />
                    {loading ? (
                        <p>Loading bio...</p>
                    ) : (
                        <p dangerouslySetInnerHTML={{ __html: bioContent }}></p>
                    )}
                    <div className="social-links">
                        {socialLinks.map((link, index) => (
                            <a 
                                key={index} 
                                href={link.url} 
                                className={link.icon_class} 
                                target="_blank" 
                                rel="noopener noreferrer"
                            ></a>
                        ))}
                    </div>
                    <a href="#" onClick={downloadResume} className="download-resume-btn">Download PDF Resume</a>
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
                    <a id="see-all-projects" href="#projects"><div className="project-card">
                        <h3>See all Projects (20+)</h3>
                    </div></a>
                </section>

                <section id="education">
                    <h2>Education</h2>
                    {loading ? (
                        <p>Loading education data...</p>
                    ) : education.length === 0 ? (
                        <p>No education data available.</p>
                    ) : (
                        education.map((edu, index) => (
                            <p key={index}><strong>{edu.institution}</strong> - {edu.degree} ({edu.duration}), GPA: {edu.gpa}</p>
                        ))
                    )}
                </section>

                <section id="experience">
                    <h2>Work Experience</h2>
                    {loading ? (
                        <p>Loading experience data...</p>
                    ) : experience.length === 0 ? (
                        <p>No experience data available.</p>
                    ) : (
                        experience.map((job, index) => (
                            <div key={index} className="job-card">
                                <h3>{job.role} - {job.company}</h3>
                                <p>{job.duration}</p>
                                <p>{job.description}</p>
                            </div>
                        ))
                    )}
                </section>
            </div>
        </div>
    );
};

export default Home;
