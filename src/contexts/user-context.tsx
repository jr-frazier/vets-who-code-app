import {
    createContext,
    useContext,
    useMemo,
    useReducer,
    useEffect,
} from "react";

// Constants for local storage keys
const AUTH_KEY = "vwcAuth";

// Define the UserContextType
export type UserContextType = {
    isLoggedIn: boolean;
    setLogin: () => void;
    logout: () => void;
};

// Create the UserContext
export const UserContext = createContext<UserContextType>(
    {} as UserContextType
);

// Initial state
const initialState = {
    isLoggedIn: false,
};

// Initialize state from local storage
const init = () => {
    if (typeof window === "undefined") return initialState;
    const loginStore = localStorage.getItem(AUTH_KEY);
    const loginParse =
        loginStore !== null ? (JSON.parse(loginStore) as boolean) : false;
    return {
        ...initialState,
        isLoggedIn: loginParse,
    };
};

// Define action types
interface UserAction {
    type: "LOGIN" | "LOGOUT";
    payload?: any;
}

// Reducer function to handle state changes
function reducer(state: typeof initialState, action: UserAction) {
    switch (action.type) {
        case "LOGIN": {
            localStorage.setItem(AUTH_KEY, JSON.stringify(true));
            return {
                ...state,
                isLoggedIn: true,
            };
        }
        case "LOGOUT": {
            localStorage.removeItem(AUTH_KEY);
            return {
                ...state,
                isLoggedIn: false,
            };
        }
        default:
            return state;
    }
}

// UserContext Provider component
type TProps = {
    children: React.ReactNode;
};

export const UserProvider = ({ children }: TProps) => {
    const [state, dispatch] = useReducer(reducer, initialState, init);

    // Ensure user is logged out on initial load if isLoggedIn is incorrect
    useEffect(() => {
        if (!state.isLoggedIn) {
            localStorage.removeItem(AUTH_KEY);
        }
    }, [state.isLoggedIn]);

    const value = useMemo(
        () => ({
            ...state,
            setLogin: () => {
                dispatch({ type: "LOGIN" });
            },
            logout: () => {
                dispatch({ type: "LOGOUT" });
            },
        }),
        [state]
    );

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

// Hook to use the UserContext
export const useUser = () => useContext(UserContext);
