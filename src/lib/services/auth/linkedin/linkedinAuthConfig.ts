export interface LinkedInConfig {
    AUTH_ENDPOINT: string;
    TOKEN_ENDPOINT: string;
    SCOPE: string;
    POPUP_CONFIG: {
      width: number;
      height: number;
      target: string;
      features: {
        toolbar: number;
        scrollbars: number;
        status: number;
        resizable: number;
        location: number;
        menuBar: number;
      };
    };
  }
  
  export const LINKEDIN_CONFIG: LinkedInConfig = {
    AUTH_ENDPOINT: 'https://www.linkedin.com/oauth/v2/authorization',
    TOKEN_ENDPOINT: '/linkedin/token',
    SCOPE: 'email profile openid',
    POPUP_CONFIG: {
      width: 600,
      height: 700,
      target: 'LinkedIn Login',
      features: {
        toolbar: 0,
        scrollbars: 1,
        status: 1,
        resizable: 1,
        location: 1,
        menuBar: 0
      }
    }
  };