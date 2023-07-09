import React, { createContext } from 'react';
import { AccountResponseData } from './Types/Account';

export const AccountContext = createContext<AccountResponseData | null>(null);

interface AccountContextProviderProps {
  accountData: AccountResponseData;
  children: React.ReactNode;
}

export const AccountContextProvider: React.FC<AccountContextProviderProps> = ({
  accountData,
  children,
}) => {
  return (
    <AccountContext.Provider value={accountData}>{children}</AccountContext.Provider>
  );
};
