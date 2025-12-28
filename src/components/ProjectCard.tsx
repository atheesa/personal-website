import "./ProjectCard.css"
import { Link } from "react-router-dom";

interface ProjectMeta {
    id:number;
    title: string;
    color: string;
    img: string;
}

interface ProjectMetaProps {
    projectMeta: ProjectMeta
}
function ProjectCard({projectMeta} : ProjectMetaProps ) {

    return (
    <Link className="project-card-link" to={`/project/${projectMeta.id}`}>
    <div className="project-container">
      <div className="card-content">
        <h2>{projectMeta.title}</h2>
      
        <div className="project-link-button">View Project</div>
      </div>

      <div className="project-preview unstyled-button">
        <img src={projectMeta.img} alt={projectMeta.title} />
        <div className="preview-info">
          <span>Click to see more</span>
        </div>
      </div>
      </div>
    </Link>
    )
}

export default ProjectCard 