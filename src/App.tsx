import { Accordion } from "./components/Accordion"
import { CustomAccordionDetail } from "./components/CustomAccordionDetail"

const availableUrls = [
  "https://thawing-springs-53971.herokuapp.com",
  "https://secret-lowlands-62331.herokuapp.com",
  "https://calm-anchorage-82141.herokuapp.com",
  "http://localhost:3002",
]

function App() {
  return (
    <Accordion title="Nodes">
      {availableUrls.map((url) => (
        <Accordion.Item key={url} serverUrl={url}>
          <Accordion.Summary altTitle="Unable to fetch" serverUrl={url} />
          <CustomAccordionDetail serverUrl={url} />
        </Accordion.Item>
      ))}
    </Accordion>
  )
}

export default App
