import Header from "../../components/Header";
import "./HomePage.css";
import { useOnScreen } from "../../utils/useOnScreen";

function HomePage() {
  const { ref: eduRef, isIntersecting: eduVisible } = useOnScreen();
  const { ref: techRef, isIntersecting: techVisible } = useOnScreen();
  const { ref: contactRef, isIntersecting: contactVisible } = useOnScreen();
  return (
    <>
      <Header></Header>
      <div className="project-grid">
        <div className="project-container">PROJECT 1</div>
        <div className="project-container">PROJECT 2</div>

        <div className="project-container">PROJECT 3</div>

        <div className="project-container">PROJECT 4</div>

        <div className="project-container">PROJECT 5</div>

        <div className="project-container">PROJECT 6</div>
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
