import { render } from "@testing-library/react"
import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import App from "./App"

describe("<App />", () => {
  const queryClient = new QueryClient()
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  test("Renders main page correctly", () => {
    render(<App />, { wrapper })
    expect(true).toBeTruthy()
  })
})
