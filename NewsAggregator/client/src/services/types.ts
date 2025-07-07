export interface LoginDTO {
  email: string;
  password: string;
}

export interface SignupDTO {
  email: string;
  username: string;
  password: string;
  role?: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  category: string;
  created_at: string;
}

export interface UserResponse {
  userId: number;
  username: string;
  role: string;
  sessionToken: string;
}

export interface NotificationPreference {
  category?: string;
  enabled: boolean;
  keywords?: string[];
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  created_at: string;
}
