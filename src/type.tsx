import { CSSProperties, Dispatch, SetStateAction } from "react"


export interface TitleComponentProps {
    titlename: string
    style?: CSSProperties
}

export interface AccountType {
    name: string,
    point: number,
    referral: number
}

export interface UserContextType {
    account: AccountType | undefined;
    setAccount: Dispatch<SetStateAction<AccountType | undefined>>
}

