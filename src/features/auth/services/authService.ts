import { supabase } from '../../../lib/supabase';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email?: string;
}

export const authService = {
  login: async ({ email, password }: LoginCredentials) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    
    if (error) {
      console.error("Error exacto de Supabase:", error.message);
      throw error;
    }
    return data;
  },


  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },


  getSession: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  }
};