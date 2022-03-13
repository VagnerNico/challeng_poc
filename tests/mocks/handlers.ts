import { rest } from "msw"
import { BLOCKS_END_POINT, STATUS_END_POINT } from "../../src/constants"

export default [
  rest.get(`https://dummy-url/${STATUS_END_POINT}`, (_req, res, ctx) => {
    return res(
      ctx.json({
        node_name: "Dummy Name",
      }),
      ctx.status(200)
    )
  }),
  rest.get(`https://dummy-url/${BLOCKS_END_POINT}`, (_req, res, ctx) => {
    return res(
      ctx.json({
        data: [
          {
            id: "1",
            type: "block",
            attributes: {
              timestamp: 11223344,
              data: "Block 1 content",
            },
          },
          {
            id: "2",
            type: "block",
            attributes: {
              timestamp: 233112234,
              data: "Block 2 content",
            },
          },
        ],
      }),
      ctx.status(200)
    )
  }),
]
