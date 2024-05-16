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

export function removeAtMention(str: string) {
    // Sử dụng biểu thức chính quy để tìm và thay thế chuỗi bắt đầu bằng @
    return str.replace(/@\w+/, '');
}

