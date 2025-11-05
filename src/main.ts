import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Enable production mode
if (environment.production) {
  enableProdMode();
  
  // Optional: Reduce console noise in production
  if (window.console) {
    const noop = () => {};
    window.console.log = noop;
    window.console.warn = noop;
    window.console.info = noop;
    
    // Keep errors for debugging
    // window.console.error = noop;
  }
}

// Bootstrap application
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {
    console.log('✅ Application bootstrapped successfully!');
    console.log('🌍 Environment:', environment.production ? 'Production' : 'Development');
    
    // Check if Firebase config is available
    if (environment.firebase) {
      console.log('🔥 Firebase configured');
    } else {
      console.warn('⚠️ Firebase configuration missing');
    }
  })
  .catch(err => {
    console.error('❌ Bootstrap failed:', err);
    
    // Display user-friendly error message
    const errorElement = document.createElement('div');
    errorElement.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background: #f44336;
      color: white;
      padding: 20px;
      text-align: center;
      z-index: 9999;
      font-family: Arial, sans-serif;
    `;
    errorElement.textContent = 'Application failed to load. Please refresh the page.';
    document.body.appendChild(errorElement);
  });

// Error handling for uncaught errors
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});