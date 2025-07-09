// src/session/sessionManager.ts

type Session = {
  userId: number;
  username: string;
  role: string;
  sessionToken: string;
};

class SessionManager {
  private static instance: SessionManager;
  private session: Session | null = null;

  private constructor() {}

  public static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  public setSession(session: Session): void {
    this.session = session;
  }

  public getSession(): Session | null {
    return this.session;
  }

  public clearSession(): void {
    this.session = null;
  }

  public getToken(): string | null {
    return this.session?.sessionToken ?? null;
  }

  public isLoggedIn(): boolean {
    return !!this.session;
  }

  public isAdmin(): boolean {
    return this.session?.role === 'admin';
  }
}

export const sessionManager = SessionManager.getInstance();
