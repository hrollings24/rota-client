import { useContext, useEffect } from "react"
import { AccountContext } from "../../AccountContext"
import WorkspaceCard, { WorkspaceAccountCardComponentProps } from "./account-workspace-card";
import { InviteResponse, WorkspacesForUser } from "../../Types/Account";


export default function AccountWorkspacesTab() {
    const [accountData] = useContext(AccountContext);
  
    useEffect(() => {
      console.log(accountData);
    }, [accountData]);
  
    // Function to combine WorkspacesForUser and InviteResponse into WorkspaceAccountCardComponentProps
    const combineWorkspacesAndInvites = (
      workspaces: WorkspacesForUser[],
      invites: InviteResponse[]
    ): WorkspaceAccountCardComponentProps[] => {
      const workspaceMap: Record<string, WorkspaceAccountCardComponentProps> = {};
  
      // Map workspaces to WorkspaceAccountCardComponentProps
      workspaces.forEach((workspace) => {
        workspaceMap[workspace.id] = {
          name: workspace.name,
          workspaceId: workspace.id,
          isInvite: false,
        };
      });
  
      // Map invites to WorkspaceAccountCardComponentProps and set isInvite to true
      invites.forEach((invite) => {
        workspaceMap[invite.workspaceId] = {
          ...workspaceMap[invite.workspaceId],
          isInvite: true,
          workspaceId: invite.workspaceId,
          name: invite.workspaceName,
        };
      });
  
      // Convert the map to an array of WorkspaceAccountCardComponentProps
      return Object.values(workspaceMap);
    };
  
    // Combine the workspaces and invites into WorkspaceAccountCardComponentProps
    const combinedData = combineWorkspacesAndInvites(
      accountData?.account.workspaces || [],
      accountData?.account.invites || []
    );
  
    return (
      <div>
        {combinedData.map((workspaceProps) => (
          <WorkspaceCard key={workspaceProps.workspaceId} workspace={workspaceProps} />
        ))}
      </div>
    );
  }