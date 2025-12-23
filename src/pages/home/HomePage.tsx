import Header from "../../components/Header";
import "./HomePage.css";
import { useOnScreen } from "../../utils/useOnScreen";
import ProjectCard from "../../components/ProjectCard";
import StarBackground from "../../components/StarBackground"; 

function HomePage() {
  const { ref: eduRef, isIntersecting: eduVisible } = useOnScreen();
  const { ref: techRef, isIntersecting: techVisible } = useOnScreen();
  const { ref: contactRef, isIntersecting: contactVisible } = useOnScreen();
  const projects = [
  { id: 1, title: "Graph Query Lang", color: "#6366f1", img: "" },
  { id: 2, title: "Runway Sim", color: "#a855f7", img: "" },
  { id: 3, title: "AI Lunar Lander", color: "#ec4899", img: "" },
  { id: 4, title: "NLP Research", color: "#14b8a6", img: "" },
  { id: 5, title: "Self-Driving Car", color: "#f97316", img: "" },
  { id: 6, title: "Tetris PvP", color: "#3b82f6", img: "" },
];

  return (
    <>
    <StarBackground />
      <Header></Header>
      <div className="project-grid">
        {projects.map((p) => (
          <ProjectCard key={p.id} projectMeta={p}/>
        ))}
      </div>

      <div
        ref={eduRef}
        className={`education-container animate-on-scroll ${
          eduVisible ? "is-visible" : ""
        }`}
      >
        <h2>Education</h2>
        <p>University of Southampton</p>
      </div>

      <div
        ref={techRef}
        className={`technologies-container animate-on-scroll slide-in-left ${
          techVisible ? "is-visible" : ""
        }`}
      >
        <h2>Technologies</h2>
        <p>Java, C++, Python</p>
      </div>

      <div
        ref={contactRef}
        className={`contact-container animate-on-scroll ${
          contactVisible ? "is-visible" : ""
        }`}
      >
        <h2>Contact</h2>
        <p>nantheesanr@gmail.com</p>
      </div>
    </>
  );
}
export default HomePage;
