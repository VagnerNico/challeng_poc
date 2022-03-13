import { render } from "@testing-library/react"
import { Accordion } from "./"

describe("<App />", () => {
  test("Renders with no errors", () => {
    const { getByLabelText } = render(
      <Accordion>
        <span>Test content</span>
      </Accordion>
    )

    expect(getByLabelText("Accordion Control Group Buttons")).toBeTruthy()
  })

  test("Should render with a title", () => {
    const { getByText } = render(
      <Accordion title="Test Title">
        <span>Test content</span>
      </Accordion>
    )
    expect(getByText("Test Title")).toBeTruthy()
  })
})
