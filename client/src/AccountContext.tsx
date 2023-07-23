import React, { createContext, useState } from 'react';
import { AccountResponseData } from './Types/Account';

export const AccountContext = createContext<{ accountData: AccountResponseData | null; setAccountData: React.Dispatch<React.SetStateAction<AccountResponseData | null>> }>({
  accountData: null,
  setAccountData: () => null,
});

interface AccountContextProviderProps {
  accountData: AccountResponseData;
  children: React.ReactNode;
}

export const AccountContextProvider: React.FC<AccountContextProviderProps> = ({
  accountData,
  children,
}) => {
  const [accountDataState, setAccountDataState] = useState<AccountResponseData | null>(accountData);

  return (
    <AccountContext.Provider value={{ accountData: accountDataState, setAccountData: setAccountDataState }}>
      {children}
    </AccountContext.Provider>
  );
};