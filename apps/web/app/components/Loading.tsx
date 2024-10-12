export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-50 backdrop-filter backdrop-blur-sm">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-4 border-pink-400"></div>
        </div>
    );
}
