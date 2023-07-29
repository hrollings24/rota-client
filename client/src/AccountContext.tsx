import React, { createContext, useEffect, useState } from 'react';
import { AccountResponseData } from './Types/Account';

export const AccountContext = createContext<[AccountResponseData | null, React.Dispatch<React.SetStateAction<AccountResponseData | null>>]>([null, () => {}]);

interface AccountContextProviderProps {
  children: React.ReactNode;
}

export const AccountContextProvider: React.FC<AccountContextProviderProps> = ({
  children,
}) => {
  const [accountDataState, setAccountDataState] = useState<AccountResponseData | null>(null);
  
  return (
    <AccountContext.Provider value={[accountDataState, setAccountDataState ]}>
      {children}
    </AccountContext.Provider>
  );
};