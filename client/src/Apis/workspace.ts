import { useQuery } from "@apollo/client"
import gql from "graphql-tag"
import { WorkspaceResponse, WorkspaceResponseData, WorkspacesForUser } from "../Types/Workspace"


const GET_WORKSPACES = gql`
    query {
        workspacesForUser {
        id,
        name
        }
    }
`

export function GetWorkspaces() {
    return useQuery<WorkspaceResponseData>(GET_WORKSPACES)
}