
export interface WorkspaceResponseData {
    workspacesForUser: WorkspacesForUser[];
}


export interface WorkspacesForUser {
    id: string;
    name: string;
    url: string;
}


//something is up with these models 

export interface WorkspaceResponse {
    workspace: Workspace;
}

export interface Workspace {
    id: string;
    users: User[];
    departments: Department[];
}

export interface User {
    id: string;
    username: string;
    firstName: string;
    surname: string;
}

export interface Department {
    id: string;
    name: string;
}