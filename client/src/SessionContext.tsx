import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';

interface SessionContextType {
    supabase: any;
    session: Session | null;
    user: User | null;
    username: string;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [username, setUsername] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true); // New loading state

    useEffect(() => {
        const fetchSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error fetching session:', error);
                setLoading(false); // Stop loading on error
                return;
            }
            setSession(data.session);
            setUser(data.session?.user || null);
            if (data.session?.user) {
                const { data: profiles, error } = await supabase
                    .from('profiles')
                    .select('username')
                    .eq('email', data.session.user.email)
                    .single();
                if (error) {
                    console.error('Error getting profile:', error);
                } else {
                    setUsername(profiles?.username || '');
                }
            }
            setLoading(false); // Stop loading once session is fetched
        };

        fetchSession();

        // Subscribe to auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
            setSession(session);
            setUser(session?.user || null);
        });

        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show loading state while fetching
    }

    return (
        <SessionContext.Provider value={{ supabase, session, user, username }}>
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
