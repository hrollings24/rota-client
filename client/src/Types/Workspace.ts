export interface WorkspaceResponse {
    data: WorkspaceResponseData;
}

export interface WorkspaceResponseData {
    workspacesForUser: WorkspacesForUser[];
}

export interface WorkspacesForUser {
    id:   string;
    name: string;
}