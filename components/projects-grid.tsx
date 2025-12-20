"use client"

import { useLanguage } from "@/lib/language-context"
import Link from "next/link"
import projects from "@/lib/projects.json"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import { useState } from "react"

const PROJECTS_PER_PAGE = 6

export const ProjectsGrid = () => {
  const { t } = useLanguage()
  const featured = projects.filter((p) => p.featured)
  const [displayedProjects, setDisplayedProjects] = useState(PROJECTS_PER_PAGE)

  const visibleProjects = featured.slice(0, displayedProjects)
  const hasMore = displayedProjects < featured.length

  const loadMore = () => {
    setDisplayedProjects((prev) => prev + PROJECTS_PER_PAGE)
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("projects.title")}</h2>
          <p className="text-xl text-foreground/60">{t("projects.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {visibleProjects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`} className="group h-full">
              <div className="relative overflow-hidden rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg h-full flex flex-col">
                <div className="relative h-64 overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-foreground/70 mb-4">{project.description}</p>
                  {project.mainFeatures && project.mainFeatures.length > 0 && (
                    <div className="mb-4 pb-4 border-b border-border">
                      <p className="text-sm font-semibold text-foreground/60 mb-2">Key Features:</p>
                      <div className="flex flex-wrap gap-2">
                        {project.mainFeatures.slice(0, 3).map((feature, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">
                            {feature}
                          </span>
                        ))}
                        {project.mainFeatures.length > 3 && (
                          <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">
                            +{project.mainFeatures.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-auto">
                    <button className="flex items-center gap-2 text-primary hover:text-accent transition-colors">
                      <ExternalLink className="w-4 h-4" />
                      {t("project.viewLive")}
                    </button>
                    <button className="flex items-center gap-2 text-primary hover:text-accent transition-colors">
                      <Github className="w-4 h-4" />
                      {t("project.viewCode")}
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {hasMore && (
          <div className="text-center mb-12">
            <button
              onClick={loadMore}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
            >
              See More Projects
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
          >
            View All Projects
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
