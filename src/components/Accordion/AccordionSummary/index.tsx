import accordionItemClasses from "../AccordionItem/AccordionItem.module.scss"
import { MdExpandMore } from "react-icons/md"
import { HTMLAttributes, useMemo } from "react"
import { SpinnerCircular } from "spinners-react"
import { useGetServerStatus } from "../../../hooks"

export interface AccordionSummaryProps extends HTMLAttributes<HTMLElement> {
  altTitle?: string
  isOpen?: boolean
  serverUrl: string
}

export const AccordionSummary = ({
  altTitle,
  isOpen = false,
  serverUrl,
}: AccordionSummaryProps) => {
  const { data, isError, isLoading } = useGetServerStatus({ serverUrl })

  const serverStatus = useMemo(() => {
    if (isLoading) {
      return "loading"
    } else if (isError) {
      return "offline"
    } else if (data) {
      return "online"
    } else {
      return "offline"
    }
  }, [data, isError, isLoading])

  return (
    <summary data-testid="accordion-summary">
      <div className={accordionItemClasses.firstSummaryElement}>
        {((!isLoading && isError) || (!isLoading && !data)) && (
          <span className="body1">{altTitle}</span>
        )}
        {!isLoading && data && <span className="body1">{data.node_name}</span>}
        {isLoading && (
          <SpinnerCircular data-testid="loading-indicator" size={24} />
        )}
        <span className="body2">{serverUrl}</span>
      </div>
      <div className={accordionItemClasses.secondSummaryElement}>
        <div className={accordionItemClasses.statusContainer}>
          <span
            className={`${accordionItemClasses.statusCircle} ${accordionItemClasses[serverStatus]}`}
          />
          <span className="overline">{serverStatus}</span>
        </div>
        <span>
          <MdExpandMore
            className={`${accordionItemClasses.chevron}${
              isOpen ? ` ${accordionItemClasses.rotate}` : ""
            }`}
            size="24"
          />
        </span>
      </div>
    </summary>
  )
}
