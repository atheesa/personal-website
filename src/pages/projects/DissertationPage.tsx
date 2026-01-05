import Header from "../../components/Header";
import JupyterNotebook from "../../components/JupyterNotebook";
import { Link } from "react-router-dom";
import "./DissertationPage.css";

function DissertationPage() {
  return (
    <>
      
      <div className="page-container">
        
        <div className="hero-section">
            <Link to="/" className="back-link">← Back to Projects</Link>
            
            <h1 className="title">Predictive Scientometrics & Fraud Detection</h1>
            <h2 className="subtitle">Early Identification of Retracted Papers using Graph Neural Networks & NLP</h2>
            
            <div className="tech-badges">
                <span className="badge highlight-badge">Dissertation</span>
                <span className="badge highlight-badge">Machine Learning</span>
                <span className="badge">Python (Pandas/Scikit-Learn)</span>
                <span className="badge">Graph Theory (NetworkX)</span>
                <span className="badge">NLP (SBERT Transformers)</span>
                <span className="badge">Ensemble Learning</span>
            </div>

            <div className="download-container">
                <a href="/report.pdf" download="Retraction_Prediction_Report.pdf" className="download-button primary">
                    📄 Download Final Report (PDF)
                </a>
                <a href="/P3_Viva.pdf" download="Retraction_Viva_Slides.pdf" className="download-button secondary">
                    📊 Download Viva Presentation (PDF)
                </a>
            </div>

            <p className="intro-text">
              An advanced machine learning research project tackling the "Retraction Crisis" in academia. 
              By leveraging <strong>Scientometrics</strong>, I engineered a novel fraud detection pipeline that integrates 
              <strong> Citation Network Analysis</strong> (PageRank, Betweenness Centrality) with <strong>Semantic Textual Embeddings</strong> (TF-IDF, Word2Vec, SBERT).
              The project also introduced "Meta-Net," a custom graph architecture designed to capture latent semantic relationships between unconnected papers.
            </p>
        </div>

        <section className="section">
            <h2>Algorithmic Complexity</h2>
            <div className="stat-grid">
                <div className="stat-card">
                    <h3>Graph Theory</h3>
                    <p>Constructed massive directed graphs with over <strong>9.8 Million Nodes</strong> and <strong>18.1 Million Edges</strong> to model citation flows.</p>
                </div>
                <div className="stat-card">
                    <h3>NLP Pipelines</h3>
                    <p>Compared <strong>TF-IDF</strong>, <strong>Word2Vec</strong> (Skip-Gram), and <strong>SBERT Transformers</strong> to quantify abstract semantics.</p>
                </div>
                <div className="stat-card">
                    <h3>Ensemble Models</h3>
                    <p>Trained and tuned <strong>Gradient Boosting</strong> and <strong>Random Forest</strong> classifiers, optimizing for non-linear feature interactions.</p>
                </div>
            </div>
        </section>

        <section className="section">
            <h2>The "Meta-Net" Architecture (Novel Contribution)</h2>
            <p>
                To overcome the limitations of sparse citation graphs in new papers, I designed and implemented 
                <strong>"Meta-Net,"</strong> a novel inferred-network structure. Unlike standard graphs that rely on explicit citations, 
                Meta-Net constructs edges based on <strong>Semantic Similarity</strong>.
            </p>
            
            <JupyterNotebook>
                <div className="cell-input">
                    <span className="prompt">In [4]:</span>
                    <pre className="code">
{`from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import networkx as nx

# 1. Generate Dense Vector Embeddings (SBERT)
# Transforming raw abstracts into 768-dimensional semantic vectors
model = SentenceTransformer('all-MiniLM-L6-v2')
embeddings = model.encode(papers['abstract'].tolist())

# 2. Construct the "Meta-Net" Graph
# We compute pairwise Cosine Similarity to infer latent edges
# Edge Weight = (CosineSim * w_a) + (SubjectMatch * w_s)
similarity_matrix = cosine_similarity(embeddings)

meta_net = nx.Graph()
for i in range(len(papers)):
    # Find K-Nearest Semantic Neighbors
    neighbors = get_k_nearest(similarity_matrix[i], k=5)
    for j in neighbors:
        weight = calculate_custom_weight(i, j, w_abstract=0.7, w_subject=0.3)
        meta_net.add_edge(i, j, weight=weight)`}
                    </pre>
                </div>
                <div className="cell-output">
                    <span className="prompt">Out [4]:</span>
                    <pre className="output">
{`<networkx.classes.graph.Graph at 0x7f8b1c2d3a90>
Generated Meta-Net: 12,000 Nodes, 60,000 Weighted Semantic Edges.`}
                    </pre>
                </div>
            </JupyterNotebook>
        </section>

        <section className="section">
            <h2>Network Topology & Feature Engineering</h2>
            <p>
                The model's predictive power relied on extracting complex topological features from the citation graph. 
                I calculated centrality measures to determine a paper's "Authority" and "Hub" scores within the scientific community.
            </p>
            
            <div className="finding-block">
                <h3>1. PageRank & Betweenness Centrality</h3>
                <p>
                    I implemented <strong>PageRank</strong> (stochastic iterative algorithm) to measure node influence and 
                    <strong> Betweenness Centrality</strong> to identify papers that act as information bridges. 
                    Hypothesis: Retracted papers often exist in "echo chambers" with high clustering coefficients but low global centrality.
                </p>
            </div>

            <div className="finding-block">
                <h3>2. Temporal Trajectory Analysis</h3>
                <p>
                    Beyond static snapshots, I analyzed the <strong>Citation Rate</strong>  to normalize for temporal bias. 
                    We utilized Log-Transformation and Z-Score Normalization to stabilize the high variance in citation counts.
                </p>
            </div>
            
            <div className="finding-block">
                <h3>3. Feature Sensitivity & Bias Discovery</h3>
                <p>
                   During Principal Component Analysis (PCA) and feature importance evaluation, I identified a massive 
                   <strong> Geographic Bias</strong>. China and India accounted for 65.44% of retractions. 
                   While including "Country" improved accuracy to <strong>91%</strong>, I argued in my thesis that this introduces 
                   algorithmic prejudice, and I proposed a "Country-Agnostic" model for ethical deployment.
                </p>
            </div>
        </section>

        <section className="section">
            <h2>Model Performance & Evaluation</h2>
            <p>
                I evaluated models using <strong>10-Fold Cross-Validation</strong> to ensure robustness. 
                The <strong>Random Forest (Ensemble)</strong> model consistently outperformed single classifiers, 
                successfully capturing non-linear relationships between metadata and network metrics.
            </p>
            <table className="results-table">
                <thead>
                    <tr>
                        <th>Algorithm</th>
                        <th>Feature Set</th>
                        <th>Accuracy</th>
                        <th>ROC-AUC</th>
                        <th>F1-Score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Random Forest</strong></td>
                        <td><strong>Journal Metadata</strong></td>
                        <td><strong>91%</strong></td>
                        <td><strong>0.91</strong></td>
                        <td>0.91</td>
                    </tr>
                    <tr>
                        <td><strong>Gradient Boosting</strong></td>
                        <td>Citation Network</td>
                        <td>81%</td>
                        <td>0.81</td>
                        <td>0.81</td>
                    </tr>
                    <tr>
                        <td><strong>Random Forest</strong></td>
                        <td>Abstract (Bag-of-Words)</td>
                        <td>81%</td>
                        <td>0.81</td>
                        <td>0.82</td>
                    </tr>
                    <tr>
                        <td><strong>Logistic Regression</strong></td>
                        <td>Abstract (TF-IDF)</td>
                        <td>75%</td>
                        <td>0.75</td>
                        <td>0.77</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section className="section">
            <h2>Future Research Directions</h2>
            <p>
                My research laid the groundwork for using <strong>Temporal Graph Neural Networks (GNNs)</strong> for fraud detection.
                Future iterations will integrate <strong>SPECTER 2.0</strong> embeddings to improve the semantic resolution of the Meta-Net
                and utilize <strong>CTPIR</strong> frameworks to model citation trajectory decay in real-time.
            </p>
        </section>

                <div className="cta-section">
            <a 
                href="https://github.com/atheesa/part3-research-project" 
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

export default DissertationPage;