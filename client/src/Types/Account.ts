
export interface AccountResponseData {
    account: Account
}

export interface Account {
    accountId: string
    username: string
    firstName: string
    surname: string
    notifications: any[]
    profilePictureUrl: string
    workspaces: WorkspacesForUser[]
  }
  

export interface WorkspacesForUser {
    id: string;
    name: string;
}