import "./ProjectCard.css"
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
    <div className="project-container">
      <div className="card-content">
        <h3>{projectMeta.title}</h3>
        <button className="project-link-button">View Project</button>
      </div>

      <div className="project-preview">
        <img src={projectMeta.img} alt={projectMeta.title} />
        <div className="preview-info">
          <span>Click to see more</span>
        </div>
      </div>
    </div>
    )
}

export default ProjectCard 