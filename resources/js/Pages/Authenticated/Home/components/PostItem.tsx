import { fetcher } from "@/Api/Axios";
import CommentIcon from "@/Components/Icons/Comment";
import NotificationIcon from "@/Components/Icons/Notification";
import ShareIcon from "@/Components/Icons/Share";
import { getTimeDifference } from "@/Utilities/function";
import { IConfig, IResPostMedia, IResUser } from "@/types/common/Common.type";
import { PageProps } from "@inertiajs/inertia";
import { router, usePage } from "@inertiajs/react";
import { FaRegBookmark } from "react-icons/fa";
import { GoBookmarkFill } from "react-icons/go";
import { PostData } from "../Home";
import InputComment from "./InputComment";
import Slide from "./Slide";
import { useMemo, useState } from "react";
type Props = {
    post: PostData;
    user: IResUser;
    medias: Array<IResPostMedia>;
};
const PortItem = (props: Props) => {
    const { user, post, medias } = props;
    const { basePath } = usePage<PageProps>().props.config as IConfig;
    const [drafReact, setDrafReact] = useState<string>(post.reacted?.id);
    const [drafBookmark, setDrafBookmark] = useState<string>(
        post.bookmarked?.id,
    );
    const mediaPaths = medias.map((media) => {
        return basePath + "/" + media.media_path;
    });
    const handleAddComment = (comment: string) => {
        router.post("/post/comment-create", {
            post_id: post.id,
            content: comment,
        });
    };
    const handleAddReact = async () => {
        const result = await fetcher.post("/post/react-create", {
            post_id: post.id,
            type: "POST",
        });
        if (result.data.status) {
            setDrafReact(result.data?.data?.id);
        }
    };
    const statusReactPost = useMemo(() => {
        if (!drafReact) {
            return {};
        }
        if (post.reacted?.id || drafReact) {
            return {
                active: true,
                currentColor: "red",
                id: post.reacted?.id || drafReact,
            };
        }
        return {};
    }, [post.reacted, drafReact]);
    const statusBookmarkPost = useMemo(() => {
        if (!drafBookmark) {
            return {};
        }
        if (post.bookmarked?.id || drafBookmark) {
            return {
                active: true,
                currentColor: "red",
                id: post.bookmarked?.id || drafBookmark,
            };
        }
        return {};
    }, [post.bookmarked, drafBookmark]);

    const handleUnReact = async (reactId: string) => {
        const result = await fetcher.post("/post/react-delete", {
            react_id: reactId,
            type: "POST",
        });
        if (result.data.status) {
            setDrafReact("");
        }
    };
    const handleAddBookmark = async (postId: string) => {
        const result = await fetcher.post("/post/bookmark-create", {
            post_id: postId,
        });
        if (result.data.status) {
            setDrafBookmark(result.data?.data?.id);
        }
    };
    const handleUnBookmark = async (bookmarkId: string) => {
        const result = await fetcher.post("/post/bookmark-delete", {
            bookmark_id: bookmarkId,
        });
        if (result.data.status) {
            setDrafBookmark("");
        }
    };
    return (
        <div className="post__item">
            <div className="post__item-head">
                <div
                    className="show-info"
                    onClick={() => router.get(`/profile/${post.user_id}`)}
                >
                    <img
                        onClick={() => router.get(`/profile/${user.id}`)}
                        src={basePath + "/" + user.avatar}
                        alt=""
                        className="circle author-avatar"
                    />
                    <span className="origin">
                        <div className="author-name">{user.fullname}</div>
                        <div className="type">Original Audio</div>
                    </span>
                    <div className="ported">
                        {getTimeDifference(post.created_at)}
                    </div>
                </div>
                <div className="more-action">...</div>
            </div>
            <div className="post__item-content">
                {/* render type in here */}
                {/* type video audio */}
               

                <Slide data={post.medias} />
            </div>
            <div className="post__item-action">
                <div className="react__list flex justify-between">
                    <div className="flex items-center gap-2">
                        <span
                            className="react__item"
                            onClick={() => {
                                statusReactPost?.id
                                    ? handleUnReact(statusReactPost?.id)
                                    : handleAddReact();
                            }}
                        >
                            <NotificationIcon {...statusReactPost} />
                        </span>
                        <span className="react__item">
                            <CommentIcon />
                        </span>
                        <span className="react__item">
                            <ShareIcon />
                        </span>
                    </div>
                    <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            statusBookmarkPost?.id
                                ? handleUnBookmark(statusBookmarkPost?.id)
                                : handleAddBookmark(post.id);
                        }}
                    >
                        {statusBookmarkPost?.id ? (
                            <GoBookmarkFill />
                        ) : (
                            <FaRegBookmark />
                        )}
                    </div>
                </div>
                <div className="liked">
                    {post.count_react > 0 && post.count_react} likes
                </div>
            </div>
            <div className="post__item-title">
                <span className="author-name">{user.fullname}</span>
                <span className="text">{post?.content}</span>
            </div>
            <div className="post__item-tags">
                {/* {Array(5)
                    .fill(null)
                    .map((item, i) => (
                        <span key={`tag-${i}`} className="tag">
                            #name_{i}
                        </span>
                    ))} */}
            </div>
            <div
                className="post__item-all-comments"
                onClick={() => router.get("/post/view/" + post.id)}
            >
                View all {post.comments_count} comments
            </div>
            <div className="input-comment">
                <InputComment
                    reply={undefined}
                    onClickPost={(value) => {
                        handleAddComment(value);
                    }}
                />
            </div>
        </div>
    );
};

export default PortItem;
