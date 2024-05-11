import MediaIcon from "@/Components/Icons/Media";
import AuthenticateLayout from "@/Layouts/AuthenticateLayout";
import { IBasePropsPage, IFile } from "@/types/common/Common.type";
import { Head, router } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import "./style.scss";
import EditMedia from "./Components/EditMedia";
import StepMedia from "./Components/StepMedia";
import { GrLinkNext } from "react-icons/gr";
import Caption from "./Components/Caption";

type Props = {} & IBasePropsPage<{}>;
export const STEP = {
    upload: "uploads",
    preivew: "preview",
    caption: "caption",
};
const CreatePost = (props: Props) => {
    const inputAvatarRef = useRef<HTMLInputElement>(null);
    const fileAfterUploaded = props.uploads?.data as IFile[];
    const [step, setStep] = useState(STEP.upload);
    const [medias, setMedias] = useState<IFile[]>([]);
    const handleMediaUpload = (event) => {
        router.post(
            "/upload-multiple",
            { files: event.target.files },
            {
                forceFormData: true,
            },
        );
    };
    const handleRemoveMedia = (media: IFile) => {
        const newMedias = medias.filter((item) => item.path != media.path);
        setMedias(newMedias);
    };
    useEffect(() => {
        if (fileAfterUploaded) {
            setMedias((pre) => [...pre].concat(fileAfterUploaded));
            if (STEP.preivew != step) {
                setStep(STEP.preivew);
            }
        }
    }, [fileAfterUploaded]);

    return (
        <>
            <Head title="Home page" />
            <AuthenticateLayout>
                <div id="post__create" className="relative">
                    <StepMedia currentStep={step} />
                    <input
                        multiple
                        ref={inputAvatarRef}
                        name="files"
                        className="upload-media"
                        type="file"
                        accept="image/* | video/mp4"
                        onChange={handleMediaUpload}
                    />
                    {step == STEP.upload && (
                        <div className="pre-create mt-20">
                            <div>
                                <h1 className="create-title text-center">
                                    Create new post
                                </h1>
                                <MediaIcon className="media-icon" />
                                <h2 className="text-center">
                                    Select photos and video here
                                </h2>
                                <div
                                    className="btn select-media"
                                    onClick={() =>
                                        inputAvatarRef.current?.click()
                                    }
                                >
                                    Select from computer
                                </div>
                            </div>
                        </div>
                    )}
                    {step != STEP.upload && (
                        <div className="content flex justify-between">
                            <div className="section-media">
                                <EditMedia
                                    listMedia={medias}
                                    removeMedia={handleRemoveMedia}
                                />
                            </div>
                            {step == STEP.caption && (
                                <div className={`section-caption show`}>
                                    <Caption
                                        medias={medias}
                                        onBack={() => setStep(STEP.preivew)}
                                    />
                                </div>
                            )}
                            {step != STEP.caption && (
                                <div className="more-action-media flex gap-2">
                                    <div
                                        className="btn flex items-center justify-center gap-2"
                                        onClick={() =>
                                            inputAvatarRef.current?.click()
                                        }
                                    >
                                        <span>
                                            <IoCloudUploadOutline />{" "}
                                        </span>
                                        <span>Select from computer</span>
                                    </div>
                                    <div
                                        className="btn next-to-cation flex items-center justify-center gap-2"
                                        onClick={() => setStep(STEP.caption)}
                                    >
                                        <span>
                                            <GrLinkNext />
                                        </span>
                                        <span>Continue</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </AuthenticateLayout>
        </>
    );
};

export default CreatePost;
