import AuthenticateLayout from "@/Layouts/AuthenticateLayout";
import { Head, router } from "@inertiajs/react";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { BsThreeDots } from "react-icons/bs";
import NotificationIcon from "@/Components/Icons/Notification";
import CommentIcon from "@/Components/Icons/Comment";
import ShareIcon from "@/Components/Icons/Share";

import "./style.scss";
import Comment from "./Components/Comment";
import InputComment from "../Home/components/InputComment";

type Props = {};
const ViewPost = (props: Props) => {
    return (
        <>
            <Head title="View Post" />
            <AuthenticateLayout>
                <Dialog
                    open={true}
                    handler={() => router.get('/')}
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
                                    <div className="show-info flex items-center">
                                        <img
                                            src="https://i.pravatar.cc/300"
                                            alt=""
                                            className="circle author-avatar"
                                        />
                                        <span className="origin">
                                            <div className="author-name">
                                                Hoa Nguyen
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
                                                src="https://i.pravatar.cc/300"
                                                alt=""
                                                className="circle author-avatar"
                                            />
                                            <span className="origin flex gap-1 items-center">
                                                <span className="author-name">
                                                    Hoa Nguyen
                                                </span>
                                                <span className="caption">
                                                    Another one for wind lovers
                                                    in space
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    {Array.from([1, 2, 3, 4]).map((item) => (
                                        <Comment key={`comment-${item}`} />
                                    ))}
                                </div>
                                <div className="action-post">
                                    <div className="flex gap-2 react__list">
                                        <span className="react__item">
                                            <NotificationIcon
                                                active
                                                currentColor="red"
                                            />
                                        </span>
                                        <span className="react__item">
                                            <CommentIcon />
                                        </span>
                                        <span className="react__item">
                                            <ShareIcon />
                                        </span>
                                    </div>
                                    <div className="liked">29 likes</div>
                                    <div className="posted">1d</div>
                                    <div className="input-comment">
                                        <InputComment
                                            onClickPost={(value) => {
                                                console.log("value", value);
                                            }}
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
