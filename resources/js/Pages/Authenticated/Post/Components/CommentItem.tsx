import React from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
type Props = {
    key?: string | number
};

const CommentItem = ({key}: Props) => {
    return (
        <div className="comment-item" key={key}>
            <div className="info flex items-start justify-between">
                <div className="show-info flex items-center">
                    <img
                        src="https://i.pravatar.cc/300"
                        alt=""
                        className="circle author-avatar"
                    />
                    <span className="origin flex gap-1 items-center">
                        <span className="author-name">Hoa Nguyen</span>
                        <span className="caption">
                            Another one for wind lovers in space
                        </span>
                    </span>
                </div>
                <div className="action-like">
                    <IoMdHeartEmpty />
                </div>
            </div>
            <div className="action flex gap-2">
                <span className="publiced">22h</span>
                <span className="liked">10 likes</span>
                <span className="reply">Reply</span>
            </div>
        </div>
    );
};

export default CommentItem;
