export class LinkedInPopupManager {
    private popupWindow: Window | null = null;
    private checkClosedInterval: number | null = null;
  
    openPopup(url: string, config: any): Window | null {
      const { width, height, target, features } = config;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
  
      const featureString = Object.entries(features)
        .map(([key, value]) => `${key}=${value}`)
        .join(',');
  
      const windowFeatures = `width=${width},height=${height},left=${left},top=${top},${featureString}`;
  
      this.popupWindow = window.open(url, target, windowFeatures);
      return this.popupWindow;
    }
  
    startMonitoring(onClose: () => void): void {
      if (!this.popupWindow) return;
  
      this.checkClosedInterval = window.setInterval(() => {
        if (this.popupWindow?.closed) {
          this.cleanup();
          onClose();
        }
      }, 500);
    }
  
    cleanup(): void {
      if (this.checkClosedInterval) {
        clearInterval(this.checkClosedInterval);
        this.checkClosedInterval = null;
      }
  
      if (this.popupWindow) {
        this.popupWindow.close();
        this.popupWindow = null;
      }
    }
  
    isPopupOpen(): boolean {
      return this.popupWindow !== null && !this.popupWindow.closed;
    }
  }