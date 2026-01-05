import TerminalWindow from "../../components/TerminalWindow";
import { Link } from "react-router-dom";
import "./GraphLangPage.css";

function GraphLangPage() {
  return (
    <>

      <div className="page-container">
        <div className="hero-section ">
<Link to="/#projects" className="back-link stagger-0">
        ← Back to Projects
    </Link>
          <h1 className="title">Graph Query Language (GQL)</h1>

          <div className="tech-badges">
            <span className="badge">Haskell</span>
            <span className="badge">Alex (Lexer)</span>
            <span className="badge">Happy (Parser)</span>
            <span className="badge">Compiler Design</span>
            <span className="badge">Formal Semantics</span>
          </div>

          <p className="intro-text">
            A domain-specific language (DSL) designed to query, manipulate, and
            analyze graph data structures stored in custom <code>.n4j</code>{" "}
            files. Unlike standard interpreters, this project implements a{" "}
            <strong>Step-wise State Machine</strong> (CEK-style) to evaluate
            queries, supporting complex pattern matching and traversals.
          </p>
        </div>

        <section className="section">
          <h2>Interactive Syntax Demo</h2>
          <p>
            The language supports declarative ASCII-art style relationships
            (similar to Cypher) but enforces strict schema validation.
          </p>

          <TerminalWindow>
            <div className="comment">
              # 1. Load a custom dataset (Parses .n4j file)
            </div>
            <div className="command">&gt; LOAD "social_network.n4j"</div>
            <div className="success">
              [SUCCESS] Loaded Graph: 500 Nodes, 1200 Edges.
            </div>
            <br />
            <div className="comment">
              # 2. Find "Friends" of "Alice" who are older than 25
            </div>
            <div className="command">
              &gt; MATCH (n:Person)-[:FRIEND]-&gt;(f:Person) WHERE n.name ==
              "Alice" AND f.age &gt; 25 RETURN f.name
            </div>
            <div className="output">--------------------------------</div>
            <div className="result">1. "Bob"</div>
            <div className="result">2. "Charlie"</div>
            <div className="result">3. "David"</div>
          </TerminalWindow>
        </section>

        <section className="section">
          <h2>Compiler Architecture</h2>
          <p>
            The execution pipeline follows a strict separation of concerns,
            featuring <strong>two distinct parsing pipelines</strong>: one for
            the query language and one for the database storage format.
          </p>

          <div className="architecture-diagram">
            <div className="arch-step">
              <h3>1. Dual Lexing/Parsing</h3>
              <span className="tool">Alex & Happy</span>
              <p>
                Separate grammars for <strong>Queries</strong> (
                <code>GraphGrammar.y</code>) and
                <strong>Data</strong> (<code>N4jGrammar.y</code>). This
                decouples the query logic from the storage format.
              </p>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-step">
              <h3>2. In-Memory Graph</h3>
              <span className="tool">Haskell ADT</span>
              <p>
                Data is loaded into a strongly-typed <code>DataGraph</code>{" "}
                structure containing validated <code>NodeGroups</code>.
              </p>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-step">
              <h3>3. Execution Engine</h3>
              <span className="tool">State Machine</span>
              <p>
                A recursive evaluator steps through the AST, managing
                Environment and Control states.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Custom Data Format (.n4j)</h2>
          <p>
            To support the engine, I designed a custom file format (`.n4j`)
            optimized for graph schemas. It separates **Node Headers** (schema
            definitions) from **Data Rows**, allowing for efficient type
            checking before loading.
          </p>

          <div className="code-block-container">
            <h3>The .n4j Grammar (Schema Definition)</h3>
            <p>
              The data files are parsed using a formal grammar that enforces
              types (String, Int, Bool) at the parser level.
            </p>
            <pre className="code-snippet">
              {`-- From N4jGrammar.y

-- A Graph file consists of Node Groups and Edge Groups
N4JFile : NewLines NodeGroups EdgeGroups    { DataGraph $2 $3 }

-- Defining a Node Group (Header + Data)
NodeGroup : NodeHeader NodeRows             { ($1, $2) }

-- Header defines the Schema (e.g., :ID, name:string, age:int)
NodeHeader : ColonID AttrDefs ColonLabel    { NodeHeader $2 }

AttrDef : String ':' StringType             { AttrNameType $1 PrimString }
        | String ':' IntType                { AttrNameType $1 PrimInt }
`}
            </pre>
          </div>

          <div className="code-block-container">
            <h3>The Loader (IO Monad)</h3>
            <p>
              The `readN4j` function acts as the bridge between the file system
              and the Haskell runtime, handling file I/O and lexing errors
              gracefully.
            </p>
            <pre className="code-snippet">
              {`-- From N4jReader.hs

readN4j :: String -> IO N4jGrammar.DataGraph
readN4j filePath = catch readN4j' handler where
    readN4j' = do
        sourceText' <- readFile filePath
        let sourceText = sourceText' ++ "\\n" -- Ensure valid termination
        
        -- Tokenize (Alex) & Parse (Happy)
        let lexedProb = alexScanTokens sourceText
        let parseProb = n4jParser lexedProb
        
        return parseProb

    -- Error Handling
    handler :: SomeException -> IO N4jGrammar.DataGraph
    handler e = error $ "Caught exception: " ++ show e
`}
            </pre>
          </div>
        </section>

        <section className="section">
          <h2>Engineering Deep Dive</h2>

          <div className="code-block-container">
            <h3>1. The Abstract Machine (State Management)</h3>
            <p>
              Instead of a simple recursive interpreter, I implemented a state
              machine inspired by
              <strong>CEK machines</strong>. The state tracks the{" "}
              <strong>Control</strong> (instruction),
              <strong>Environment</strong> (data), and{" "}
              <strong>Continuation</strong> (future work).
            </p>
            <pre className="code-snippet">
              {`-- From GraphEval.hs

-- The Machine State: (Control, Data/Result, LocalScope, ContinuationStack)
type State = (Control, Either Environment (TableHeader,[TableRecord]), [LocalEnvironmentNode], Kontinuation)

data Frame = FrameQuery [Clause]
           | FrameMatch GraphPatternExpr
           | FrameMatchWhere GraphPatternExpr BoolExpr
           | FrameMerge [SubGraph]

data Control = EvalQuery Query
             | EvalClause Clause
             | EvalMatch GraphPatternExpr
             | EvalComplete
`}
            </pre>
          </div>

          <div className="code-block-container">
            <h3>2. Step-Wise Evaluation Logic</h3>
            <p>
              The `step` function transitions the system from one state to the
              next. This pattern-matching approach ensures that every possible
              state of the query execution is handled deterministically.
            </p>
            <pre className="code-snippet">
              {`-- From GraphEval.hs

step :: State -> State
step (control, Left env, locEnvs, kon) = case (control, Left env, locEnvs, kon) of
    
    -- Case: Finished executing all clauses
    (EvalQuery (Q []), Left env, locEnvs, kon) -> 
        (EvalComplete, Left env, locEnvs, kon)

    -- Case: Execute a MATCH clause
    (EvalClause (ClsMatch graphPattern), Left env, locEnvs, (FrameQuery clauses):kon') -> 
        (EvalQuery (Q clauses), Left env'', locEnvs', kon') where
            (env', locEnv) = matchPatternExpr graphPattern env
            env'' = mergeEnvironment env' locEnv
            locEnvs' = locEnv : locEnvs
`}
            </pre>
          </div>

          <div className="code-block-container">
            <h3>3. Query Grammar Definition</h3>
            <p>
              The query language grammar (`.y`) defines the syntax for clauses
              like `MATCH`, `WHERE`, and `RETURN`. It supports complex nested
              patterns.
            </p>
            <pre className="code-snippet">
              {`-- From GraphGrammar.y

Clause : MATCH PatternExpr WHERE BoolExpr       { ClsMatchWhere $2 $4 }
       | MATCH PatternExpr                      { ClsMatch $2 }
       | MERGE SubGraphs                        { ClsMerge $2 }
       | SET Assignments                        { ClsSet $2 }
       | RETURN ReturnTypes                     { ClsReturn $2 }
       | DELETE Variables                       { ClsDelete $2 }

-- Recursive Pattern Matching Definition
Pattern : NodePattern                           { PtrnNode $1 }
        | NodePattern RelationPattern Pattern   { PtrnRel $1 $2 $3 }
`}
            </pre>
          </div>
        </section>

        <div className="cta-section">
            <a 
                href="https://github.com/atheesa/haskellQueryLanguage" 
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

export default GraphLangPage;
