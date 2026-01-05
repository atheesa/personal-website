import Header from "../../components/Header";
import TerminalWindow from "../../components/TerminalWindow";
import { Link } from "react-router-dom";
import "./TetrECSPage.css";

function TetrECSPage() {
  return (
    <>
      
      <div className="page-container">
        
        <div className="hero-section">
            <Link to="/" className="back-link">← Back to Projects</Link>
            
            <h1 className="title">TetrECS: Multiplayer Game Logic</h1>
            
            <div className="tech-badges">
                <span className="badge">Event-Driven Architecture</span>
                <span className="badge">State Management</span>
                <span className="badge">Java 17</span>
                <span className="badge">JavaFx</span>
                <span className="badge">Multithreading</span>
                <span className="badge">Observer Pattern</span>
                <span className="badge">System Integration</span>
            </div>

            <p className="intro-text">
              A complex logic implementation for a real-time tile-matching game. 
              While the university provided the rendering framework, I engineered the <strong>Core Game Loop</strong>, 
              managed <strong>Thread Safety</strong> between the UI and logic layers, and implemented the 
              <strong> Multiplayer State Synchronization</strong> using a provided WebSocket interface.
            </p>
        </div>

        <section className="section">
            <h2>System Architecture</h2>
            <div className="stat-grid">
                <div className="stat-card">
                    <h3>The Game Loop</h3>
                    <p>
                        I engineered a non-blocking game loop using `ScheduledExecutorService`. 
                        It handles strict timing events (gravity, locking) independently of the UI framerate, 
                        preventing "lag" from affecting game logic.
                    </p>
                </div>
                <div className="stat-card">
                    <h3>Observer Pattern</h3>
                    <p>
                        To decouple Logic from View, I implemented a strict Listener interface system. 
                        The `ChallengeScene` subscribes to `GameLoopListener` and `NextPieceListener` events, 
                        updating the UI only when the state machine fires a change.
                    </p>
                </div>
                <div className="stat-card">
                    <h3>Client-Side Networking</h3>
                    <p>
                        I extended the base game logic to create `MultiplayerGame`, which overrides the random seed generator 
                        with a <strong>Networked Message Queue</strong>. This ensures deterministic gameplay across distributed clients.
                    </p>
                </div>
            </div>
        </section>

        <section className="section">
            <h2>Engineering Challenge: Thread Safety</h2>
            <p>
                The primary challenge was managing the <strong>JavaFX Application Thread</strong> versus the <strong>Game Logic Thread</strong>. 
                Modifying the UI from a background thread causes runtime errors, so I implemented a marshaling system using `Platform.runLater` 
                to safely sync the background timer with the frontend animations.
            </p>
            
            <TerminalWindow>
                <div className="comment">// From Game.java: Thread-Safe State Management</div>
                <div className="code-line"><span className="keyword">public void</span> startTimer() {'{'}</div>
                <div className="code-line">    <span className="comment">// 1. Logic Thread: Runs the math (Gravity, Lives, Score)</span></div>
                <div className="code-line">    gameTimer = Executors.newSingleThreadScheduledExecutor();</div>
                <div className="code-line">    gameTimer.scheduleAtFixedRate(<span className="keyword">this</span>::gameLoop, getTimerDelay(), TimeUnit.MILLISECONDS);</div>
                <div className="code-line">    </div>
                <div className="code-line">    <span className="comment">// 2. UI Thread: Updates the visual countdown bar</span></div>
                <div className="code-line">    UItimer = Executors.newSingleThreadScheduledExecutor();</div>
                <div className="code-line">    UItimer.scheduleAtFixedRate(<span className="keyword">this</span>::updateCountdownUI, 0, 1000, TimeUnit.MILLISECONDS);</div>
                <div className="code-line">{'}'}</div>
                <div className="code-line"></div>
                <div className="code-line"><span className="keyword">public void</span> updateCountdownUI() {'{'}</div>
                <div className="code-line">    <span className="comment">// Marshal the background event back to the UI thread</span></div>
                <div className="code-line">    Platform.runLater(() -&gt; uiTimerListener.sendTime(remainingTime));</div>
                <div className="code-line">{'}'}</div>
            </TerminalWindow>
        </section>

        <section className="section">
            <h2>Multiplayer Logic & Queue Management</h2>
            <p>
                In single-player, pieces are random. In multiplayer, fairness is required. I implemented a 
                <strong>Command Pattern</strong> system that listens for server messages (e.g., `PIECE 14`, `SCORES`). 
                These messages populate a `LinkedList` queue, ensuring that my client processes the exact same sequence 
                of pieces as every other player in the lobby.
            </p>

            <TerminalWindow>
                <div className="comment">// From MultiplayerGame.java: Handling Server Commands</div>
                <div className="code-line"><span className="keyword">public</span> MultiplayerGame(Communicator communicator) {'{'}</div>
                <div className="code-line">    <span className="keyword">this</span>.communicator = communicator;</div>
                <div className="code-line">    </div>
                <div className="code-line">    <span className="comment">// Asynchronous Listener for WebSocket messages</span></div>
                <div className="code-line">    communicator.addListener((message) -&gt; {'{'}</div>
                <div className="code-line">        <span className="keyword">if</span> (message.startsWith(<span className="string">"PIECE"</span>)) {'{'}</div>
                <div className="code-line">            <span className="comment">// Add to the thread-safe queue</span></div>
                <div className="code-line">            Platform.runLater(() -&gt; createPiece(message));</div>
                <div className="code-line">        {'}'}</div>
                <div className="code-line">    {'}'});</div>
                <div className="code-line">{'}'}</div>
            </TerminalWindow>
        </section>

        <section className="section">
            <h2>Data Structures & Algorithms</h2>
            <div className="finding-block">
                <h3>Recursive Line Clearing</h3>
                <p>
                    I implemented the board logic using a 2D Integer Array (`Grid`). When a block is placed, the system 
                    checks row/column saturation. I used a `HashSet` to collect coordinates designated for clearing, 
                    preventing duplicate checks and allowing for O(N) efficient updates.
                </p>
            </div>

            <div className="finding-block">
                <h3>Dynamic Difficulty Adjustment</h3>
                <p>
                    I implemented a linear difficulty scaling algorithm. As the `level` increases, the delay in the 
                    `ScheduledExecutor` decreases (calculated via `12000 - 500 * level`). This required careful tuning 
                    to ensure the game remained playable but challenging at higher speeds.
                </p>
            </div>
        </section>
        <div className="cta-section">
            <a 
                href="https://github.com/atheesa/tetrecs" 
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

export default TetrECSPage;