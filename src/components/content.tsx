import CodeBlock from "./code-block"
import type { DocumentationSection } from "@/src/types/documentation"

interface ContentProps {
  data: DocumentationSection[]
  activeSection: string
}

export default function Content({ data, activeSection }: ContentProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold md:text-4xl">HindiC: Comprehensive Project Documentation</h1>

        {data.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className={`mb-12 scroll-mt-20 ${activeSection === section.id ? "active" : ""}`}
          >
            <h2 className="mb-4 text-2xl font-bold">{section.title}</h2>
            {section.content.map((item, index) => {
              if (item.type === "paragraph") {
                return (
                  <p key={index} className="mb-4 leading-7">
                    {item.text}
                  </p>
                )
              } else if (item.type === "code") {
                return (
                  <div key={index} className="mb-6">
                    <CodeBlock code={item.code} language={item.language || "c"} fileName={item.fileName} />
                  </div>
                )
              } else if (item.type === "list") {
                return (
                  <ul key={index} className="mb-6 ml-6 list-disc space-y-2">
                    {item.items.map((listItem, listIndex) => (
                      <li key={listIndex} className="leading-7">
                        {listItem}
                      </li>
                    ))}
                  </ul>
                )
              } else if (item.type === "subheading") {
                return (
                  <h3 key={index} className="mb-3 mt-6 text-xl font-semibold">
                    {item.text}
                  </h3>
                )
              }
              return null
            })}
          </section>
        ))}
      </div>
    </div>
  )
}

