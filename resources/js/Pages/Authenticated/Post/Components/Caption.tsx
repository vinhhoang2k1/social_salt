import { fetcher } from "@/Api/Axios";
import CollapseComponent from "@/Components/Collapse/Collapse";
import { IConfig, IResUser } from "@/types/common/Common.type";
import { PageProps } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { IoShareOutline } from "react-icons/io5";
type Props = {
    onBack: () => void;
};

const Caption = ({ onBack }: Props) => {
    const { basePath } = usePage<PageProps>().props.config as IConfig;
    const { user } = usePage<PageProps>().props.auth as { user: IResUser };
    useEffect(() => {
        const fetch = async() => {
            const data = (await fetcher.get("/post/test"));
        }
        fetch();
    }, [])
    
    return (
        <div className="write-caption">
            <div className="author flex items-center gap-2">
                <img
                    src={`${basePath}/${user.avatar}`}
                    alt=""
                    className="avatar"
                />
                <span className="name">{user.fullname}</span>
            </div>
            <div className="content-text mt-5">
                <textarea placeholder="Write a caption" cols={3} />
            </div>
            <CollapseComponent label={"Tag friends"}>
                this is content
            </CollapseComponent>
            <CollapseComponent label={"Location"}>
                this is content
            </CollapseComponent>
            <CollapseComponent label={"Accessibility"}>
                this is content
            </CollapseComponent>
            <CollapseComponent label={"Advanced settings"}>
                this is content
            </CollapseComponent>
            <div className="cation-action flex justify-between gap-10 ">
                <div
                    className="btn back-btn flex items-center justify-center gap-2"
                    onClick={onBack}
                >
                    <span>
                        <IoMdArrowBack />{" "}
                    </span>
                    <span>Back</span>
                </div>
                <div className="btn share-btn flex items-center justify-center gap-2">
                    <span>
                        <IoShareOutline />
                    </span>
                    <span>Share</span>
                </div>
            </div>
        </div>
    );
};

export default Caption;
