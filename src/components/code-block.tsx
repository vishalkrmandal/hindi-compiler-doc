"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism"

interface CodeBlockProps {
  code: string
  language: string
  fileName?: string
}

export default function CodeBlock({ code, language, fileName }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="rounded-lg overflow-hidden border border-border">
      {fileName && <div className="bg-muted px-4 py-2 text-sm font-medium border-b border-border">{fileName}</div>}
      <div className="relative">
        <button
          onClick={copyToClipboard}
          className="absolute right-2 top-2 rounded-md p-1.5 bg-background/80 backdrop-blur-sm hover:bg-accent transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </button>
        <div className="dark:hidden">
          <SyntaxHighlighter
            language={language}
            style={vs}
            customStyle={{
              margin: 0,
              padding: "1rem",
              fontSize: "0.875rem",
              lineHeight: 1.5,
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
        <div className="hidden dark:block">
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: "1rem",
              fontSize: "0.875rem",
              lineHeight: 1.5,
              background: "#1e1e2e",
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  )
}

