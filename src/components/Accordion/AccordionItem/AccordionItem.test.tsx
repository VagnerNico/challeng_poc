import { fireEvent, render } from "@testing-library/react"
import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { AccordionItem } from "./"

describe("<AccordionItem />", () => {
  const queryClient = new QueryClient()
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  afterEach(() => {
    queryClient.clear()
  })

  test("Renders with no errors", () => {
    const { getByRole } = render(<AccordionItem />, { wrapper })

    expect(getByRole("button")).toBeTruthy()
  })

  test("Should expand when clicked", () => {
    const { getByRole } = render(<AccordionItem />, { wrapper })

    const button = getByRole("button")

    fireEvent.click(button)

    expect(button).toHaveAttribute("aria-expanded", "true")
  })
})
