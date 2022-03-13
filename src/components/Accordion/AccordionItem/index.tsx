import {
  HTMLAttributes,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { animated, useSpring } from "react-spring"
import accordionItemClasses from "./AccordionItem.module.scss"

export interface AccordionItemProps extends HTMLAttributes<HTMLDetailsElement> {
  serverUrl: string
}

export const AccordionItem = ({ children, serverUrl }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [contentHeight, setContentHeight] = useState(0.1)

  const { expandedHeight, nonExpandedHeight } = useMemo(() => {
    return {
      expandedHeight: 72 + contentHeight,
      nonExpandedHeight: 72,
    }
  }, [contentHeight])

  const detailsProps = useSpring({
    from: { height: isOpen ? nonExpandedHeight : expandedHeight },
    to: { height: isOpen ? expandedHeight : nonExpandedHeight },
  })

  useEffect(() => {
    const contentElement = document.getElementById(serverUrl)
    if (
      contentElement?.offsetHeight &&
      contentHeight < contentElement.offsetHeight
    )
      setContentHeight(contentElement.offsetHeight)
  })

  const handleToggle = useCallback((event: MouseEvent<HTMLDetailsElement>) => {
    event.preventDefault()
    setIsOpen((prevState) => !prevState)
  }, [])

  return (
    <animated.details
      aria-expanded={isOpen}
      className={accordionItemClasses.details}
      onClick={handleToggle}
      open={isOpen}
      role="button"
      style={detailsProps}
    >
      {children}
    </animated.details>
  )
}
