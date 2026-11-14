const Skeleton = () => {

    return (
        <div className="w-full py-20 flex flex-col justify-center items-center">
            <div className="animate-pulse flex flex-col justify-center space-x-4 h-screen">
                <div className="space-y-12 py-1">
                    <div className="bg-gray-300 rounded w-full sm:w-7xl h-80"></div>

                    <div className="space-y-4">
                        <div className="h-4 bg-gray-300 rounded w-48"></div>
                        <div className="h-4 bg-gray-300 rounded w-96"></div>
                        <div className="h-4 bg-gray-300 rounded w-146"></div>
                    </div>

                </div>
            </div>

        </div>
    );

}

export default Skeleton