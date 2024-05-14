export function getTimeDifference(inputDate: string): string {
    const input = new Date(inputDate);
    const now = new Date();

    const diffInMilliseconds = now.getTime() - input.getTime();
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    if (diffInHours < 24) {
        return `${diffInHours}h ago`;
    } else {
        return `${diffInDays}d ago`;
    }
}

