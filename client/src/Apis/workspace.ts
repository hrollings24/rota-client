import { useQuery } from "@apollo/client"
import gql from "graphql-tag"
import { useState } from "react"
import { WorkspaceResponseData } from "../Types/Workspace"


const GET_WORKSPACES = gql`
    query {
        workspacesForUser {
        id,
        name,
        url
        }
    }
`

export function GetWorkspaces() {
    return useQuery<WorkspaceResponseData>(GET_WORKSPACES)
}