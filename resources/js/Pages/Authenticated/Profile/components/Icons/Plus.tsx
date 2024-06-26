import { PropsIconSvg } from "@/types";

const Plus = ({
    currentColor = "#000",
    width = 18,
    height = 18,
    active = false,
}: PropsIconSvg) => {
    return (
        <svg
            aria-label="Plus icon"
            className="x1lliihq x1n2onr6 x10xgr34"
            fill="currentColor"
            height="44"
            role="img"
            viewBox="0 0 24 24"
            width="44"
        >
            <title>Plus icon</title>
            <path d="M21 11.3h-8.2V3c0-.4-.3-.8-.8-.8s-.8.4-.8.8v8.2H3c-.4 0-.8.3-.8.8s.3.8.8.8h8.2V21c0 .4.3.8.8.8s.8-.3.8-.8v-8.2H21c.4 0 .8-.3.8-.8s-.4-.7-.8-.7z"></path>
        </svg>
    );
};

export default Plus;
