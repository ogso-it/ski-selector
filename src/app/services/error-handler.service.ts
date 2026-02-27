import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ErrorNotification {
  id: string;
  message: string;
  type: 'error' | 'warning' | 'info' | 'success';
  duration?: number; // ms, 0 = permanent
  dismissible?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private notificationsSubject = new BehaviorSubject<ErrorNotification[]>([]);
  notifications$: Observable<ErrorNotification[]> = this.notificationsSubject.asObservable();
  
  private notificationIdCounter = 0;

  constructor() {}

  /**
   * Add a validation error notification
   */
  addValidationError(message: string, duration: number = 3000): void {
    this.addNotification({
      message,
      type: 'error',
      duration,
      dismissible: true
    });
  }

  /**
   * Add a warning notification
   */
  addWarning(message: string, duration: number = 4000): void {
    this.addNotification({
      message,
      type: 'warning',
      duration,
      dismissible: true
    });
  }

  /**
   * Add a success notification
   */
  addSuccess(message: string, duration: number = 2000): void {
    this.addNotification({
      message,
      type: 'success',
      duration,
      dismissible: true
    });
  }

  /**
   * Add an info notification
   */
  addInfo(message: string, duration: number = 3000): void {
    this.addNotification({
      message,
      type: 'info',
      duration,
      dismissible: true
    });
  }

  /**
   * Generic notification method
   */
  private addNotification(notification: Omit<ErrorNotification, 'id'>): void {
    try {
      const id = `notification-${++this.notificationIdCounter}`;
      const newNotification: ErrorNotification = {
        ...notification,
        id,
        duration: notification.duration ?? 3000,
        dismissible: notification.dismissible ?? true
      };

      const currentNotifications = this.notificationsSubject.value;
      this.notificationsSubject.next([...currentNotifications, newNotification]);

      // Auto-dismiss if duration is set
      if (newNotification.duration && newNotification.duration > 0) {
        setTimeout(() => {
          this.removeNotification(id);
        }, newNotification.duration);
      }
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  }

  /**
   * Remove notification by id
   */
  removeNotification(id: string): void {
    const current = this.notificationsSubject.value;
    this.notificationsSubject.next(current.filter(n => n.id !== id));
  }

  /**
   * Clear all notifications
   */
  clearAll(): void {
    this.notificationsSubject.next([]);
  }

  /**
   * Handle navigation errors
   */
  handleNavigationError(error: any, message?: string): void {
    const errorMessage = message || 'Navigation failed. Please try again.';
    console.error('Navigation error:', error);
    this.addValidationError(errorMessage);
  }

  /**
   * Handle service errors with logging
   */
  handleServiceError(error: any, context: string = 'Service'): void {
    const errorMessage = `${context} error: ${error?.message || 'Unknown error'}`;
    console.error(`[${context}]`, error);
    this.addValidationError('An error occurred. Please try again.');
  }
}
