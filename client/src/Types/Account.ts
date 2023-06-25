
export interface Root {
    data: Data
}
  
export interface Data {
    account: Account
}

export interface Account {
    accountId: string
    username: string
    firstName: string
    surname: string
    notifications: any[]
  }
  