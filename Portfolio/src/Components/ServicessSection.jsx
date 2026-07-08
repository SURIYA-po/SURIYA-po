import React, { useRef, useEffect, useState } from 'react';
import './Sections.css';
import TiltCard from './Handletilt';
import { db } from '../Services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import projectService from '../adminpanel/services/projectService';
import ProjectViewPage from './view_pages/ProjectViewPage';

const PortfolioSection = () => {
      const navigate = useNavigate();
    
    const handleViewAllClick = () => {
        navigate('/portfolio');
    };
    const cardRefs = useRef([]);
    const arrowRefs = useRef([]);
    const [portfolioItems, setPortfolioItems] = useState([]);
    const [visibleProjects, setVisibleProjects] = useState(5);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);


    // Fetch projects from Firebase
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setIsLoading(true);
                const snapshot = await projectService.getProjects()
                const items =snapshot.data;
                setPortfolioItems(items);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProjects();
    }, []);

    // Get unique categories
    const categories = ['All' , ...new Set(portfolioItems.map(item => item.category || 'Web Development' ))];

    // Filter projects by category
    const filteredProjects = selectedCategory === 'All' 
        ? portfolioItems 
        : portfolioItems.filter(item => (item.category || 'Web Development' || 'Data Science') === selectedCategory);

    // Handle mouse move for tilt effect
    const handleMouseMove = (e, index) => {
        const card = cardRefs.current[index];
        const arrow = arrowRefs.current[index];
        if (card && arrow) {
            const { width, height, left, top } = card.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;

            const rotateY = ((x / width) - 0.5) * 20;
            const rotateX = ((y / height) - 0.5) * -20;

            card.style.setProperty('--rotate-y', `${rotateY}deg`);
            card.style.setProperty('--rotate-x', `${rotateX}deg`);
            card.style.transform = `perspective(1000px) rotateX(var(--rotate-x)) rotateY(var(--rotate-y)) scale3d(1.05, 1.05, 1.05)`;
            arrow.style.transform = `rotate(0deg)`;
        }
    };

    // Handle mouse leave
    const handleMouseLeave = (index) => {
        const card = cardRefs.current[index];
        const arrow = arrowRefs.current[index];
        if (card && arrow) {
            card.style.setProperty('--rotate-y', '0deg');
            card.style.setProperty('--rotate-x', '0deg');
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            arrow.style.transform = `rotate(-45deg)`;
        }
    };

    // Handle project click for modal
    const handleProjectClick = (project) => {
        console.log(project)
        setSelectedProject(project);
    };

    // Close modal
    const closeModal = () => {
        setSelectedProject(null);
    };

    // Handle category filter
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setVisibleProjects(5); // Reset to show 6 projects when changing category
    };

    return ( 
        <section id="services">
        <div  is="services" className="servicepair">
            {/* Services Section */}
            <section className="services-section">
                <h2 className='headers'>[Services]</h2>
                <h3>Crafting Solutions AI agents <br />One Project at a Time</h3>

                <div className="services-cards svc-grid">

                    {/* Card 1 — What I Can Do */}
                    <div className="svc-card">
                        <div className="svc-num">01</div>
                        <div className="svc-icon-wrap">
                            {/* Developer boy at laptop SVG */}
                            <svg className="svc-svg" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="40" cy="22" r="12" fill="#bef842" opacity="0.15" stroke="#bef842" strokeWidth="1.5"/>
                                <circle cx="40" cy="20" r="7" fill="#bef842" opacity="0.35"/>
                                <path d="M26 46c0-7.7 6.3-14 14-14s14 6.3 14 14" stroke="#bef842" strokeWidth="2" strokeLinecap="round"/>
                                <rect x="18" y="46" width="44" height="26" rx="4" fill="#222" stroke="#bef842" strokeWidth="1.5"/>
                                <rect x="22" y="50" width="36" height="17" rx="2" fill="#111"/>
                                <text x="30" y="62" fill="#bef842" fontSize="9" fontFamily="monospace">&lt;/&gt;</text>
                                <rect x="34" y="72" width="12" height="3" rx="1.5" fill="#bef842" opacity="0.5"/>
                            </svg>
                        </div>
                        <div className="svc-body">
                            <h4 className="svc-title">What I Can Do</h4>
                            <p className="svc-desc">Faster, better products your users will love. Here's what I build:</p>
                            <ul className="svc-list">
                                <li>AI Agent Development</li>
                                <li>AI Integration &amp; Automation</li>
                                <li>Data Science &amp; Machine Learning</li>
                                <li>API Development &amp; Integration</li>
                                <li>Full-Stack Web Development</li>
                                <li>AI in Cybersecurity</li>
                            </ul>
                        </div>
                    </div>

                    {/* Card 2 — Tech Stack */}
                    <div className="svc-card">
                        <div className="svc-num">02</div>
                        <div className="svc-icon-wrap">
                            {/* Gear / tools SVG */}
                            <svg className="svc-svg" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="40" cy="40" r="10" fill="#bef842" opacity="0.15" stroke="#bef842" strokeWidth="1.5"/>
                                <circle cx="40" cy="40" r="5" fill="#bef842" opacity="0.5"/>
                                <path d="M40 18v6M40 56v6M18 40h6M56 40h6" stroke="#bef842" strokeWidth="2" strokeLinecap="round"/>
                                <path d="M24.7 24.7l4.2 4.3M51.1 51.1l4.2 4.2M24.7 55.3l4.2-4.2M51.1 28.9l4.2-4.2" stroke="#bef842" strokeWidth="2" strokeLinecap="round"/>
                                <rect x="12" y="14" width="18" height="12" rx="3" fill="#222" stroke="#bef842" strokeWidth="1.2"/>
                                <text x="16" y="23" fill="#bef842" fontSize="7" fontFamily="monospace">Py</text>
                                <rect x="50" y="14" width="18" height="12" rx="3" fill="#222" stroke="#fef470" strokeWidth="1.2"/>
                                <text x="53" y="23" fill="#fef470" fontSize="7" fontFamily="monospace">AI</text>
                                <rect x="50" y="54" width="18" height="12" rx="3" fill="#222" stroke="#bef842" strokeWidth="1.2"/>
                                <text x="53" y="63" fill="#bef842" fontSize="6" fontFamily="monospace">API</text>
                                <rect x="12" y="54" width="18" height="12" rx="3" fill="#222" stroke="#fef470" strokeWidth="1.2"/>
                                <text x="14" y="63" fill="#fef470" fontSize="6" fontFamily="monospace">SQL</text>
                            </svg>
                        </div>
                        <div className="svc-body">
                            <h4 className="svc-title">Languages &amp; Frameworks</h4>
                            <p className="svc-desc">Every problem needs the right tool. My core stack:</p>
                            <ul className="svc-list">
                                <li>Python &amp; Java</li>
                                <li>LangChain &amp; LangGraph</li>
                                <li>Pinecone &amp; LangSmith</li>
                                <li>FastAPI &amp; Spring Boot</li>
                                <li>React &amp; Node.js</li>
                                <li>PyTorch &amp; scikit-learn</li>
                            </ul>
                        </div>
                    </div>

                    {/* Card 3 — What to Expect */}
                    <div className="svc-card">
                        <div className="svc-num">03</div>
                        <div className="svc-icon-wrap">
                            {/* Rocket / delivery SVG */}
                            <svg className="svc-svg" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M40 10 C40 10, 55 20, 55 40 L55 55 L40 62 L25 55 L25 40 C25 20, 40 10, 40 10Z" fill="#bef842" opacity="0.1" stroke="#bef842" strokeWidth="1.5"/>
                                <circle cx="40" cy="36" r="6" fill="#bef842" opacity="0.4"/>
                                <circle cx="40" cy="36" r="3" fill="#bef842"/>
                                <path d="M25 54 L18 62 L28 60 L30 50" fill="#bef842" opacity="0.3" stroke="#bef842" strokeWidth="1"/>
                                <path d="M55 54 L62 62 L52 60 L50 50" fill="#bef842" opacity="0.3" stroke="#bef842" strokeWidth="1"/>
                                <path d="M34 62 L36 72 L40 68 L44 72 L46 62" fill="#fef470" opacity="0.4" stroke="#fef470" strokeWidth="1"/>
                                <path d="M22 44 L16 42 L18 38" stroke="#bef842" strokeWidth="1.5" strokeLinecap="round"/>
                                <path d="M58 44 L64 42 L62 38" stroke="#bef842" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <div className="svc-body">
                            <h4 className="svc-title">What You Can Expect</h4>
                            <p className="svc-desc">I build systems that go beyond aesthetics and truly deliver:</p>
                            <ul className="svc-list">
                                <li>Robust &amp; Production-Ready</li>
                                <li>Optimized &amp; Well Documented</li>
                                <li>Efficient &amp; Maintainable</li>
                                <li>Secure &amp; Scalable Architecture</li>
                                <li>Clear Communication &amp; Updates</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </section>

            {/* Portfolio Section */}
            <section  id="portfolio" className="portfolio-section">
                <center><h2 className='headers'>[Portfolio]</h2></center>
                <h3>Dont judge the book by its cover.</h3>

                {/* Category Filter */}
                <div className="portfolio-filters">
                 
                </div>

                {/* Loading State */}
                {isLoading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading projects...</p>
                    </div>
                ) : (
                    <>
                        {/* Portfolio Cards */}
                        <div className="portfolio-cards">
                            {filteredProjects.slice(0, visibleProjects).map((item, index) => (
                                <div
                                    key={item.id || index}
                                    className="portfolio-card"
                                    ref={(el) => (cardRefs.current[index] = el)}
                                    onMouseMove={(e) => handleMouseMove(e, index)}
                                    onMouseLeave={() => handleMouseLeave(index)}
                                    onClick={() => handleProjectClick(item) }
                                >
                                    {/* Project Image */}
                                   
                                    
                                    <div className="card-content">
                                   
                                       <h4 className="headers_1">{item.title.length > 50 
                        ? item.title.substring(0, 50) + '...' 
                        : item.title}</h4>
                                        <p className="para">{item.description.length > 50 
                        ? item.description.substring(0, 50) + '...' 
                        : item.description
                    } </p>
                                        
                                        {/* Technologies Used */}
                                        {item.techStack && (
                                            <div className="technologies">
                                                {item.techStack.slice(0,4).map((tech, techIndex) => (
                                                    <span key={techIndex} className="tech-tag">
                                                        {tech.toString().toUpperCase()}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        
                                        <div className="pair">
                                            <a 
                                                href={item.homepage || item.githubUrl} 
                                                className="view-project" 
                                                target="_blank" 
                                                rel="noreferrer"
                                                onClick={handleViewAllClick}
                                            >
                                                View project
                                            </a>
                                            <div
                                                className="arrow"
                                                ref={(el) => (arrowRefs.current[index] = el)}
                                            ></div>
                                        </div>
                                    </div>
                                     {item.image && (
                                        <div className="project-image">
                                            <img src={item.image} alt={item.name || item.title} />
                                            
                                           
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* View All/Less Button */}
                        {filteredProjects.length > 5&& (
                            <button 
                                className="view-all" 
                                onClick={() => {
                                    setVisibleProjects(prev => 
                                        prev === 5 ? filteredProjects.length : 5
                                    );
                                }}
                            >
                                {visibleProjects === 5 ? 
                                    `View all ${filteredProjects.length} projects` : 
                                    'View less'
                                }
                            </button>
                        )}
                    </>
                )}

                {/* Project Details Modal */}
                {selectedProject && ( 
            navigate(`/project_view_page/${selectedProject._id}`)
                )}
            </section>
        </div>
         </section>
    );
   
};

export { PortfolioSection };
