import { IMedia } from "@/types/Web/Media";
import { IConfig, IResPostMedia } from "@/types/common/Common.type";
import { PageProps } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Props = {
    data: IResPostMedia[];
};

const Slide = ({ data }: Props) => {
    const [selected, setSelected] = useState(0);
    const imgShowRef = useRef<HTMLImageElement>(null);
    const { basePath } = usePage<PageProps>().props.config as IConfig;

    const images = useMemo(() => {
        return data
            .filter((item) => item.type == "image")
            .map((item) => item.media_path);
    }, [data]);
    useEffect(() => {
        imgShowRef.current?.setAttribute(
            "src",
            basePath + "/" + images[selected],
        );
    }, [selected]);
    {
        /* <div className="video">
                    <video controls>
                        <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                    </video>
                </div> */
    }

    return (
        <div className="image">
            <img
                src={basePath + "/" + images[0]}
                loading="lazy"
                ref={imgShowRef}
                alt=""
                className="slide"
            />
            {images.length > 1 && (
                <div className="navigation">
                    <img
                        src="/images/png/arrow-left.png"
                        alt=""
                        className="circle nav-icon next-left "
                        onClick={() => {
                            setSelected((pre) => {
                                if (pre - 1 == -1) {
                                    return images.length - 1;
                                }
                                return pre - 1;
                            });
                        }}
                    />
                    <img
                        src="/images/png/arrow-right.png"
                        alt=""
                        className="circle nav-icon next-right "
                        onClick={() => {
                            setSelected((pre) => {
                                if (pre + 1 == images.length) {
                                    return 0;
                                }
                                return pre + 1;
                            });
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default Slide;
