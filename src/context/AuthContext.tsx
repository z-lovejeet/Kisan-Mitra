import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export type UserRole = 'farmer' | 'buyer';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, role: UserRole) => void;
    signup: (name: string, email: string, role: UserRole) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem('kisan_mitra_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (email: string, role: UserRole) => {
        // Mock login
        const mockUser: User = {
            id: '1',
            name: email.split('@')[0], // Use part of email as name for mock
            email,
            role,
            avatar: `https://i.pravatar.cc/150?u=${email}`
        };
        setUser(mockUser);
        localStorage.setItem('kisan_mitra_user', JSON.stringify(mockUser));
        navigate('/');
    };

    const signup = (name: string, email: string, role: UserRole) => {
        // Mock signup
        const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            email,
            role,
            avatar: `https://i.pravatar.cc/150?u=${email}`
        };
        setUser(newUser);
        localStorage.setItem('kisan_mitra_user', JSON.stringify(newUser));
        navigate('/');
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('kisan_mitra_user');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
