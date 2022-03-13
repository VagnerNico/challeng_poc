import { QueryKey, useQuery, UseQueryOptions } from "react-query"
import { BLOCKS_END_POINT, STATUS_END_POINT } from "../constants"

export interface GetServerStatusResponse {
  node_name: string
}

export interface GetServerStatusQueryVariables {
  serverUrl: string
}

const getServerStatus = async ({
  serverUrl,
}: GetServerStatusQueryVariables) => {
  const response = await fetch(`${serverUrl}/${STATUS_END_POINT}`, {
    method: "GET",
  })
  if (!response.ok) throw new Error(response.statusText)
  const json = await response.json()
  return json
}

export const useGetServerStatus = (
  { serverUrl }: GetServerStatusQueryVariables,
  options?: UseQueryOptions<
    GetServerStatusResponse,
    Error,
    GetServerStatusResponse,
    QueryKey
  >
) => {
  return useQuery<
    GetServerStatusResponse,
    Error,
    GetServerStatusResponse,
    QueryKey
  >(
    `${serverUrl}/${STATUS_END_POINT}`,
    () => getServerStatus({ serverUrl }),
    options
  )
}

export interface ServerBlock {
  id: string
  type: string
  attributes: {
    index: number
    timestamp: number
    data: string
    "previous-hash": string
    hash: string
  }
}

export interface GetServerBlocksResponse {
  data: Array<ServerBlock>
}

export interface GetServerBlocksQueryVariables {
  serverUrl: string
}

const getServerBlocks = async ({
  serverUrl,
}: GetServerStatusQueryVariables) => {
  const response = await fetch(`${serverUrl}/${BLOCKS_END_POINT}`, {
    method: "GET",
  })
  if (!response.ok) throw new Error(response.statusText)
  const json = await response.json()
  return json
}

export const useGetServerBlocks = (
  { serverUrl }: GetServerBlocksQueryVariables,
  options?: UseQueryOptions<
    GetServerBlocksResponse,
    Error,
    GetServerBlocksResponse,
    QueryKey
  >
) => {
  return useQuery<
    GetServerBlocksResponse,
    Error,
    GetServerBlocksResponse,
    QueryKey
  >(
    `${serverUrl}/${BLOCKS_END_POINT}`,
    () => getServerBlocks({ serverUrl }),
    options
  )
}
