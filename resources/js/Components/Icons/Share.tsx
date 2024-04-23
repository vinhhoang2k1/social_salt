import { PropsIconSvg } from "@/types";


const Share = ({
    currentColor = "#000",
    width = 18,
    height = 18,
    active = false,
}: PropsIconSvg) => {
    return (
        <svg
            aria-label="share"
            className="icon"
            fill={currentColor}
            height={height}
            role="img"
            viewBox="0 0 24 24"
            width={width}
        >
            <title>Share Post</title>
            <line
                fill="none"
                stroke="currentColor"
                stroke-linejoin="round"
                stroke-width="2"
                x1="22"
                x2="9.218"
                y1="3"
                y2="10.083"
            ></line>
            <polygon
                fill="none"
                points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                stroke="currentColor"
                stroke-linejoin="round"
                stroke-width="2"
            ></polygon>
        </svg>
    );
};

export default Share;
