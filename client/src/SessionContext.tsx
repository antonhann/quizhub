import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';
import Loading from './components/reusables/tools/Loading';

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
    const [loading, setLoading] = useState<boolean>(true); // Initial state is loading

    useEffect(() => {
        const initializeSession = async () => {
            try {
                const { data } = await supabase.auth.getSession();
                setSession(data.session);
                setUser(data.session?.user || null);
    
                if (data.session?.user) {
                    const { data: profile, error } = await supabase
                        .from('profiles')
                        .select('username')
                        .eq('email', data.session.user.email)
                        .single();
                    if (!error && profile) {
                        setUsername(profile.username || '');
                    }
                }
            } catch (error) {
                console.error('Error initializing session:', error);
            } finally {
                setLoading(false);
            }
        };
    
        initializeSession();
    
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
            setSession(session);
            setUser(session?.user || null);
            if (session?.user) {
                supabase
                    .from('profiles')
                    .select('username')
                    .eq('email', session.user.email)
                    .single()
                    .then(({ data: profile, error }) => {
                        if (!error && profile) {
                            setUsername(profile.username || '');
                        }
                    });
            }
        });
    
        return () => {
            subscription?.unsubscribe();
        };
    }, []);
    

    if (loading) {
        return <Loading />; // Show loading state while fetching session
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
