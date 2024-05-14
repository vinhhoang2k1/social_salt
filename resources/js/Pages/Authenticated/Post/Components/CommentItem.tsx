import { getTimeDifference } from "@/Utilities/function";
import { IComment } from "@/types/Web/Comment";
import { IConfig } from "@/types/common/Common.type";
import { PageProps } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";
import React from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
type Props = {
    key?: string | number;
    comment: IComment;
};

const CommentItem = ({ key, comment }: Props) => {
    const { basePath } = usePage<PageProps>().props.config as IConfig;

    return (
        <div className="comment-item" key={key}>
            <div className="info flex items-start justify-between">
                <div className="show-info flex items-center">
                    <img
                        src={basePath + '/' + comment.user.avatar}
                        alt=""
                        className="circle author-avatar"
                    />
                    <span className="origin flex items-center gap-1">
                        <span className="author-name">{comment.user.fullname}</span>
                        <span className="caption">
                            {comment.content}
                        </span>
                    </span>
                </div>
                <div className="action-like">
                    <IoMdHeartEmpty />
                </div>
            </div>
            <div className="action flex gap-2">
                <span className="publiced">{getTimeDifference(comment.created_at)}</span>
                <span className="liked">10 likes</span>
                <span className="reply">Reply</span>
            </div>
        </div>
    );
};

export default CommentItem;
