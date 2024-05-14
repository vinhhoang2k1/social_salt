import { memo, useRef, useState } from "react";

type Props = {
    onClickPost: (value: string)=> void
};

const InputComment = (props: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isShowBtnPost, setIsShowBtnPost] = useState(false)
    return (
        <>
            <input
                type="text"
                ref={inputRef}
                className="input-cmt"
                placeholder="Add comment"
                onChange={(e) => {
                    if(e.target.value && !isShowBtnPost) {
                        setIsShowBtnPost(true)
                    } 
                    if(!e.target.value && isShowBtnPost) {
                        setIsShowBtnPost(false)
                    }
                }}
            />
            {
                isShowBtnPost && (
                    <span className="submit-cmt" onClick={() => {
                        props.onClickPost(inputRef.current?.value!)
                        if (inputRef.current) {
                            inputRef.current.value = '';
                        }
                    }}>Post</span>
                )
            }
        </>
    );
};

export default memo(InputComment);
