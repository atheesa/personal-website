import Header from "../../components/Header";
import TerminalWindow from "../../components/TerminalWindow";
import { Link } from "react-router-dom";
import "./OrchestraPage.css";

function OrchestraPage() {
  return (
    <>
      <Header />
      
      <div className="page-container">
        
        <div className="hero-section">
            <Link to="/" className="back-link">← Back to Projects</Link>
            
            <h1 className="title">Java MIDI Orchestra Simulator</h1>
            <h2 className="subtitle">Object-Oriented Design • Audio Synthesis • Custom File Parsing</h2>
            
            <div className="tech-badges">
                <span className="badge highlight-badge">Software Engineering Coursework</span>
                <span className="badge">Java 17</span>
                <span className="badge">javax.sound.midi</span>
                <span className="badge">Polymorphism</span>
                <span className="badge">Factory Pattern</span>
            </div>

            <p className="intro-text">
              A comprehensive simulation engine that models a real-world orchestra. 
              The system parses custom music sheet files, assigns musicians to a limited number of seats 
              using <strong>HashMap-based resource management</strong>, and conducts a synchronized playback 
              using the <strong>Java MIDI Synthesizer</strong>.
            </p>
        </div>

        <section className="section">
            <h2>Object-Oriented Architecture</h2>
            <div className="stat-grid">
                <div className="stat-card">
                    <h3>Polymorphic Design</h3>
                    <p>
                        The core utilizes a strict <code>Musician</code> interface implemented by specific classes 
                        (<code>Violinist</code>, <code>Cellist</code>, <code>Pianist</code>). This allows the 
                        <code>Orchestra</code> controller to treat all instruments generically during the playback loop.
                    </p>
                </div>
                <div className="stat-card">
                    <h3>Resource Management</h3>
                    <p>
                        The orchestra has a physical limit (16 seats). I implemented a <code>HashMap&lt;Integer, Musician&gt;</code> 
                        seating system that handles collision detection (`sitDown` returns error codes) and ensures efficient O(1) lookup during performance.
                    </p>
                </div>
                <div className="stat-card">
                    <h3>Data Persistence</h3>
                    <p>
                        I engineered a custom <code>Reader</code> class that parses plain text files into complex 
                        <code>Composition</code> and <code>MusicSheet</code> objects, dynamically mapping string-based 
                        note names (e.g., "C#4") to integer MIDI codes.
                    </p>
                </div>
            </div>
        </section>

        <section className="section">
            <h2>Code Highlight: The Musician Interface</h2>
            <p>
                This interface defines the contract for all performers. It separates the <em>score reading logic</em> 
                from the <em>sound production logic</em>, adhering to the <strong>Single Responsibility Principle</strong>.
            </p>
            
            <TerminalWindow>
                <div className="comment">// From src/people/musicians/Musician.java</div>
                <div className="code-line"><span className="keyword">public interface</span> Musician {'{'}</div>
                <div className="code-line"></div>
                <div className="code-line">  <span className="comment">/** Returns unique instrument ID for MIDI mapping */</span></div>
                <div className="code-line">  <span className="keyword">int</span> getInstrumentID();</div>
                <div className="code-line"></div>
                <div className="code-line">  <span className="comment">/** Assigns the seat in the sound system */</span></div>
                <div className="code-line">  <span className="keyword">void</span> setSeat(<span className="keyword">int</span> seat);</div>
                <div className="code-line"></div>
                <div className="code-line">  <span className="comment">/** Loads the specific notes and dynamics (piano/forte) */</span></div>
                <div className="code-line">  <span className="keyword">void</span> readScore(<span className="keyword">int</span>[] notes, <span className="keyword">boolean</span> soft);</div>
                <div className="code-line"></div>
                <div className="code-line">  <span className="comment">/** Triggers the next note in the sequence via SoundSystem */</span></div>
                <div className="code-line">  <span className="keyword">void</span> playNextNote();</div>
                <div className="code-line">{'}'}</div>
            </TerminalWindow>
        </section>

        <section className="section">
            <h2>Complex File Parsing Logic</h2>
            <p>
                The `Reader` class manually tokenizes raw text files to reconstruct the musical composition. 
                It handles edge cases like whitespace normalization, nested instrument blocks, and dynamic tempo assignment.
            </p>

            <TerminalWindow>
                <div className="comment">// From src/Reader.java</div>
                <div className="code-line"><span className="keyword">public</span> HashSet&lt;Composition&gt; compositionReader() {'{'}</div>
                <div className="code-line">    <span className="comment">// Scanner loop to process file line-by-line</span></div>
                <div className="code-line">    <span className="keyword">while</span> (myReader.hasNextLine()) {'{'}</div>
                <div className="code-line">        line = myReader.nextLine().replaceAll(<span className="string">"\\s+"</span>, <span className="string">""</span>);</div>
                <div className="code-line">        </div>
                <div className="code-line">        <span className="comment">// Parsing header metadata (Name, Tempo, Length)</span></div>
                <div className="code-line">        <span className="keyword">if</span> (line.contains(<span className="string">"Name"</span>)) name = strings[1];</div>
                <div className="code-line">        <span className="keyword">if</span> (line.contains(<span className="string">"Tempo"</span>)) tempo = strings[1];</div>
                <div className="code-line">        </div>
                <div className="code-line">        <span className="comment">// Instantiating the composition object once metadata is complete</span></div>
                <div className="code-line">        <span className="keyword">if</span> (isHeaderComplete()) {'{'}</div>
                <div className="code-line">            musicSheet = <span className="keyword">new</span> MusicSheet(name, tempo, Integer.parseInt(length));</div>
                <div className="code-line">            compositionHashSet.add(musicSheet);</div>
                <div className="code-line">        {'}'}</div>
                <div className="code-line">    {'}'}</div>
                <div className="code-line">{'}'}</div>
            </TerminalWindow>
        </section>

        <section className="section">
            <h2>Audio Synthesis Engine</h2>
            <p>
                The `SoundSystem` class acts as a wrapper around the low-level `javax.sound.midi` library. 
                It manages 16 distinct MIDI channels, allowing the orchestra to play multiple instruments simultaneously (polyphony) 
                without channel collisions.
            </p>
            <div className="finding-block">
                <h3>Hardware Interaction</h3>
                <p>
                    The system directly interacts with the OS soundbank (`MidiSystem.getSynthesizer()`). 
                    It loads instrument patches (e.g., Cello = 42, Violin = 40) dynamically into the synthesizer channels based 
                    on the musician currently assigned to that seat.
                </p>
            </div>
        </section>

      </div>
    </>
  );
}

export default OrchestraPage;