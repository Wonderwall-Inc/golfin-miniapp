import React, { useEffect, useState } from 'react'
import { mockUserAccount } from '../constants';
import { UserContext } from '../contexts/UserContext';
import { AccountType } from '../type';


export const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [account, setAccount] = useState<AccountType | undefined>();

    useEffect(() => {

        if (mockUserAccount.name !== undefined && mockUserAccount.point !== undefined && mockUserAccount.referral !== undefined) {
            setAccount({
                name: mockUserAccount.name,
                point: mockUserAccount.point,
                referral: mockUserAccount.referral,
            })
        }
    }, [])
    return (
        <UserContext.Provider value={{
            account,
            setAccount
        }}>
            {children}
        </UserContext.Provider>
    );
}

