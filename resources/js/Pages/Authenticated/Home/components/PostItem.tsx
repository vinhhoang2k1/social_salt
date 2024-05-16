import React from "react";
import {
    IResPost,
    IResPostMedia,
    IResUser,
    IConfig,
} from "@/types/common/Common.type";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@inertiajs/inertia";
import NotificationIcon from "@/Components/Icons/Notification";
import CommentIcon from "@/Components/Icons/Comment";
import ShareIcon from "@/Components/Icons/Share";
import InputComment from "./InputComment";
import Slide from "./Slide";
import { router } from "@inertiajs/react";
import { PostData } from "../Home";
import { getTimeDifference } from "@/Utilities/function";
type Props = {
    post: PostData;
    user: IResUser;
    medias: Array<IResPostMedia>;
    // config: IConfig,
};
const PortItem = (props: Props) => {
    const { user, post, medias } = props;
    const { basePath } = usePage<PageProps>().props.config as IConfig;
    const mediaPaths = medias.map((media) => {
        return basePath + "/" + media.media_path;
    });
    const handleAddComment = (comment: string) => {
        router.post("/post/comment-create", {
            post_id: post.id,
            content: comment,
        });
    };
    return (
        <div className="post__item">
            <div className="post__item-head">
                <div className="show-info">
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
                    <div className="ported">{getTimeDifference(post.created_at)}</div>
                </div>
                <div className="more-action">...</div>
            </div>
            <div className="post__item-content">
                {/* render type in here */}
                {/* type video audio */}
                {/* <div className="video">
                    <video controls>
                        <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                    </video>
                </div> */}

                <Slide images={mediaPaths} />
            </div>
            <div className="post__item-action">
                <div className="react__list">
                    <span className="react__item">
                        <NotificationIcon active currentColor="red" />
                    </span>
                    <span className="react__item">
                        <CommentIcon />
                    </span>
                    <span className="react__item">
                        <ShareIcon />
                    </span>
                </div>
                <div className="liked">29 likes</div>
            </div>
            <div className="post__item-title">
                <span className="author-name">{user.fullname}</span>
                <span className="text">{post?.content}</span>
            </div>
            <div className="post__item-tags">
                {Array(5)
                    .fill(null)
                    .map((item, i) => (
                        <span key={`tag-${i}`} className="tag">
                            #name_{i}
                        </span>
                    ))}
            </div>
            <div
                className="post__item-all-comments"
                onClick={() => router.get("/post/view/" + post.id)}
            >
                View all {post.comments_count} comments
            </div>
            <div className="input-comment">
                <InputComment
                    onClickPost={(value) => {
                        handleAddComment(value);
                    }}
                />
            </div>
        </div>
    );
};

export default PortItem;
