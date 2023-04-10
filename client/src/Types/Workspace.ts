
export interface WorkspaceResponseData {
    workspacesForUser: WorkspacesForUser[];
}

export interface WorkspaceSearchResponseData {
    workspaces: WorkspacesForUser[];
}

export interface WorkspacesForUser {
    id: string;
    name: string;
    url: string;
}