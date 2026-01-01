import { ProjectCaseStudyCard } from '~/app/(main)/projects/ProjectCaseStudyCard'
import { getSettings } from '~/sanity/queries'

export async function Projects() {
  const projects = (await getSettings())?.projects || []

  return (
    <div className="space-y-8">
      {projects.map((project) => (
        <ProjectCaseStudyCard project={project} key={project._id} />
      ))}
    </div>
  )
}
