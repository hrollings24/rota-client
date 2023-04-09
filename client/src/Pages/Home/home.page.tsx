import { GetWorkspaces } from "../../Apis/workspace";
import Navbar from "../../Components/navbar";

export default function HomePage()
{
    const { data, error, loading } = GetWorkspaces();

    if (loading)
    {
        return (
            <div>Loading...</div>
        )
    }

    if (error)
    {
        return (
            <div>{error.message}</div>
        )
    }

    console.log(data)
    return (
        <div>
            <Navbar></Navbar>
            Home Page!
        </div>
    )
}