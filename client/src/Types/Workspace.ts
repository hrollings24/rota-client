import { gql } from "@apollo/client";

export const GET_WORKSPACES_FILTER = gql`
query {
  workspace {
    id,
    users {
      accountId,
      username,
      role,
      firstName,
      surname,
      departmentId
    },
    departments {
      id,
      name
    },
  }
}
`;

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
    departmentId: string;
}

export interface Department {
    id: string;
    name: string;
}