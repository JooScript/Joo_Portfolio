"use client"

import type React from "react"

import { useLanguage } from "@/lib/language-context"
import { Mail, Phone, Send } from "lucide-react"
import { useState } from "react"
import settings from "@/lib/settings.json"

export const ContactForm = () => {
  const { t, language } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })
    setTimeout(() => setSubmitted(false), 3000)
  }

  const isAr = language === "ar"

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("contact.title")}</h2>
          <p className="text-xl text-foreground/60">
            {isAr ? settings.contact.subtitleAr : settings.contact.subtitleEn}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-2xl mx-auto">
          {/* Email Card */}
          <div className="p-6 rounded-xl bg-muted/50 border border-border hover:border-accent/50 transition-colors">
            <Mail className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-xl font-bold mb-2">{t("contact.emailLabel")}</h3>
            <a
              href={`mailto:${settings.social.email}`}
              className="text-foreground/70 hover:text-accent transition-colors"
            >
              {settings.social.email}
            </a>
          </div>

          {/* Phone Card */}
          <div className="p-6 rounded-xl bg-muted/50 border border-border hover:border-accent/50 transition-colors">
            <Phone className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-xl font-bold mb-2">{t("contact.phoneLabel")}</h3>
            <a href={`tel:${settings.social.phone}`} className="text-foreground/70 hover:text-accent transition-colors">
              {settings.social.phone}
            </a>
          </div>
        </div>

        <div className="max-w-2xl mx-auto relative">
          {/* Left Triangle */}
          <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-r-0 border-t-8 border-b-8 border-l-primary border-t-transparent border-b-transparent hidden lg:block" />

          {/* Right Triangle */}
          <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-0 h-0 border-r-8 border-l-0 border-t-8 border-b-8 border-r-primary border-t-transparent border-b-transparent hidden lg:block" />

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="p-8 rounded-xl bg-muted/30 border border-border space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">{isAr ? "الاسم" : "Name"}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent focus:outline-none transition-colors"
                  placeholder={isAr ? "اسمك" : "Your name"}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">{isAr ? "البريد الإلكتروني" : "Email"}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent focus:outline-none transition-colors"
                  placeholder={isAr ? "بريدك الإلكتروني" : "Your email"}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{isAr ? "الموضوع" : "Subject"}</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent focus:outline-none transition-colors"
                placeholder={isAr ? "موضوع المشروع" : "Project subject"}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{isAr ? "الرسالة" : "Message"}</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent focus:outline-none transition-colors resize-none"
                placeholder={isAr ? "رسالتك" : "Your message"}
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-orange-500/50 transition-all hover:scale-105 active:scale-95"
            >
              <Send className="w-5 h-5" />
              {isAr ? "إرسال الرسالة" : "Send Message"}
            </button>

            {submitted && (
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/50 text-green-400">
                {isAr ? "شكراً! تم إرسال رسالتك بنجاح." : "Thank you! Your message has been sent successfully."}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
