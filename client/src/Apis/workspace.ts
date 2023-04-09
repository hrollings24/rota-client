import { useQuery } from "@apollo/client"
import gql from "graphql-tag"
import { WorkspaceResponse } from "../Types/Workspace"


const GET_WORKSPACES = gql`
    query {
        workspacesForUser {
        id,
        name
        }
    }
`

export function GetWorkspaces() {
    return useQuery<WorkspaceResponse>(GET_WORKSPACES)
}