import { ReactNode } from "react"
import accordionItemClasses from "../AccordionItem/AccordionItem.module.scss"

export interface AccordionDetailProps {
  children: ReactNode
  serverUrl: string
}

export const AccordionDetail = ({
  children,
  serverUrl,
}: AccordionDetailProps) => {
  return (
    <div className={accordionItemClasses.content} id={serverUrl}>
      {children}
    </div>
  )
}
