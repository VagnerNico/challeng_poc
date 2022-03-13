import { useGetServerBlocks, useGetServerStatus } from "../hooks"
import { Accordion } from "./Accordion"
import customAccordionDetailClasses from "./CustomAccordionDetail.module.scss"

export interface CustomAccordionDetailProps {
  serverUrl: string
}

export const CustomAccordionDetail = ({
  serverUrl,
}: CustomAccordionDetailProps) => {
  const { data: serverStatus } = useGetServerStatus({ serverUrl })
  const { data } = useGetServerBlocks(
    { serverUrl },
    { enabled: !!serverStatus }
  )

  return (
    <Accordion.Detail serverUrl={serverUrl}>
      {data?.data.map((block) => (
        <div
          className={`${customAccordionDetailClasses.contentChild} medium`}
          key={block.attributes.timestamp}
        >
          <span className={customAccordionDetailClasses.contentChildId}>
            {block.id}
          </span>
          <span>{block.attributes.data}</span>
        </div>
      ))}
    </Accordion.Detail>
  )
}
