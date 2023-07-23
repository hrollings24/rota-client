import { GetWorkspaces } from "../../Apis/workspace";
import { LoadingComponent } from "../../Components/loading-component";
import { useNavigate } from "react-router-dom";
import { AccountResponseData, NotificationResponse } from "../../Types/Account";
import { useContext, useState } from "react";
import { AccountContext } from "../../AccountContext";
import { gql, useMutation } from "@apollo/client";

const DISMISS_NOTIFICATION = gql`
mutation DismissNotification($id: String!) {
    dismissNotification(request: { id: $id })
  }
`;

export default function NotificationsPage() {
    const { accountData, setAccountData } = useContext(AccountContext);
  
    const [dismissMutation] = useMutation(DISMISS_NOTIFICATION);
  
    // Handle the dismissal of a notification
    const handleDismissNotification = async (notificationId: string) => {
      try {
        await dismissMutation({ variables: { id: notificationId } });
        console.log(`Notification with ID ${notificationId} dismissed.`);
  
        if (accountData !== null && accountData.account.notifications) {
          const updatedNotifications = accountData.account.notifications.filter(
            (notification: NotificationResponse) => notification.id !== notificationId
          ) as NotificationResponse[];
  
          // Create a new object and update the notifications property
          const updatedAccountData = {
            ...accountData,
            account: {
              ...accountData.account,
              notifications: updatedNotifications,
            },
          };
  
          // Update accountData using setAccountData (useState updater function)
          setAccountData(updatedAccountData);
        }
      } catch (error) {
        // Handle the error
        console.error('Error dismissing notification:', error);
      }
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