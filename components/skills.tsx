"use client"

import { useLanguage } from "@/lib/language-context"
import { Code2, Database, Wrench } from "lucide-react"

export const Skills = () => {
  const { t } = useLanguage()

  const skillsData = [
    {
      category: t("skills.frontend"),
      icon: Code2,
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    },
    {
      category: t("skills.backend"),
      icon: Database,
      skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "GraphQL"],
    },
    {
      category: t("skills.tools"),
      icon: Wrench,
      skills: ["Git", "Docker", "AWS", "Vercel", "CI/CD"],
    },
  ]

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">{t("about.title")}</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {skillsData.map((skill) => {
            const Icon = skill.icon
            return (
              <div
                key={skill.category}
                className="p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all"
              >
                <Icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-6">{skill.category}</h3>
                <ul className="space-y-3">
                  {skill.skills.map((s) => (
                    <li key={s} className="text-foreground/70 flex items-center gap-2">
                      <span className="w-2 h-2 bg-accent rounded-full" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
