
export interface WorkspaceResponseData {
    workspacesForUser: WorkspacesForUser[];
}


export interface WorkspacesForUser {
    id: string;
    name: string;
    url: string;
}

export interface WorkspaceResponse {
    workspace: Workspace;
}

export interface Workspace {
    id: string;
    users: User[];
    departments: Department[];
}

export interface User {
    accountId: string;
    username: string;
    firstName: string;
    surname: string;
    role: string;
}

export interface Department {
    id: string;
    name: string;
}