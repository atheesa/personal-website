import "./ProjectCard.css"
import { Link } from "react-router-dom";

export interface ProjectMeta {
    id: number;
    title: string;
    color: string;
    img: string;
    description: string;
}

interface ProjectMetaProps {
    projectMeta: ProjectMeta
}

function ProjectCard({ projectMeta }: ProjectMetaProps) {

    return (
        <Link className="project-card-link" to={`/project/${projectMeta.id}`}>
            <div className="project-container">
                
                <div className="card-content">
                    <h2 className="project-title">{projectMeta.title}</h2>
                    <div className="project-link-button">View Project</div>
                </div>

                <div className="project-preview unstyled-button">
   
                    
                    <div className="description-box">
                        <p>{projectMeta.description}</p>
                    </div>

                    <span className="preview-hint">Click to see more</span>
                </div>
                
            </div>
        </Link>
    )
}

export default ProjectCard