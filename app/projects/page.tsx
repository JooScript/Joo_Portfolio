"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"
import projects from "@/lib/projects.json"
import { ExternalLink, Github, ArrowLeft } from "lucide-react"

export default function ProjectsPage() {
  const { t } = useLanguage()

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <div className="mb-16">
            <h1 className="text-5xl font-bold mb-4">{t("projects.title")}</h1>
            <p className="text-xl text-foreground/60">{t("projects.subtitle")}</p>
          </div>

          <div className="grid gap-8">
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`} className="group">
                <div className="grid md:grid-cols-3 gap-6 p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all hover:shadow-lg">
                  <div className="relative h-64 md:h-auto rounded-lg overflow-hidden bg-muted">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="md:col-span-2 flex flex-col justify-between">
                    <div>
                      <h2 className="text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-lg text-foreground/70 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4">
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
        </div>
      </main>
      <Footer />
    </>
  )
}
