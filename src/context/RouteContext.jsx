import { useContext, createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getSessionData = async () => {
        try {
            const res = await fetch("https://thrmbackend.in/api/admin/Session", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });
            if (!res.ok) {
                setUser(null);
            } else {
                const data = await res.json();
                setUser(data);
            }
        } catch (err) {
            console.error("Session check failed", err);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSessionData();
    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = async () => {
        try {
            // Ensure this matches your backend! (Sometimes logout is POST)
            const res = await fetch("https://thrmbackend.in/api/admin/logout", {
                method: "POST", 
                credentials: "include",
                headers: { "Content-Type": "application/json" }
            });
            if (!res.ok) throw new Error("Failed to logout");
            setUser(null);
        } catch(e) {
            console.error(e);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            role: user?.role, // Fixed crash risk here
            isAuthenticated: !!user,
            loading,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);