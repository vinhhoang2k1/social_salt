import AuthenticateLayout from "@/Layouts/AuthenticateLayout";
import { Head, router } from "@inertiajs/react";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { BsThreeDots } from "react-icons/bs";
import NotificationIcon from "@/Components/Icons/Notification";
import CommentIcon from "@/Components/Icons/Comment";
import ShareIcon from "@/Components/Icons/Share";

import "./style.scss";
import Comment, { ICommentPost } from "./Components/Comment";
import InputComment from "../Home/components/InputComment";
import { IBasePropsPage } from "@/types/common/Common.type";
import { IPost } from "@/types/Web/Post";
import { IComment } from "@/types/Web/Comment";
import { IUser } from "@/types";
import { IMedia } from "@/types/Web/Media";
import { useMemo, useState } from "react";
import { removeAtMention } from "@/Utilities/function";
import { IReactPost } from "@/types/Web/ReactPost";
import { fetcher } from "@/Api/Axios";
export interface IResponse extends IPost {
    comments: ICommentPost[];
    create_by: IUser;
    medias: IMedia[];
    reacted: IReactPost;
    count_react: number;
}
export type TSelectReply =
    | {
          commentId: string;
          replyTo: string;
      }
    | undefined;
type Props = {} & IBasePropsPage<IResponse>;

const ViewPost = ({ config, response }: Props) => {
    const [selectReply, setSelectReply] = useState<TSelectReply>();
    const [plusReact, setPlusReact] = useState(0);
    const [drafReact, setDrafReact] = useState<string>(response.reacted?.id);
    const handleAddComment = (comment: string) => {
        router.post("/post/comment-create", {
            post_id: response.id,
            content: removeAtMention(comment),
            comment_parent: selectReply?.commentId,
        });
    };
    const handleAddReact = async () => {
        const result = await fetcher.post("/post/react-create", {
            post_id: response.id,
            type: "POST",
        });
        if (result.data.status) {
            setDrafReact(result.data?.data?.id);
            setPlusReact(1);
        }
    };
    const handleUnReact = async () => {
        const result = await fetcher.post("/post/react-delete", {
            react_id: drafReact,
            type: "POST",
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
        if (response.id || drafReact) {
            return {
                active: true,
                currentColor: "red",
                id: response.id || drafReact,
            };
        }
        return {};
    }, [response.id, drafReact]);

    return (
        <>
            <Head title="View Post" />
            <AuthenticateLayout>
                <Dialog
                    open={true}
                    handler={() => router.get("/")}
                    className="post__view-dialog"
                >
                    <DialogBody>
                        <div id="post__view" className="flex ">
                            <div className="show-media">
                                <video controls>
                                    <source
                                        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                                        type="video/mp4"
                                    />
                                </video>
                            </div>
                            <div className="content">
                                <div className="author flex items-center justify-between">
                                    <div
                                        className="show-info flex items-center"
                                        onClick={() =>
                                            router.get(
                                                `/profile/${response.user_id}`,
                                            )
                                        }
                                    >
                                        <img
                                            src={
                                                config.basePath +
                                                "/" +
                                                response.create_by.avatar
                                            }
                                            alt=""
                                            className="circle author-avatar"
                                        />
                                        <span className="origin">
                                            <div className="author-name">
                                                {response.create_by.fullname}
                                            </div>
                                        </span>
                                    </div>
                                    <div className="action">
                                        <BsThreeDots />
                                    </div>
                                </div>
                                <div className="comment">
                                    <div className="author-caption">
                                        <div className="show-info flex items-center">
                                            <img
                                                src={
                                                    config.basePath +
                                                    "/" +
                                                    response.create_by.avatar
                                                }
                                                alt=""
                                                className="circle author-avatar"
                                            />
                                            <span className="origin flex items-center gap-1">
                                                <span className="author-name">
                                                    {
                                                        response.create_by
                                                            .fullname
                                                    }
                                                </span>
                                                <span className="caption">
                                                    {response.content}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    {response.comments.map((comment) => (
                                        <Comment
                                            key={`comment-${comment.id}`}
                                            comment={comment}
                                            setSelectReply={setSelectReply}
                                        />
                                    ))}
                                </div>
                                <div className="action-post">
                                    <div className="react__list flex gap-2">
                                        <span
                                            className="react__item"
                                            onClick={() => {
                                                statusReactPost?.id
                                                    ? handleUnReact()
                                                    : handleAddReact();
                                            }}
                                        >
                                            <NotificationIcon
                                                {...statusReactPost}
                                            />
                                        </span>
                                        <span className="react__item">
                                            <CommentIcon />
                                        </span>
                                        <span className="react__item">
                                            <ShareIcon />
                                        </span>
                                    </div>
                                    <div className="liked">
                                        {(response.count_react > 0 ||
                                            plusReact == 1) &&
                                            response.count_react +
                                                plusReact}{" "}
                                        likes
                                    </div>
                                    <div className="posted">1d</div>
                                    <div className="input-comment">
                                        <InputComment
                                            reply={selectReply}
                                            onClickPost={(value) => {
                                                handleAddComment(value);
                                            }}
                                            onClear={() =>
                                                setSelectReply(undefined)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogBody>
                </Dialog>
            </AuthenticateLayout>
        </>
    );
};

export default ViewPost;
