import Header from "../../components/Header";
import "./HomePage.css";
import { useOnScreen } from "../../utils/useOnScreen";
import ProjectCard from "../../components/ProjectCard";
import StarBackground from "../../components/StarBackground";

function HomePage() {
  const { ref: eduRef, isIntersecting: eduVisible } = useOnScreen();
  const { ref: techRef, isIntersecting: techVisible } = useOnScreen();
  const { ref: contactRef, isIntersecting: contactVisible } = useOnScreen();
  const { ref: heroRef, isIntersecting: heroVisible } = useOnScreen();
  const { ref: skillRef, isIntersecting: skillVisible } = useOnScreen();
  const projects = [
    {
      id: 1,
      title: "Graph Query Lang",
      color: "#6366f1",
      img: "/images/graph-lang.png",
      description:
        "A domain-specific language and interpreter for graph databases built in Haskell. Features a custom CEK-style state machine, dual-parsing architecture (Alex/Happy), and strict schema validation.",
    },
    {
      id: 2,
      title: "Runway Sim",
      color: "#a855f7",
      img: "/images/runway.png",
      description:
        "A safety-critical JavaFX desktop application for airport runway redeclaration. Utilizes MVC architecture to calculate aviation safety parameters (TORA/ASDA) with real-time obstacle visualization.",
    },
    {
      id: 3,
      title: "Personal Portfolio",
      color: "#ec4899",
      img: "/images/portfolio.png",
      description:
        "A high-performance SPA built with React 18 and TypeScript. Implements Atomic Design principles, custom hooks for logic abstraction, and Intersection Observers for efficient lazy-loading.",
    },
    {
      id: 4,
      title: "ML Scientometrics Research",
      color: "#14b8a6",
      img: "/images/research.png",
      description:
        "A fraud detection pipeline leveraging Graph Neural Networks and NLP (SBERT) to identify retracted papers. Introduces 'Meta-Net,' a novel architecture for capturing latent semantic relationships.",
    },
    {
      id: 5,
      title: "Java MIDI Orchestra",
      color: "#f97316",
      img: "/images/orchestra.png",
      description:
        "A comprehensive simulation engine that models a real-world orchestra. The system parses custom music sheet files, assigns musicians to a limited number of seats using HashMap-based resource management, and conducts a synchronized playback using the Java MIDI Synthesize.",
    },
    {
      id: 6,
      title: "Tetris PvP",
      color: "#3b82f6",
      img: "/images/tetrecs.png",
      description:
        "A real-time multiplayer arcade game engineered in Java 17. Features a non-blocking multithreaded game loop, thread-safe UI marshaling, and deterministic WebSocket state synchronization.",
    },
  ];

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
      {/* {<StarBackground />} */}
      <Header></Header>
     <div className="home-hero-container">
        <div 
          ref={heroRef} 
          className={`home-hero-content ${heroVisible ? "is-visible" : ""}`}
        >
            <div className="hero-visual">
                <div className="profile-img-wrapper">
                    <img src="/images/profile.jpg" alt="Nantheesan Raveenthiran" />
                </div>
            </div>

            <div className="hero-text">
                <h1>Nantheesan Raveenthiran</h1>
                <h2>Software Engineer & Researcher</h2>
                <p>
                    I build high-performance systems and scalable applications. 
                    First Class Honors graduate with a specialization in 
                    <strong> Compiler Design</strong>, <strong>Machine Learning</strong>, 
                    and <strong>Full-Stack Engineering</strong>.
                </p>
                <div className="hero-actions">
                    <a href="#projects" className="primary-btn" onClick={handleScrollToProjects}>
                        View Projects
                    </a>
                    <a href="/cv.pdf" target="_blank" className="secondary-btn">
                        Download CV
                    </a>
                </div>
            </div>
        </div>
      </div>
      <div id="projects" className="project-grid">
        {projects.map((p) => (
          <ProjectCard key={p.id} projectMeta={p} />
        ))}
      </div>

      <div
        ref={eduRef}
        className={`education-container animate-on-scroll ${
          eduVisible ? "is-visible" : ""
        }`}
      >
        <h2>Education</h2>
        <p>
          University of Southampton --- First Class with Honors --- BSc Computer
          Science
        </p>
        <p>A-level Physics --- A*</p>
        <p>A-level Maths --- A*</p>
        <p>A-level Further Maths --- A*</p>
      </div>

      <div
        ref={techRef}
        className={`technologies-container animate-on-scroll slide-in-left ${
          techVisible ? "is-visible" : ""
        }`}
      >
        <h2>CV</h2>
        <button> Downl</button>
      </div>

      <div
        ref={contactRef}
        className={`contact-container animate-on-scroll ${
          contactVisible ? "is-visible" : ""
        }`}
      >
        <h2>Contact</h2>
        <p>nantheesanr@gmail.com +44 7411 292986</p>
      </div>
    </>
  );
}
export default HomePage;
