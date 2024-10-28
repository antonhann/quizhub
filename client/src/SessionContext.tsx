// src/SessionContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';

interface SessionContextType {
    supabase: any;
    session: Session | null;
    user: User | null;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error fetching session:', error);
                return;
            }
            setSession(data.session);
            setUser(data.session?.user || null); // Get user from the session if it exists
        };

        fetchSession();

        // Optional: Subscribe to auth changes (sign-in, sign-out)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
            setSession(session);
            setUser(session?.user || null);
        });

        // Cleanup subscription on unmount
        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    return (
        <SessionContext.Provider value={{ session, user }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSessionContext = (): SessionContextType => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('useSessionContext must be used within a SessionProvider');
    }
    return context;
};
