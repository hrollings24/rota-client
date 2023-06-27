import { useState } from "react";
import TabComponent from "../../Components/tab-component";
import AccountSettingsTab from "./account.settings.account.tab";
import AccountProfileTab from "./account.settings.profile.tab";
import AccountWorkspacesTab from "./account.settings.workspaces.tab";

export default function AccountSettingsPage() {
    const titles = ['Account', 'Profile', 'Workspaces'];
  
    //create a useState for the current tab
    const [currentTab, setCurrentTab] = useState("");

    const renderComponent = () => {
        switch (currentTab) {
            case "Account":
                return <AccountSettingsTab/>
            case "Profile":
                return <AccountProfileTab/>
            case "Workspaces":
                return <AccountWorkspacesTab/>
            default:
                return <AccountSettingsTab/>
        }
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
        <div className="bg-white shadow-md rounded-lg p-4">
        <TabComponent titles={titles} setCurrentTab={setCurrentTab} />
          {renderComponent()}
        </div>
      </div>
    );
  }