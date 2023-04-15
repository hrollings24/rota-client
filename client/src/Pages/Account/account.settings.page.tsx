import TabComponent from "../../Components/tab-component";

export default function AccountSettingsPage()
{
    let titles: string[] = ['Account', 'Profile', 'Workspaces'];

    return (
        <div>
            Settings
            <TabComponent titles={titles}></TabComponent>
        </div>
    )
}