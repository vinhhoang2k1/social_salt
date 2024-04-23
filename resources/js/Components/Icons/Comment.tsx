import { PropsIconSvg } from "@/types";


const Comment = ({
    currentColor = "#000",
    width = 18,
    height = 18,
    active = false,
}: PropsIconSvg) => {
    return (
        <svg
            aria-label="comment"
            className="icon"
            fill={currentColor}
            height={height}
            role="img"
            viewBox="0 0 24 24"
            width={width}
        >
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
