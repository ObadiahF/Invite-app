const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center p-6">
            <div className="max-w-md w-full text-center space-y-6">
                <h1 className="text-6xl font-bold text-gray-800">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700">Page Not Found</h2>
                <p className="text-gray-600">Sorry, the page you are looking for does not exist or the event is no longer available.</p>
                {/*
                <div className="mt-10">
                    <Link to="/" className="
                    px-4 py-2 bg-blue-500 text-white rounded-lg shadow 
                    hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500
                    focus:ring-opacity-50"
                    >Go Back Home</Link>
                </div>
    */}
                    
            </div>
        </div>
    );
};

export default ErrorPage;
