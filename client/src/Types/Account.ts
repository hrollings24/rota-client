
export interface AccountResponseData {
    account: Account
}

export interface Account {
    accountId: string
    username: string
    firstName: string
    surname: string
    notifications: NotificationResponse[]
    profilePictureUrl: string
    workspaces: WorkspacesForUser[]
  }
  

export interface WorkspacesForUser {
    id: string;
    name: string;
}

export interface NotificationResponse {
    id: string;
    message: string;
    title: string;
}