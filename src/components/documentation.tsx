"use client"

import { useState, useEffect } from "react"
import Sidebar from "./sidebar"
import Content from "./content"
import Header from "./header"
import { documentationData } from "@/src/data/documentation-data"

export default function Documentation() {
  const [activeSection, setActiveSection] = useState("project-overview")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    }

    // Handle scroll to update active section
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")

      let currentSection = "project-overview"
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        if (sectionTop < 100) {
          currentSection = section.id
        }
      })

      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <Header toggleSidebar={toggleSidebar} toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isOpen={isSidebarOpen}
          closeSidebar={() => setIsSidebarOpen(false)}
        />
        <Content data={documentationData} activeSection={activeSection} />
      </div>
    </div>
  )
}

