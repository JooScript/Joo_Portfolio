"use client"

import { useLanguage } from "@/lib/language-context"
import { Download, Sparkles } from "lucide-react"
import Link from "next/link"
import settings from "@/lib/settings.json"

export const Hero = () => {
  const { t } = useLanguage()
  const techStack = settings.skills.frontendTechs.concat(settings.skills.backendTechs).slice(0, 6)

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 pb-20">
      <div className="max-w-4xl mx-auto w-full">
        <div className="space-y-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-accent">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Available for freelance work</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="text-white">Hi, I'm </span>
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                John Doe
              </span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-white/90">Fullstack Developer</h2>
          </div>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            I craft beautiful, performant web applications with modern technologies. Passionate about clean code, user
            experience, and turning ideas into reality.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-semibold relative overflow-hidden rounded-[0_16px_16px_0] dark:rounded-[16px_0_0_16px] hover:shadow-lg hover:shadow-primary/50 hover:scale-105 transition-all"
            >
              View My Work
            </Link>
            <a
              href="/cv.pdf"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-accent/10 border border-accent text-accent font-semibold relative overflow-hidden rounded-[0_16px_16px_0] dark:rounded-[16px_0_0_16px] hover:bg-accent/20 transition-colors"
            >
              <Download className="w-5 h-5" />
              Download CV
            </a>
          </div>

          <div className="pt-16 space-y-6">
            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm font-mono">
              <span>//</span>
              <span>Tech I work with</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((tech) => (
                <div
                  key={tech}
                  className="px-4 py-2 bg-gray-800/50 border border-gray-700 text-gray-300 rounded-lg font-mono text-sm hover:border-accent/50 transition-colors"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
