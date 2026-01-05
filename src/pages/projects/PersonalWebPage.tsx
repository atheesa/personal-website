import Header from "../../components/Header";
import TerminalWindow from "../../components/TerminalWindow";
import { Link } from "react-router-dom";
import "./PersonalWebPage.css";

function PersonalWebPage() {
  return (
    <>
      
      <div className="page-container">
        
        <div className="hero-section">
            <Link to="/" className="back-link">← Back to Projects</Link>
            
            <h1 className="title">Portfolio Platform Engineering</h1>
            
            <div className="tech-badges">
                <span className="badge">Frontend Architecture</span>
                <span className="badge">React 18 </span>
                <span className="badge">TypeScript</span>
                <span className="badge">Component Architecture</span>
                <span className="badge">SPA Performance</span>
                <span className="badge">Custom Hooks</span>
                <span className="badge">Intersection Observer</span>
                <span className="badge">Strict Typing</span>
                <span className="badge">Vite</span>
            </div>

            <p className="intro-text">
              This is not just a static site; it is a scalable <strong>Single Page Application (SPA)</strong> engineered for performance and maintainability. 
              By leveraging <strong>React 18</strong> and <strong>TypeScript</strong>, I built a modular component system that decouples 
              UI logic from state management, ensuring type safety and code reusability across the entire application.
            </p>
        </div>

        <section className="section">
            <h2>Modular Component Architecture</h2>
            <p>
                To avoid code duplication and ensure visual consistency, I implemented an <strong>Atomic Design</strong> philosophy. 
                Components like <code>ProjectCard</code>, <code>TerminalWindow</code>, and <code>JupyterNotebook</code> are built as 
                pure functional components with strict interface definitions. This allows them to be reused in any context with predictable behavior.
            </p>
            
            <TerminalWindow>
                <div className="comment">// From src/components/ProjectCard.tsx</div>
                <div className="code-line"><span className="comment">// Strict Interface Definition ensuring Type Safety</span></div>
                <div className="code-line"><span className="keyword">interface</span> ProjectMeta {'{'}</div>
                <div className="code-line">    id: <span className="keyword">number</span>;</div>
                <div className="code-line">    title: <span className="string">string</span>;</div>
                <div className="code-line">    color: <span className="string">string</span>;</div>
                <div className="code-line">    techStack: <span className="string">string[]</span>;</div>
                <div className="code-line">{'}'}</div>
                <div className="code-line"></div>
                <div className="code-line"><span className="comment">// Reusable Component accepting typed props</span></div>
                <div className="code-line"><span className="keyword">function</span> ProjectCard({'{} projectMeta {'} : <span className="keyword">ProjectMetaProps</span>) {'{'}</div>
                <div className="code-line">    <span className="keyword">return</span> (</div>
                <div className="code-line">        &lt;Link to={`/project/${'{'}projectMeta.id{'}'}`}&gt;</div>
                <div className="code-line">            &lt;div className="card-content"&gt;...&lt;/div&gt;</div>
                <div className="code-line">        &lt;/Link&gt;</div>
                <div className="code-line">    );</div>
                <div className="code-line">{'}'}</div>
            </TerminalWindow>
        </section>

        <section className="section">
            <h2>Performance Engineering: The `useOnScreen` Hook</h2>
            <div className="stat-grid">
                <div className="stat-card">
                    <h3>Intersection Observer API</h3>
                    <p>
                        Instead of binding heavy listeners to the window's <code>scroll</code> event (which causes layout thrashing), 
                        I implemented the browser-native <strong>Intersection Observer API</strong>. This moves the visibility calculation 
                        off the main thread.
                    </p>
                </div>
                <div className="stat-card">
                    <h3>Custom Hook Abstraction</h3>
                    <p>
                        I encapsulated this logic into a custom hook, <code>useOnScreen()</code>. This allows any component 
                        to opt-in to "Lazy Loading" or "Scroll Animations" with a single line of code, separating the 
                        <em>when</em> (logic) from the <em>what</em> (rendering).
                    </p>
                </div>
                <div className="stat-card">
                    <h3>Memory Leak Prevention</h3>
                    <p>
                        The hook handles its own lifecycle management, automatically disconnecting observers in the 
                        <code>useEffect</code> cleanup function when components unmount, preventing memory leaks in the SPA.
                    </p>
                </div>
            </div>
        </section>

        <section className="section">
            <h2>Logic Abstraction Deep Dive</h2>
            <p>
                Here is the implementation of the custom hook. Note the use of <code>useRef</code> to maintain 
                DOM references without triggering re-renders, and the conditional cleanup logic.
            </p>

            <TerminalWindow>
                <div className="comment">// From src/utils/useOnScreen.ts</div>
                <div className="code-line"><span className="keyword">export function</span> useOnScreen(threshold = 0.5) {'{'}</div>
                <div className="code-line">  <span className="keyword">const</span> [isIntersecting, setIntersecting] = useState(<span className="keyword">false</span>);</div>
                <div className="code-line">  <span className="keyword">const</span> ref = useRef&lt;HTMLDivElement&gt;(<span className="keyword">null</span>);</div>
                <div className="code-line"></div>
                <div className="code-line">  useEffect(() =&gt; {'{'}</div>
                <div className="code-line">    <span className="keyword">const</span> observer = <span className="keyword">new</span> IntersectionObserver(([entry]) =&gt; {'{'}</div>
                <div className="code-line">      <span className="comment">// Only trigger state update if threshold is met</span></div>
                <div className="code-line">      <span className="keyword">if</span> (entry.isIntersecting) {'{'}</div>
                <div className="code-line">        setIntersecting(<span className="keyword">true</span>);</div>
                <div className="code-line">        <span className="comment">// Unobserve immediately to save resources (Single Trigger)</span></div>
                <div className="code-line">        observer.unobserve(ref.current);</div>
                <div className="code-line">      {'}'}</div>
                <div className="code-line">    {'}'}, {'{'} threshold {'}'});</div>
                <div className="code-line">    </div>
                <div className="code-line">    <span className="keyword">return</span> () =&gt; observer.disconnect();</div>
                <div className="code-line">  {'}'}, []);</div>
                <div className="code-line">  <span className="keyword">return</span> {'{'} ref, isIntersecting {'}'};</div>
                <div className="code-line">{'}'}</div>
            </TerminalWindow>
        </section>

        <div className="cta-section">
            <a 
                href="https://github.com/atheesa/personal-website" 
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

export default PersonalWebPage;