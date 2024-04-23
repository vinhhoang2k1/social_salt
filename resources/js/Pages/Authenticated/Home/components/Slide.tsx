import React, { useEffect, useRef, useState } from "react";

type Props = {
    images: string[];
};

const Slide = ({ images }: Props) => {
    const [selected, setSelected] = useState(0);
    const imgShowRef = useRef<HTMLImageElement>(null)
    useEffect(() => {
        imgShowRef.current?.setAttribute('src', images[selected])        
    }, [selected])
    
    return (
        <div className="image">
            <img src={images[0]} loading="lazy" ref={imgShowRef} alt="" className="slide" />
            {images.length > 1 && (
                <div className="navigation">
                    <img
                        
                        src="/images/png/arrow-left.png"
                        alt=""
                        className="circle nav-icon next-left "
                        onClick={() => {
                            setSelected(pre => {
                                if(pre - 1 == -1) {
                                    return images.length - 1
                                }
                                return pre - 1
                            })
                        }}
                    />
                    <img
                        src="/images/png/arrow-right.png"
                        alt=""
                        className="circle nav-icon next-right "
                        onClick={() => {
                            setSelected(pre => {
                                if(pre + 1 == images.length) {
                                    return 0
                                }
                                return pre + 1
                            })
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default Slide;
