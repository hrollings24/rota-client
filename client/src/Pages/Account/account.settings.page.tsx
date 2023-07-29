import { useContext, useEffect, useState } from "react";
import TabComponent from "../../Components/tab-component";
import AccountSettingsTab from "./account.settings.account.tab";
import AccountProfileTab from "./account.settings.profile.tab";
import AccountWorkspacesTab from "./account.settings.workspaces.tab";
import { auth } from "../../firebaseSetup";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../../AccountContext";

export default function AccountSettingsPage() {
    const titles = ['Account', 'Profile', 'Workspaces'];
    const navigate = useNavigate();
    const [ accountData, setAccountData ] = useContext(AccountContext);

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

    const logout = () => {
        auth.signOut();
        setAccountData(null);
        // navigate back to login page
        navigate("/login");
      };


    return (
        <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6 text-sm" onClick={() => logout()}>
            Log Out
          </button>
          <TabComponent titles={titles} setCurrentTab={setCurrentTab} />
          {renderComponent()}
        </div>
      </div>
      );
  }