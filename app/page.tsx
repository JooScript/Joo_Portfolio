import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { ProjectsGrid } from "@/components/projects-grid"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProjectsGrid />
        <About />
        <Skills />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
