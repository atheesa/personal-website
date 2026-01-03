import Header from "../../components/Header";
import { Link } from "react-router-dom";
import "./RunwaySimPage.css"; 

function RunwaySimPage() {
  return (
    <>
      <Header />

      <div className="page-container">
        <div className="hero-section">
          <Link to="/" className="back-link">
            ← Back to Projects
          </Link>

          <h1 className="title">Runway Redeclaration Tool</h1>

          <div className="tech-badges">
            <span className="badge group-badge">Agile Group Project</span>
            <span className="badge">Java & JavaFX</span>
            <span className="badge">MVC Architecture</span>
            <span className="badge">JUnit Testing</span>
          </div>

          <p className="intro-text">
            A desktop application developed for airport controllers to calculate and visualize 
            safe runway distances (TORA, TODA, ASDA, LDA). Delivered by a team of 5 under the supervision of a  
            <strong> Project Manager</strong>, ensuring continuous alignment with <strong>Stakeholder Requirements</strong>.
          </p>
        </div>

        <section className="section">
          <h2>Project Overview</h2>
          <p>
            The system automates the complex "Runway Redeclaration" process required by civil aviation authorities. 
            It features a dynamic <strong>Visualization Engine</strong> that renders the runway, obstacle, 
            and calculated safety slopes in real-time.
          </p>
          
          <div className="architecture-diagram">
            <div className="arch-step">
              <h3>Input</h3>
              <span className="tool">JavaFX Forms</span>
              <p>Controllers input runway parameters, obstacle dimensions, and displacement thresholds.</p>
            </div>
            <div className="arrow">→</div>
            <div className="arch-step">
              <h3>Calculation</h3>
              <span className="tool">Logic Engine</span>
              <p>
                The system applies aviation formulas (Take-Off Run Available, Landing Distance Available) 
                based on obstacle position.
              </p>
            </div>
            <div className="arrow">→</div>
            <div className="arch-step">
              <h3>Visualization</h3>
              <span className="tool">Canvas Rendering</span>
              <p>Generates Top-Down and Side-On views with automatic scaling and blast distance indicators.</p>
            </div>
          </div>
        </section>

        <section className="section">
            <h2>Professional Workflow</h2>
            <p>
                This project mirrored a real-world software delivery lifecycle. We worked in 2-week Sprints,
                balancing technical debt with feature delivery.
            </p>
            <ul style={{ color: '#d4d4d4', lineHeight: '1.8', marginLeft: '20px', marginTop: '15px' }}>
                <li>
                    <strong>Stakeholder Engagement:</strong> We held bi-weekly meetings with our Project Manager 
                    and Client to demo progress, gather feedback, and refine the requirements backlog.
                </li>
                <li>
                    <strong>Agile Scrum:</strong> Utilized daily stand-ups and sprint retrospectives to adapt 
                    our velocity and solve blocking issues quickly.
                </li>
                <li>
                    <strong>Quality Assurance:</strong> Enforced a strict code review policy
                    where no feature was merged without approval from two other engineers.
                </li>
            </ul>
        </section>

        <section className="section">
          <h2>Engineering Deep Dive</h2>
          
          <div className="code-block-container">
            <h3>1. Safety-Critical Logic Implementation</h3>
            <p>
                The core challenge was translating complex aviation rules (CAA) into deterministic code. 
                This snippet shows how we handled the <strong>"Take-Off Run Available" (TORA)</strong> calculation, 
                accounting for engine blast protection zones.
            </p>
            <pre className="code-snippet">
              {`// From RunwayCalculator.java

private RunwayParameters calculateReDeclaredParameters() {
    // ... setup ...

    if (obstacleDirection == runwayDirection) { 
        // Scenario: Takeoff away from obstacle
        // We must ensure the engine blast doesn't impact the obstacle
        
        double newStartOfRoll = obstacleDistance + BLAST_ALLOWANCE; // 300m safety buffer
        tora = params.tora() - newStartOfRoll;
        
        // ASDA (Accelerate-Stop Distance) must also account for this reduction
        asda = tora + rwy.stopway();
    } 
    
    // ... handling other cases ...
}`}
            </pre>
          </div>

          <div className="code-block-container">
            <h3>2. Object-Oriented Rendering Engine</h3>
            <p>
                We designed an extensible visualization system using an <strong>Abstract Base Class</strong>. 
                This allowed the team to easily plug in different views (Top-Down, Side-On) without rewriting the 
                core scaling and rendering logic.
            </p>
            <pre className="code-snippet">
              {`// From Visualisation.java

public abstract class Visualisation {
    
    // The Template Method Pattern:
    // Defines the skeleton of the rendering loop but lets subclasses 
    // decide HOW to draw specific elements.
    public void draw() {
        gc.clearRect(0, 0, canvas.getWidth(), canvas.getHeight());
        
        // Execute a pipeline of rendering tasks
        for (var fn : new Runnable[]{
                this::drawBackground,
                this::drawRunway,
                this::drawObstacle,
                this::drawCalculatedDistances
        }) {
            gc.save();
            fn.run(); // Dynamic dispatch
            gc.restore();
        }
    }
    
    // Abstract methods forced to be implemented by subclasses
    protected abstract void drawRunway();
    protected abstract void drawObstacle();
}`}
            </pre>
          </div>

          <div className="code-block-container">
            <h3>3. Unit Testing & Validation</h3>
            <p>
                Given the safety-critical nature of the app, correctness was non-negotiable. 
                We implemented comprehensive <strong>JUnit tests</strong> to verify calculations against known 
                aviation data scenarios.
            </p>
            <pre className="code-snippet">
              {`// From RunwayCalculatorTest.java

@Test
void scenario1A() {
    // Arrange: Setup a complex runway scenario with specific obstacle placement
    var result = calculateFromDisplacedThresh(heathrow2, Direction.A, Direction.A, obstacle1, -50);

    // Act & Assert: Verify the calculation matches the expected safety parameters perfectly
    var expected = new RunwayParameters(3346, 3346, 3346, 2985);
    assertEquals(expected, result);
}`}
            </pre>
          </div>
        </section>
        <div className="cta-section">
            <a 
                href="https://github.com/atheesa/runway-simulator-project" 
                target="_blank" 
                rel="noreferrer" 
                className="github-button-large github-title"
            >
                View Full Source Code on GitHub
            </a>
        </div>

      </div>
    </>
  );
}

export default RunwaySimPage;