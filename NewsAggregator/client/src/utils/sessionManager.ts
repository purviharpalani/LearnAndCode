interface Session {
  userId: number;
  username: string;
  role: string;
  sessionToken: string;
}

let currentSession: Session | null = null;

export const sessionManager = {
  setSession(session: Session) {
    currentSession = session;
  },
  getSession(): Session | null {
    return currentSession;
  },
  clearSession() {
    currentSession = null;
  }
};
