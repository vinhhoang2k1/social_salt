import { PropsIconSvg } from "@/types";
type PropsIconProfile = PropsIconSvg & {
    avatar?: string;
};
const Search = ({
    currentColor = "#000",
    width = 18,
    height = 18,
    active = false,
    avatar = "https://i.pravatar.cc/300",
}: PropsIconProfile) => {
    console.log("active", active);

    return (
        <>
            <span>
                <img
                    src={avatar}
                    style={{
                        width,
                        height,
                        borderRadius: "50%",
                        border: active ? `1px solid ${currentColor}` : "none",
                    }}
                    alt=""
                />
            </span>
        </>
    );
};

export default Search;
