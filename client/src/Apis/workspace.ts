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

const GET_WORKSPACES_FILTER = gql`
query($urlFilter: String){
    workspaces(where: {
      url: {
        contains: $urlFilter
      }
    }) {
      name,
      id,
      url
    }
  }
`;


export function GetWorkspaces() {
    return useQuery<WorkspaceResponseData>(GET_WORKSPACES)
}

export function GetWorkspaceByUrl(url: string) {
    return useQuery<WorkspaceResponseData>(GET_WORKSPACES_FILTER, {
        variables: {
            urlFilter: url,
        },
    });
}