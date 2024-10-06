export function timeAgo(createdAt: string|Date) {
    const now = new Date();
    const postDate = new Date(createdAt);
    const timeDifference = now.getTime() - postDate.getTime();
    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));

    if (hoursAgo < 24) {
        return `${hoursAgo}시간 전`;
    } else {
        const daysAgo = Math.floor(hoursAgo / 24);
        return `${daysAgo}일 전`;
    }
}
