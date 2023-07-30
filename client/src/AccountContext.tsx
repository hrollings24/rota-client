import React, { createContext, useEffect, useState } from 'react';
import { AccountResponseData } from './Types/Account';
import { gql, useLazyQuery } from '@apollo/client';

export const AccountContext = createContext<[AccountResponseData | null, React.Dispatch<React.SetStateAction<AccountResponseData | null>>, () => void]>([null, () => {}, () => {}]);

interface AccountContextProviderProps {
  children: React.ReactNode;
}


export const GET_ACCOUNT_QUERY = gql`
query {
  account
  {
    accountId,
    username,
    firstName,
    surname
    notifications{
      id
      title,
      message
    },
    workspaces {
      id,
      name
    },
    invites {
      inviteId,
      workspaceId,
      workspaceName
    }
  }
}
`;


export const AccountContextProvider: React.FC<AccountContextProviderProps> = ({
  children,
}) => {
  const [accountDataState, setAccountDataState] = useState<AccountResponseData | null>(null);

  const [
    getAccount,
    { loading: accountLoading, data: accountQueryData },
  ] = useLazyQuery(GET_ACCOUNT_QUERY, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => setAccountDataState(data),
  });
  
  const refresh = () => {
    getAccount();
  }

  return (
    <AccountContext.Provider value={[accountDataState, setAccountDataState, refresh ]}>
      {children}
    </AccountContext.Provider>
  );
};