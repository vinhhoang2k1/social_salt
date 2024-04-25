import { PropsIconSvg } from "@/types";

const Saved = ({
    currentColor = "#000",
    width = 18,
    height = 18,
    active = false,
}: PropsIconSvg) => {
    return (
        <svg
            aria-label=""
            className="x1lliihq x1n2onr6 x1roi4f4"
            fill="currentColor"
            height="12"
            role="img"
            viewBox="0 0 24 24"
            width="12"
        >
            <title>Saved</title>
            <polygon
                fill="none"
                points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
            ></polygon>
        </svg>
    );
};

export default Saved;
