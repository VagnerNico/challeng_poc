import { ReactNode } from "react"
import accordionClasses from "./Accordion.module.scss"
import { AccordionDetail } from "./AccordionDetail"
import { AccordionItem } from "./AccordionItem"
import { AccordionSummary } from "./AccordionSummary"

export interface AccordionProps {
  children: ReactNode
  title?: string
}

export const Accordion = ({ children, title }: AccordionProps) => {
  return (
    <div
      aria-label="Accordion Control Group Buttons"
      className={accordionClasses.container}
    >
      <h1 className="title">{title}</h1>
      {children}
    </div>
  )
}

Accordion.Detail = AccordionDetail
Accordion.Item = AccordionItem
Accordion.Summary = AccordionSummary
