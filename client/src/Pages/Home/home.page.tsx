import { GetWorkspaces } from "../../Apis/workspace";
import Card from "./Components/card-component";
import { LoadingComponent } from "../../Components/loading-component";

export default function HomePage()
{
    const { data, error, loading } = GetWorkspaces();

    if (loading)
    {
        return (
            <LoadingComponent/>
        )
    }

    if (error)
    {
        return (
            <div>{error.message}</div>
        )
    }

    const renderRow = () => {
        return (
            <div>
                {data?.workspacesForUser.map((entry) => 
                    <div>
                        <Card title={entry.name} description="test" url={entry.url}></Card>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div>
            {renderRow()}
        </div>
    )
}