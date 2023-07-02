import { WorkspaceResponse } from "../../Types/Workspace";
import { auth } from "../../firebaseSetup";
import WorkspaceAdminHomePage from "./admin/workspace.admin.home.page";
import WorkspaceUserPage from "./user/workspace.user.page";

export default function WorkspaceParentPage({ workspace }: { workspace: WorkspaceResponse }) {

    //get the current user from the workspace
    const user = workspace.workspace.users.find(user => user.accountId === auth.currentUser?.uid);

    //show error if user is not found
    if (!user) {
        return <div>user not found</div>
    }

    console.log(workspace.workspace);

    if (user.role === "ADMIN") {
        return (
            <WorkspaceAdminHomePage workspace={workspace} />
        )
    }

    return (
        <WorkspaceUserPage workspace={workspace} />
    )
    
}