interface AuthParams {
    [key: string]: string;
  }
  
  export function encodeAuthParams(params: AuthParams): string {
    return Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${value}`)
      .join('&');
  }