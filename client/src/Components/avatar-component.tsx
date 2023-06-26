
export interface AvatarProps
{
    url: string,
    initials: string | null
}

export default function AvatarComponent(props: AvatarProps)
{
    if (props.url)
    {
        return (
            <div>
                <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="Rounded avatar"></img>
            </div>
        )
    }

    return (
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-orange-200 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">{props.initials}</span>
        </div>
    )
}