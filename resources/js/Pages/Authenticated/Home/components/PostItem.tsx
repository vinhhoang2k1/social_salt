import React from "react";
import NotificationIcon from "@/Components/Icons/Notification";
import CommentIcon from "@/Components/Icons/Comment";
import ShareIcon from "@/Components/Icons/Share";
import InputComment from "./InputComment";
import Slide from "./Slide";
import { router } from "@inertiajs/react";
type Props = {};

const PortItem = (props: Props) => {
    return (
        <div className="post__item">
            <div className="post__item-head">
                <div className="show-info">
                    <img
                        src="https://i.pravatar.cc/300"
                        alt=""
                        className="circle author-avatar"
                    />
                    <span className="origin">
                        <div className="author-name">Hoa Nguyen</div>
                        <div className="type">Original Audio</div>
                    </span>
                    <div className="ported">6d</div>
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
                <Slide images={['https://picsum.photos/200', 'https://i.pravatar.cc/300','https://picsum.photos/200']}/>
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
                <span className="author-name">Hoa Nguyen</span>
                <span className="text">Visit Bui Chu church</span>
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
            <div className="post__item-all-comments" onClick={() => router.get('/post/view/asdfasdf')}>View all 103 comments</div>
            <div className="input-comment">
                <InputComment onClickPost={(value) => {console.log('value', value);
                }}/>
            </div>
        </div>
    );
};

export default PortItem;
