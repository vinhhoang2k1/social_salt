import { IConfig, IFile } from "@/types/common/Common.type";
import { PageProps } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";
import { Typography } from "@material-tailwind/react";
import { CiCircleRemove } from "react-icons/ci";

type Props = {
    listMedia: IFile[];
    removeMedia: (media: IFile) => void;
};

const EditMedia = ({ listMedia, removeMedia }: Props) => {
    const { basePath } = usePage<PageProps>().props.config as IConfig;

    return (
        <div className="edit-media">
            <Typography className="heading pl-5" variant="h2">
                Edit you medias
            </Typography>
            <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 md:grid-cols-3">
                {listMedia.map((media, index) => (
                    <div
                        key={index}
                        className="wrap-image relative rounded-lg p-2"
                    >
                        {media.type == "image" && (
                            <img
                                className="h-40 w-full max-w-full rounded-lg object-contain object-center"
                                src={basePath + "/" + media.path}
                                alt="gallery-photo"
                            />
                        )}
                        {media.type == "video" && (
                            <>
                                <video controls>
                                    <source src={basePath + "/" + media.path} />
                                </video>
                            </>
                        )}

                        <CiCircleRemove
                            onClick={() => removeMedia(media)}
                            className="remove-btn"
                            color="red"
                            size={20}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EditMedia;
