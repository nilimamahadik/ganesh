import { createContext, useState} from "react";

export const AccountContext = createContext(null);

const AccountProvider = ({ children }) => {

    const [info, setInfo] = useState();
    const [user, setUser] = useState();

    return (
        <AccountContext.Provider value={{
            info,
            setInfo,
            user,
            setUser
        }} >
            {children}

        </AccountContext.Provider>

    )

}




export default AccountProvider;