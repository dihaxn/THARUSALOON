import React from 'react';
import { useNotification } from '../../context/NotificationContext';

export default function NotificationContainer() {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed right-4 top-4 z-50 space-y-2">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`rounded-lg px-4 py-3 shadow-lg ${
            notification.type === 'success'
              ? 'bg-green-500 text-white'
              : notification.type === 'error'
              ? 'bg-red-500 text-white'
              : 'bg-blue-500 text-white'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <span>{notification.message}</span>
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
