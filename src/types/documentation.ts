export interface DocumentationContentItem {
  type: "paragraph" | "code" | "list" | "subheading"
  text?: string
  code?: string
  language?: string
  fileName?: string
  items?: string[]
}

export interface DocumentationSection {
  id: string
  title: string
  content: DocumentationContentItem[]
}

