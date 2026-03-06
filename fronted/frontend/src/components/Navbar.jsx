function Navbar({ onLogout }) {

    const handleClick = () => {
        if (onLogout) {
            onLogout();
        } else {
            console.error("onLogout function not provided to Navbar");
        }
    };

    return (
        <div className="bg-indigo-700 text-white flex items-center justify-between px-6 py-4 shadow-md">

            {/* Title */}
            <h1 className="text-xl font-semibold">Campus360</h1>

            {/* Sign Out */}
            <button
                onClick={handleClick}
                className="bg-white text-indigo-700 px-4 py-1 rounded-lg font-medium hover:bg-gray-100 transition"
            >
                Sign Out
            </button>

        </div>
    );
}

export default Navbar;