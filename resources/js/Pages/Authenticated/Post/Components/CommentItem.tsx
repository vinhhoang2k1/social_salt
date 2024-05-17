import NotificationIcon from "@/Components/Icons/Notification";
import { getTimeDifference } from "@/Utilities/function";
import { IConfig } from "@/types/common/Common.type";
import { PageProps } from "@inertiajs/inertia";
import { router, usePage } from "@inertiajs/react";

import { fetcher } from "@/Api/Axios";
import { useMemo, useState } from "react";
import { IResponse, TSelectReply } from "../ViewPost";
import { ICommentPost } from "./Comment";
type Props = {
    key?: string | number;
    comment: ICommentPost;
    onReply?: (values: TSelectReply) => void;
    level: number;
};

const CommentItem = ({ key, comment, onReply, level }: Props) => {
    const { basePath } = usePage<PageProps>().props.config as IConfig;
    const { id: postId } = usePage<PageProps>().props.response as IResponse;
    const [plusReact, setPlusReact] = useState(0);
    const [drafReact, setDrafReact] = useState<string>(comment.reacted?.id);
    const handleAddReact = async () => {
        const result = await fetcher.post("/post/react-create", {
            post_id: postId,
            comment_id: comment.id,
            type: "COMMENT",
        });
        if (result.data.status) {
            setDrafReact(result.data?.data?.id);
            setPlusReact(1);
        }
    };

    const handleUnReact = async () => {
        const result = await fetcher.post("/post/react-delete", {
            react_id: drafReact,
            type: "COMMENT",
        });
        if (result.data.status) {
            setDrafReact("");
            setPlusReact(0);
        }
    };
    const statusReactPost = useMemo(() => {
        if (!drafReact) {
            return {};
        }
        if (postId || drafReact) {
            return {
                active: true,
                currentColor: "red",
                id: postId || drafReact,
            };
        }
        return {};
    }, [postId, drafReact]);

    return (
        <div className="comment-item" key={key}>
            <div className="info flex items-start justify-between">
                <div className="show-info flex items-center">
                    <img
                        src={basePath + "/" + comment.user.avatar}
                        alt=""
                        className="circle author-avatar"
                        onClick={() =>
                            router.get(`/profile/${comment.user_id}`)
                        }
                    />
                    <span className="origin flex items-center gap-1">
                        <span className="author-name">
                            {comment.user.fullname}
                        </span>
                        <span className="caption">{comment.content}</span>
                    </span>
                </div>
                {level == 1 && (
                    <div
                        className="action-like"
                        onClick={() => {
                            statusReactPost?.id
                                ? handleUnReact()
                                : handleAddReact();
                        }}
                    >
                        <NotificationIcon {...statusReactPost} />
                    </div>
                )}
            </div>
            <div className="action flex gap-2">
                <span className="publiced">
                    {getTimeDifference(comment.created_at)}
                </span>
                {level == 1 && onReply && (
                    <>
                        <span className="liked">
                            {(comment.count_react > 0 || plusReact == 1) &&
                                comment.count_react + plusReact}{" "}
                            likes
                        </span>
                        <span
                            className="reply"
                            onClick={() =>
                                onReply({
                                    commentId: comment.id,
                                    replyTo: comment.user.fullname.replaceAll(
                                        " ",
                                        "_",
                                    ),
                                })
                            }
                        >
                            Reply
                        </span>
                    </>
                )}
            </div>
        </div>
    );
};

export default CommentItem;
