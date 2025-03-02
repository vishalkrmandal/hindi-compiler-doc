"use client"

import { X } from "lucide-react"
import { useEffect, useRef } from "react"

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
  isOpen: boolean
  closeSidebar: () => void
}

export default function Sidebar({ activeSection, setActiveSection, isOpen, closeSidebar }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        closeSidebar()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, closeSidebar])

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    closeSidebar()
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" />}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-50 w-72 transform overflow-y-auto bg-background p-6 shadow-lg transition-transform duration-200 md:sticky md:top-16 md:z-0 md:h-[calc(100vh-4rem)] md:translate-x-0 md:border-r md:border-border md:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-6 md:hidden">
          <h2 className="text-xl font-bold">Navigation</h2>
          <button
            onClick={closeSidebar}
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </button>
        </div>

        <nav className="space-y-1">
          <div className="mb-4">
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">Documentation</h3>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => handleNavClick("project-overview")}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    activeSection === "project-overview"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  Project Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("file-structure")}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    activeSection === "file-structure"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  File Structure
                </button>
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">Compiler Components</h3>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => handleNavClick("lexical-analyzer")}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    activeSection === "lexical-analyzer"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  Lexical Analyzer
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("parser")}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    activeSection === "parser"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  Parser
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("abstract-syntax-tree")}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    activeSection === "abstract-syntax-tree"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  Abstract Syntax Tree
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("semantic-analyzer")}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    activeSection === "semantic-analyzer"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  Semantic Analyzer
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("code-generator")}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    activeSection === "code-generator"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  Code Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("main-program")}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    activeSection === "main-program"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  Main Program
                </button>
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">Usage</h3>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => handleNavClick("building-and-running")}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    activeSection === "building-and-running"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  Building and Running
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("example-programs")}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    activeSection === "example-programs"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  Example Programs
                </button>
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">Advanced</h3>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => handleNavClick("implementation-challenges")}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    activeSection === "implementation-challenges"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  Implementation Challenges
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("future-improvements")}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    activeSection === "future-improvements"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  Future Improvements
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  )
}

