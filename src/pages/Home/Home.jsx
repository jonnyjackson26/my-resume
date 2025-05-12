import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import './Home.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { supabase } from '../../supabaseClient';
import ProjectCard from '../../components/ProjectCard';
import { Context } from '../../main';

const Home = () => {
    const [profileImageUrl, setProfileImageUrl] = useState(null);
    const [education, setEducation] = useState([]);
    const [experience, setExperience] = useState([]);
    const [socialLinks, setSocialLinks] = useState([]);
    const [bioContent, setBioContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [featuredProjects, setFeaturedProjects] = useState([]);
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
    const [slideHeight, setSlideHeight] = useState("auto");
    const [autoplayEnabled, setAutoplayEnabled] = useState(false);
    const autoplayTimerRef = useRef(null);
    const slideContainerRef = useRef(null);
    const projectCardRefs = useRef({});
    const carouselRef = useRef(null);
    const { logAnalyticsEvent } = useContext(Context);
    
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

    // Function to download resume from Supabase storage
    const downloadResume = async (e) => {
        e.preventDefault();
        try {
            // Track the resume download event
            logAnalyticsEvent('resume_download', {
                timestamp: new Date().toISOString()
            });
            
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

    // Function to go to next project
    const goToNextProject = useCallback(() => {
        setCurrentProjectIndex((prevIndex) => 
            prevIndex === featuredProjects.length - 1 ? 0 : prevIndex + 1
        );
    }, [featuredProjects.length]);

    // Function to go to previous project
    const goToPrevProject = () => {
        setCurrentProjectIndex((prevIndex) => 
            prevIndex === 0 ? featuredProjects.length - 1 : prevIndex - 1
        );
    };

    // Function to manually rotate carousel
    const manualNavigation = (direction) => {
        // Track carousel navigation event
        logAnalyticsEvent('carousel_navigation', {
            direction: direction
        });
        
        stopAutoplay();
        if (direction === 'next') {
            goToNextProject();
        } else {
            goToPrevProject();
        }
    };

    // Function to start autoplay
    const startAutoplay = useCallback(() => {
        if (autoplayTimerRef.current) {
            clearInterval(autoplayTimerRef.current);
        }
        autoplayTimerRef.current = setInterval(goToNextProject, 3000);
        setAutoplayEnabled(true);
    }, [goToNextProject]);
    
    // Function to stop autoplay
    const stopAutoplay = useCallback(() => {
        if (autoplayTimerRef.current) {
            clearInterval(autoplayTimerRef.current);
            autoplayTimerRef.current = null;
        }
        setAutoplayEnabled(false);
    }, []);
    
    // Setup visibility observer with 100% reliability
    useEffect(() => {
        if (!carouselRef.current) return;
        
        // Create intersection observer
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    startAutoplay();
                } else {
                    stopAutoplay();
                }
            },
            {
                root: null, // viewport
                rootMargin: '0px',
                threshold: 0.1, // 10% visibility triggers
            }
        );
        
        // Start observing
        observer.observe(carouselRef.current);
        
        // Clean up
        return () => {
            if (carouselRef.current) {
                observer.unobserve(carouselRef.current);
            }
            stopAutoplay();
        };
    }, [startAutoplay, stopAutoplay, featuredProjects.length]);
    
    // Add document visibility change detection (for tab switching)
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                stopAutoplay();
            } else {
                // Only restart if element is currently in view
                const isInView = carouselRef.current && 
                    carouselRef.current.getBoundingClientRect().top < window.innerHeight &&
                    carouselRef.current.getBoundingClientRect().bottom > 0;
                    
                if (isInView) {
                    startAutoplay();
                }
            }
        };
        
        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [startAutoplay, stopAutoplay]);

    // Update the height of the carousel based on the current project
    useEffect(() => {
        if (featuredProjects.length > 0 && projectCardRefs.current[currentProjectIndex]) {
            const updateHeight = () => {
                const currentCard = projectCardRefs.current[currentProjectIndex];
                if (currentCard) {
                    // Get the computed height including padding
                    const cardHeight = currentCard.offsetHeight;
                    // Add padding to ensure enough space (reduced from 40 to 20)
                    const containerPadding = 20; // 10px top + 10px bottom
                    setSlideHeight(`${cardHeight + containerPadding}px`);
                }
            };
            
            // Initial update
            updateHeight();
            
            // Update again after a short delay to ensure images are loaded
            const timer = setTimeout(updateHeight, 100);
            
            // Add resize listener to handle window size changes
            window.addEventListener('resize', updateHeight);
            
            return () => {
                clearTimeout(timer);
                window.removeEventListener('resize', updateHeight);
            };
        }
    }, [currentProjectIndex, featuredProjects]);

    // Handler for specific indicator click
    const goToProject = (index) => {
        // Track direct project selection
        logAnalyticsEvent('select_project', {
            project_index: index,
            project_title: featuredProjects[index]?.title || 'Unknown'
        });
        
        stopAutoplay();
        setCurrentProjectIndex(index);
    };
    
    // Handler to scroll to a specific section by ID
    const scrollToSection = (sectionId) => {
        // Track section navigation
        logAnalyticsEvent('section_view', {
            section_id: sectionId
        });
        
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
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
                    {featuredProjects.length === 0 ? (
                        <p>No featured projects available.</p>
                    ) : (
                        <div className="featured-projects-carousel" ref={carouselRef}>
                            <div 
                                className="carousel-container"
                                style={{ height: slideHeight, transition: "height 0.3s ease-in-out" }}
                                ref={slideContainerRef}
                            >
                                <button 
                                    className="carousel-nav-btn prev-btn" 
                                    onClick={() => manualNavigation('prev')}
                                    aria-label="Previous project"
                                >
                                    <i className="fas fa-chevron-left"></i>
                                </button>
                                
                                <div className="carousel-content">
                                    <div 
                                        className="carousel-slide" 
                                        style={{ 
                                            transform: `translateX(-${currentProjectIndex * 100}%)`
                                        }}
                                    >
                                        {featuredProjects.map((project, index) => (
                                            <div 
                                                key={index} 
                                                className="carousel-item"
                                            >
                                                <div 
                                                    ref={el => projectCardRefs.current[index] = el}
                                                    className="project-wrapper"
                                                >
                                                    <ProjectCard project={project} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                <button 
                                    className="carousel-nav-btn next-btn" 
                                    onClick={() => manualNavigation('next')}
                                    aria-label="Next project"
                                >
                                    <i className="fas fa-chevron-right"></i>
                                </button>
                            </div>
                            
                            <div className="carousel-indicators">
                                {featuredProjects.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`carousel-indicator ${index === currentProjectIndex ? 'active' : ''}`}
                                        onClick={() => goToProject(index)}
                                        aria-label={`Go to project ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
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
