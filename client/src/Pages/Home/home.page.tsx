import { GetWorkspaces } from "../../Apis/workspace";
import Card from "./Components/card-component";
import { LoadingComponent } from "../../Components/loading-component";
import { useNavigate } from "react-router-dom";
import { AccountResponseData } from "../../Types/Account";
import { useContext } from "react";
import { AccountContext } from "../../AccountContext";

export default function HomePage() {
  const accountData = useContext(AccountContext);
  
    const navigate = useNavigate();

    const goToWorkspace = (url: string) => {
        navigate('/workspace/' + url);
      };

    const renderRow = () => {
        return (
          <div>
            {accountData?.accountData?.account.workspaces.map((entry) => (
              <div key={entry.id} className="mb-6">
                <Card title={entry.name} description="test" url={entry.id} onClick={() => goToWorkspace(entry.id)} buttonText="Go To Workspace" />
              </div>
            ))}
          </div>
        );
      };
      
      return (
        <div className="bg-gray-100 min-h-screen">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold mb-4">👋 Welcome Back</h1>
            <div>{renderRow()}</div>
            <div className="mb-6">
              <Card
                title="Create New Workspace"
                description="Click here to create a new workspace"
                url="/create-workspace"
                onClick={() => goToWorkspace("create")}
                buttonText="Create Workspace"
              />
            </div>
          </div>
        </div>
      );
}