import { Cog6ToothIcon } from '@heroicons/react/24/solid';

export function LoadingComponent() {
    return (
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="flex justify-center items-center w-full h-full">
                    <Cog6ToothIcon className="w-8 h-8 animate-spin text-gray-600"></Cog6ToothIcon>
                </div>
            </div>
        </div>
    );
}