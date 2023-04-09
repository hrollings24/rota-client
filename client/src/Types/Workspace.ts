export interface WorkspaceResponse {
    data: Data;
}

export interface Data {
    workspacesForUser: WorkspacesForUser[];
}

export interface WorkspacesForUser {
    id:   string;
    name: string;
}