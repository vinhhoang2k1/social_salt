import CollapseComponent from "@/Components/Collapse/Collapse";
import TextArea from "@/Components/Inputs/TextArea";
import useBetterForm from "@/Utilities/useBetterForm";
import { IConfig, IFile, IResUser } from "@/types/common/Common.type";
import { PageProps, RequestPayload } from "@inertiajs/inertia";
import { router, usePage } from "@inertiajs/react";
import { Radio } from "@material-tailwind/react";
import { useMemo, useRef } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { IoShareOutline } from "react-icons/io5";
type Props = {
    onBack: () => void;
    medias: IFile[];
};
interface TMedia extends IFile {
    caption: string;
}
type TPostPayload = {
    content: string;
    media: null | any;
    st_public: string; // 0: Follower, 1: All, 2: Private
};

const Caption = ({ onBack, medias }: Props) => {
    const { basePath } = usePage<PageProps>().props.config as IConfig;
    const { user } = usePage<PageProps>().props.auth as { user: IResUser };
    const mediasData = useMemo(
        () => medias.map((media): TMedia => ({ ...media, caption: "" })),
        [medias],
    );
    const accessbilityRef = useRef<TMedia[]>(mediasData);
    const postForm = useBetterForm<TPostPayload>({
        content: "",
        st_public: "1",
        media: null,
    });
    const handlePostForm = () => {
        const formValues = {
            ...postForm.data,
            media: accessbilityRef.current,
        } as unknown;
        router.post("/post/create", formValues as RequestPayload, {
            onError: (e) => {
                for (let k in e) {
                    postForm.setError(k as any, e[k]);
                }
            },
        });
    };
    console.log("postForm", postForm.data);

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
                <TextArea
                    label=""
                    name="content"
                    autoFocus
                    value={postForm.data.content}
                    errorMsg={postForm.errors.content}
                    hideError={postForm.isDirty("content")}
                    disabled={postForm.processing}
                    className="cs-input"
                    autoComplete="content"
                    onChange={(e) =>
                        postForm.setData("content", e.target.value)
                    }
                    required={false}
                    // classNameWrap="wrap-input"
                    placeholder="Write a caption"
                />
            </div>
            <CollapseComponent label={"Tag friends"}>
                Tag your friends
            </CollapseComponent>
            <CollapseComponent label={"Location"}>
                this is content
            </CollapseComponent>
            <CollapseComponent label={"Accessibility"}>
                {mediasData.map((media, index) => (
                    <div
                        className="accessbility-item flex items-center  gap-3"
                        key={`media-${media.path}`}
                    >
                        <span className="media">
                            {media.type == "image" && (
                                <img
                                    className="h-40 w-full max-w-full rounded-lg object-contain object-center"
                                    src={basePath + "/" + media.path}
                                    alt="gallery-photo"
                                />
                            )}
                            {media.type == "video" && (
                                <video>
                                    <source src={basePath + "/" + media.path} />
                                </video>
                            )}
                        </span>
                        <textarea
                            className="caption"
                            onChange={(e) => {
                                accessbilityRef.current[index].caption =
                                    e.target.value;
                            }}
                            placeholder="Write a caption"
                            cols={3}
                        />
                    </div>
                ))}
            </CollapseComponent>
            <CollapseComponent label={"Advanced settings"}>
                <div className="setting-item p-2">
                    <h3>who will see your posts ?</h3>
                    <div>
                        <Radio
                            name="st_public"
                            value={"0"}
                            onChange={(e) =>
                                postForm.setData("st_public", e.target.value)
                            }
                            label="Follower"
                        />
                    </div>
                    <div>
                        <Radio
                            name="st_public"
                            value={"1"}
                            label="All"
                            onChange={(e) =>
                                postForm.setData("st_public", e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <Radio
                            name="st_public"
                            value={"2"}
                            label="Only me "
                            onChange={(e) =>
                                postForm.setData("st_public", e.target.value)
                            }
                        />
                    </div>
                </div>
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
                <button
                    className="btn share-btn flex items-center justify-center gap-2"
                    onClick={handlePostForm}
                >
                    <span>
                        <IoShareOutline />
                    </span>
                    <span>Share</span>
                </button>
            </div>
        </div>
    );
};

export default Caption;
