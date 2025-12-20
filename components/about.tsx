"use client"

import { useLanguage } from "@/lib/language-context"
import settings from "@/lib/settings.json"

export const About = () => {
  const { language } = useLanguage()

  const aboutData = settings.about
  const isAr = language === "ar"

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-accent font-mono text-sm mb-4">// {isAr ? "عني" : "About Me"}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            {isAr
              ? aboutData.headingAr.split(aboutData.highlightAr)[0]
              : aboutData.headingEn.split(aboutData.highlightEn)[0]}
            <span className="text-accent">{isAr ? aboutData.highlightAr : aboutData.highlightEn}</span>
            {isAr
              ? aboutData.headingAr.split(aboutData.highlightAr)[1]
              : aboutData.headingEn.split(aboutData.highlightEn)[1]}
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">{isAr ? aboutData.introAr : aboutData.introEn}</p>
        </div>

        {/* Main Content - Left & Right Layout */}
        <div className="grid md:grid-cols-2 gap-12 mb-16 items-start">
          {/* Left Content */}
          <div className="space-y-6">
            <p className="text-foreground/80 leading-relaxed">
              {isAr ? aboutData.paragraphOneAr : aboutData.paragraphOneEn}
            </p>
            <p className="text-foreground/80 leading-relaxed">
              {isAr ? aboutData.paragraphTwoAr : aboutData.paragraphTwoEn}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-border">
              {aboutData.stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                    {isAr ? stat.numberAr : stat.numberEn}
                  </div>
                  <p className="text-sm text-foreground/60">{isAr ? stat.labelAr : stat.labelEn}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Code Block */}
          <div className="relative">
            <div className="bg-muted/50 border border-border rounded-xl overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-muted border-b border-border">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>

              {/* Code Content */}
              <div className="p-6 overflow-x-auto">
                <pre className="font-mono text-sm text-foreground/80 whitespace-pre-wrap break-words">
                  <code>{isAr ? aboutData.codeBlockAr : aboutData.codeBlockEn}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
