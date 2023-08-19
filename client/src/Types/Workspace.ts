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
      departmentId,
      userState,
      managerWorkspaceUserId,
      workspaceUserId
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
    userState: string,
    managerWorkspaceUserId: string;
    workspaceUserId: string
}

export interface Department {
    id: string;
    name: string;
}

export enum ShiftState {
  UNKNOWN = 'UNKNOWN',
  AVALIABLE_TO_PICK_UP = 'AVALIABLE_TO_PICK_UP',
  UNASSIGNED_AND_HIDDEN = 'UNASSIGNED_AND_HIDDEN',
  ASSIGNED = 'ASSIGNED',
}