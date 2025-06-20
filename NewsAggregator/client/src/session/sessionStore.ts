// client/session/sessionStore.ts
export let sessionToken: string = '';
export let userId: number = 0;
export let username: string = '';

export function setSession(token: string, id: number, name: string) {
  sessionToken = token;
  userId = id;
  username = name;
}

export function clearSession() {
  sessionToken = '';
  userId = 0;
  username = '';
}
