import { render } from "@testing-library/react"
import { renderHook } from "@testing-library/react-hooks"
import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { useGetServerStatus } from "../../../hooks"
import { AccordionSummary } from "./"
import { rest } from "msw"
import { server } from "../../../../tests/mocks/server"
import { STATUS_END_POINT } from "../../../constants"
import { act } from "react-test-renderer"

describe("<AccordionItem />", () => {
  const queryClient = new QueryClient()
  const serverUrl = "https://dummy-url"
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  afterEach(() => {
    queryClient.clear()
  })

  test("Renders with no errors", async () => {
    const { getAllByTestId } = render(
      <AccordionSummary serverUrl={serverUrl} />,
      {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      }
    )

    expect(getAllByTestId("accordion-summary")).toBeTruthy()
  })

  test("Should fetch and render data from API", async () => {
    const { result, waitFor } = renderHook(
      () => useGetServerStatus({ serverUrl }),
      { wrapper }
    )

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data?.node_name).toEqual("Dummy Name")
  })

  test("Should get a loading state", async () => {
    server.use(
      rest.get(`${serverUrl}/${STATUS_END_POINT}`, (_req, res, ctx) => {
        setTimeout(() => {
          return res(ctx.status(200))
        }, 2000)
      })
    )

    const { getByTestId } = render(<AccordionSummary serverUrl={serverUrl} />, {
      wrapper,
    })

    const loadingElement = getByTestId("loading-indicator")

    expect(loadingElement).toBeTruthy()
  })

  // test("Renders altTitle if api return some error", async () => {
  //   server.use(
  //     rest.get(`${serverUrl}/${STATUS_END_POINT}`, (_req, res, ctx) => {
  //       return res(ctx.status(500))
  //     })
  //   )

  //   const { findByText } = render(
  //     <AccordionSummary
  //       altTitle="Dummy Name Alternative"
  //       serverUrl={serverUrl}
  //     />,
  //     {
  //       wrapper,
  //     }
  //   )

  //   const altTitle = await findByText("Dummy Name Alternative")

  //   expect(altTitle).toBeTruthy()
  // })

  // test("Renders altTitle if api return no data", async () => {
  //   server.use(
  //     rest.get(`${serverUrl}/${STATUS_END_POINT}`, (_req, res, ctx) => {
  //       return res(ctx.status(200))
  //     })
  //   )

  //   const { findByText } = render(
  //     <AccordionSummary
  //       altTitle="Dummy Name Alternative"
  //       serverUrl={serverUrl}
  //     />,
  //     {
  //       wrapper,
  //     }
  //   )

  //   const altTitle = await findByText("Dummy Name Alternative")

  //   expect(altTitle).toBeTruthy()
  // })
})
