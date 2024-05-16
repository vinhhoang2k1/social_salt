import { memo, useEffect, useRef, useState } from "react";
import { TSelectReply } from "../../Post/ViewPost";
import { removeAtMention } from "@/Utilities/function";

type Props = {
    onClickPost: (value: string)=> void
    reply: TSelectReply | undefined
    onClear: () => void
};

const InputComment = (props: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isShowBtnPost, setIsShowBtnPost] = useState(false)
    useEffect(() => {
        if(props.reply && inputRef.current) {
            if(inputRef.current.value) {
                inputRef.current.value = removeAtMention(inputRef.current.value)
            }
            inputRef.current.value = `@${props.reply.replyTo} ` + inputRef.current.value;
        }
    }, [props.reply, inputRef])
    
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
                    if(!e.target.value) {
                        props.onClear()
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
