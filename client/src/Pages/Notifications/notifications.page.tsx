import { GetWorkspaces } from "../../Apis/workspace";
import { LoadingComponent } from "../../Components/loading-component";
import { useNavigate } from "react-router-dom";
import { AccountResponseData, NotificationResponse } from "../../Types/Account";
import { useContext } from "react";
import { AccountContext } from "../../AccountContext";

export default function NotificationsPage() {
    const accountData = useContext(AccountContext);
  
    // Handle the dismissal of a notification
    const handleDismissNotification = (notificationId: string) => {
      // Implement your logic to dismiss the notification with the given notificationId
      // For example, you could update the state or make an API call to mark the notification as dismissed
      // For now, we'll just log the dismissal for demonstration purposes.
      console.log(`Notification with ID ${notificationId} dismissed.`);
    };
  
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6">Notifications</h1>
        <div className="grid grid-cols-1 gap-4">
          {accountData?.account.notifications.map((notification: NotificationResponse) => (
            <div key={notification.id} className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">{notification.title}</h2>
                <p className="text-gray-600">{notification.message}</p>
              </div>
              <button
                className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                onClick={() => handleDismissNotification(notification.id)}
              >
                Dismiss
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }