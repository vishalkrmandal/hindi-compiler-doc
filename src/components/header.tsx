import { Menu, Moon, Sun, Github } from "lucide-react"

interface HeaderProps {
  toggleSidebar: () => void
  toggleDarkMode: () => void
  isDarkMode: boolean
}

export default function Header({ toggleSidebar, toggleDarkMode, isDarkMode }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSidebar}
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">HindiC</span>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">v1.0</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/vishalkrmandal/Hostel-Management-System"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <button
            onClick={toggleDarkMode}
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </button>
        </div>
      </div>
    </header>
  )
}

