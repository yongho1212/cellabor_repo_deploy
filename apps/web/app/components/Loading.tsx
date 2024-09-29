export default function Loading() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-grey_300 bg-opacity-20 z-50">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-4 border-pink-400"></div>
        </div>
    )
}
