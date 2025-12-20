"use client"

import { useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"
import projects from "@/lib/projects.json"
import { ExternalLink, Github, ArrowLeft } from "lucide-react"
import { useState } from "react"

const GALLERY_ITEMS_PER_PAGE = 4

export default function ProjectDetailPage() {
  const params = useParams()
  const id = Number.parseInt(params.id as string)
  const project = projects.find((p) => p.id === id)
  const { t } = useLanguage()
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [displayedGalleryItems, setDisplayedGalleryItems] = useState(GALLERY_ITEMS_PER_PAGE)

  if (!project) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <Link href="/projects" className="text-primary hover:text-accent">
              Back to Projects
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const visibleGalleryItems = project.gallery?.slice(0, displayedGalleryItems) || []
  const hasMoreGallery = displayedGalleryItems < (project.gallery?.length || 0)

  const loadMoreGallery = () => {
    setDisplayedGalleryItems((prev) => prev + GALLERY_ITEMS_PER_PAGE)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          <article>
            <div className="mb-8">
              <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
              <p className="text-xl text-foreground/70">{project.description}</p>
            </div>

            <div className="relative h-96 mb-12 rounded-xl overflow-hidden border border-border">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-4">About This Project</h2>
                <p className="text-lg text-foreground/70 leading-relaxed">{project.longDescription}</p>
              </div>

              <div className="p-6 rounded-xl bg-muted/50 border border-border h-fit">
                <h3 className="text-xl font-bold mb-4">{t("project.technologies")}</h3>
                <div className="space-y-2">
                  {project.technologies.map((tech) => (
                    <div key={tech} className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Main Features</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.mainFeatures?.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs text-primary-foreground font-bold">✓</span>
                    </div>
                    <span className="text-foreground/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {project.gallery && project.gallery.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {visibleGalleryItems.map((image, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className="relative h-64 rounded-lg overflow-hidden cursor-pointer group border border-border hover:border-primary/50 transition-all"
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="text-white font-semibold">View Full</span>
                      </div>
                    </div>
                  ))}
                </div>

                {hasMoreGallery && (
                  <div className="text-center">
                    <button
                      onClick={loadMoreGallery}
                      className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
                    >
                      See More Photos
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                <ExternalLink className="w-5 h-5" />
                {t("project.viewLive")}
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
              >
                <Github className="w-5 h-5" />
                {t("project.viewCode")}
              </a>
            </div>
          </article>

          {/* Lightbox Modal */}
          {selectedImageIndex !== null && project.gallery && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
              <div className="relative max-w-4xl w-full">
                <button
                  onClick={() => setSelectedImageIndex(null)}
                  className="absolute top-4 right-4 text-white hover:text-accent transition-colors z-10"
                  aria-label="Close lightbox"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <img
                  src={project.gallery[selectedImageIndex] || "/placeholder.svg"}
                  alt={`Gallery ${selectedImageIndex + 1}`}
                  className="w-full h-auto rounded-lg"
                />

                <div className="flex justify-between items-center mt-4 text-white">
                  <button
                    onClick={() =>
                      setSelectedImageIndex(
                        selectedImageIndex === 0 ? project.gallery.length - 1 : selectedImageIndex - 1,
                      )
                    }
                    className="px-4 py-2 bg-primary/80 hover:bg-primary rounded-lg transition-colors"
                  >
                    Previous
                  </button>
                  <span className="text-sm">
                    {selectedImageIndex + 1} / {project.gallery.length}
                  </span>
                  <button
                    onClick={() => setSelectedImageIndex((selectedImageIndex + 1) % project.gallery.length)}
                    className="px-4 py-2 bg-primary/80 hover:bg-primary rounded-lg transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
