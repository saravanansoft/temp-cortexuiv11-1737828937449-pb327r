import { LINKEDIN_CONFIG } from './linkedinAuthConfig';
import { LinkedInPopupManager } from './linkedinPopupManager';
import { encodeAuthParams } from './linkedinUtils';

export class LinkedInService {
  private popupManager = new LinkedInPopupManager();

  async authorize(): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const state = crypto.randomUUID();
        const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
        const redirectUri = `${window.location.origin}/linkedin-callback.html`;
        const scope = encodeURIComponent(LINKEDIN_CONFIG.SCOPE);

        const authParams = encodeAuthParams({
          response_type: 'code',
          client_id: clientId,
          redirect_uri: redirectUri,
          scope: scope,
          state
        });

        const authUrl = `${LINKEDIN_CONFIG.AUTH_ENDPOINT}?${authParams}`;
        console.log('Authorization URL:',authUrl);
        sessionStorage.setItem('linkedin_auth_state', state);

        const popup = this.popupManager.openPopup(authUrl, LINKEDIN_CONFIG.POPUP_CONFIG);
        
        if (!popup) {
          throw new Error('Failed to open popup window. Please allow popups for this site.');
        }

        const handleMessage = (event: MessageEvent) => {
          if (event.origin !== window.location.origin) return;

          if (event.data?.type === 'linkedin_auth_code') {
            const receivedState = event.data.state;
            const storedState = sessionStorage.getItem('linkedin_auth_state');

            if (receivedState !== storedState) {
              this.cleanup(handleMessage);
              reject(new Error('Invalid state parameter'));
              return;
            }

            this.cleanup(handleMessage);
            resolve(event.data.code);
          } else if (event.data?.type === 'linkedin_auth_error') {
            this.cleanup(handleMessage);
            reject(new Error(event.data.error || 'Authentication failed'));
          }
        };

        window.addEventListener('message', handleMessage);
        this.popupManager.startMonitoring(() => {
          this.cleanup(handleMessage);
          reject(new Error('Authentication cancelled'));
        });

      } catch (error) {
        reject(error);
      }
    });
  }

  private cleanup(messageHandler: (event: MessageEvent) => void): void {
    window.removeEventListener('message', messageHandler);
    sessionStorage.removeItem('linkedin_auth_state');
    this.popupManager.cleanup();
  }

  async getProfile(accessToken: string): Promise<any> {
    if (!accessToken) {
      throw new Error('Access token is required');
    }

    const response = await fetch('/linkedin/api', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch LinkedIn profile');
    }

    return response.json();
  }
}

export const linkedinService = new LinkedInService();