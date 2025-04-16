import React, { useState, useEffect } from 'react';
import './Home.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { supabase } from '../../supabaseClient';
import ProjectCard from '../../components/ProjectCard';

const Home = () => {
    const [profileImageUrl, setProfileImageUrl] = useState(null);
    const [education, setEducation] = useState([]);
    const [experience, setExperience] = useState([]);
    const [socialLinks, setSocialLinks] = useState([]);
    const [bioContent, setBioContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [featuredProjects, setFeaturedProjects] = useState([]);
    
    useEffect(() => {
        fetchProfileImage();
        fetchEducation();
        fetchWorkExperience();
        fetchSocialLinks();
        fetchBio();
        fetchFeaturedProjects();
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
                .select('*')
                .eq('show', true);
            
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
                .select('*')
                .eq('show', true);
            
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

    // Function to fetch featured projects (with show_on_homepage = true)
    const fetchFeaturedProjects = async () => {
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('show_on_homepage', true);
            
            if (error) {
                console.error('Error fetching featured projects:', error);
                return;
            }
            
            setFeaturedProjects(data || []);
        } catch (error) {
            console.error('Error:', error);
        }
    };

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
                    <a href="#" onClick={downloadResume} className="download-resume-btn">
                        <i className="fas fa-download"></i> Download PDF Resume
                    </a>
                </section>

                <section id="projects">
                    <h2>Featured Projects</h2>
                    <div className={`featured-projects-grid ${
                        featuredProjects.length === 1 ? 'one-project' : 
                        featuredProjects.length === 2 ? 'two-projects' :
                        featuredProjects.length === 3 ? 'three-projects' :
                        featuredProjects.length === 4 ? 'four-projects' :
                        featuredProjects.length === 5 ? 'five-projects' : ''
                    }`}>
                        {featuredProjects.length === 0 ? (
                            <p>No featured projects available.</p>
                        ) : (
                            featuredProjects.map((project, index) => (
                                <div key={index} className="featured-project-item">
                                    <ProjectCard project={project} />
                                </div>
                            ))
                        )}
                    </div>
                    <a id="see-all-projects" href="#projects" className="see-all-link">
                        <div className="view-all-projects">
                            <h3>See all Projects</h3>
                        </div>
                    </a>
                </section>

                <section id="education">
                    <h2>Education</h2>
                    {loading ? (
                        <p>Loading education data...</p>
                    ) : education.length === 0 ? (
                        <p>No education data available.</p>
                    ) : (
                        education.map((edu, index) => (
                            <p key={index}>
                                <strong>{edu.degree}</strong> - {edu.institution} ({edu.duration})
                                {edu.gpa && <span>, GPA: {edu.gpa}</span>}
                            </p>
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
