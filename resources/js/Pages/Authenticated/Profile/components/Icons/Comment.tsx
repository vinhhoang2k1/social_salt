import { PropsIconSvg } from "@/types";

const Comment = ({
    currentColor = "#000",
    width = 18,
    height = 18,
    active = false,
}: PropsIconSvg) => {
    return (
        <svg
            aria-label="Comment"
            className="x1lliihq x1n2onr6 x5n08af"
            fill="currentColor"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
        >
            <title>Comment</title>
            <path
                d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                fill="none"
                stroke="currentColor"
                stroke-linejoin="round"
                stroke-width="2"
            ></path>
        </svg>
    );
};

export default Comment;
