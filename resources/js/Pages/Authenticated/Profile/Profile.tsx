import { useMemo, useRef, useState } from "react";
import AuthenticateLayout from "@/Layouts/AuthenticateLayout";
import { IBasePropsPage } from "@/types/common/Common.type";
import { Head, router } from "@inertiajs/react";
import ListIcon from "./components/Icons/List";
import SavedIcon from "./components/Icons/Saved";
import TaggedIcon from "./components/Icons/Tagged";
import HeartIcon from "./components/Icons/Heart";
import CommentIcon from "./components/Icons/Comment";
import Plus from "./components/Icons/Plus";
import { CiEdit } from "react-icons/ci";
import "./style.scss";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Avatar,
} from "@material-tailwind/react";

type Props = {} & IBasePropsPage<{}>;

const menu = {
    posts: "/",
    saved: "/saved",
    tagged: "/tagged",
};

const Profile = ({ config, auth}: Props) => {
    const [activeTab, setActiveTab] = useState("posts");
    const [avatarUrl, setAvatarUrl] = useState("");
    const inputAvatarRef = useRef<HTMLInputElement>(null);
    const menus = useMemo(() => {
        return [
            {
                label: "POSTS",
                icon: (
                    <ListIcon
                        currentColor="#000"
                        active={location.pathname == menu.posts}
                    />
                ),
                link: menu.posts,
            },
            {
                label: "SAVED",
                icon: (
                    <SavedIcon
                        currentColor="#000"
                        active={location.pathname == menu.saved}
                    />
                ),
                link: menu.saved,
            },
            {
                label: "TAGGED",
                icon: (
                    <TaggedIcon
                        currentColor="#000"
                        active={location.pathname == menu.tagged}
                    />
                ),
                link: menu.tagged,
            },
        ];
    }, [location.pathname, menu]);

    const posts = [
        {
            group: "POSTS",
            media_path: "https://i.pravatar.cc/300",
            title: "post 1",
        },
        {
            group: "SAVED",
            media_path: "https://i.pravatar.cc/300",
            title: "post 2",
        },
        {
            group: "TAGGED",
            media_path: "https://i.pravatar.cc/300",
            title: "post 3",
        },
        {
            group: "POSTS",
            media_path: "https://i.pravatar.cc/300",
            title: "post 4",
        },
        {
            group: "SAVED",
            media_path: "https://i.pravatar.cc/300",
            title: "post 5",
        },
        {
            group: "TAGGED",
            media_path: "https://i.pravatar.cc/300",
            title: "post 6",
        },
        {
            group: "POSTS",
            media_path: "https://i.pravatar.cc/300",
            title: "post 7",
        },
        {
            group: "SAVED",
            media_path: "https://i.pravatar.cc/300",
            title: "post 8",
        },
        {
            group: "TAGGED",
            media_path: "https://i.pravatar.cc/300",
            title: "post 9",
        },
    ];

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };
    const handleImageUpload = (event) => {
        router.post(
            "/profile/change-avatar",
            { file: event.target.files[0] },
            {
                forceFormData: true,
            },
        );
    };

    return (
        <>
            <Head title="Home page" />
            <AuthenticateLayout>
                <div id="profile">
                    <div className="head">
                        <div className="avatar">
                            <img src={config.basePath + '/' + auth.user.avatar} alt="" />
                            <div
                                className="backrop-edit"
                                onClick={() => inputAvatarRef.current?.click()}
                            >
                                <CiEdit />
                            </div>
                            <input
                                ref={inputAvatarRef}
                                className="upload-avatar"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </div>

                        <div className="info">
                            <div className="action">
                                <h3 className="fullname">
                                    {auth.user.fullname}
                                </h3>
                                <button>Edit profile</button>
                                <button>View archive</button>
                            </div>

                            <div className="social">
                                <h3>
                                    <span>6</span>posts
                                </h3>
                                <button>
                                    <h3>
                                        <span>27</span> followers
                                    </h3>
                                </button>
                                <button>
                                    <h3>
                                        <span>64</span> following
                                    </h3>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="social-media">
                        <div className="add-btn">
                            <button className="">
                                <Plus />
                            </button>
                            <span>New</span>
                        </div>

                        <div className="media-list">
                            <Tabs value="POSTS">
                                <TabsHeader>
                                    {menus.map((menu) => (
                                        <Tab
                                            key={menu.label}
                                            value={menu.label}
                                            className="label"
                                        >
                                            <div className="group-btn">
                                                <span className="icon">
                                                    {menu.icon}
                                                </span>
                                                <span className="label">
                                                    {menu.label}
                                                </span>
                                            </div>
                                        </Tab>
                                    ))}
                                </TabsHeader>
                                <TabsBody>
                                    <div className="media__container">
                                        {posts.map((post) => (
                                            <TabPanel
                                                className="media__item"
                                                key={post.group}
                                                value={post.group}
                                            >
                                                <img
                                                    src={post.media_path}
                                                    alt=""
                                                />
                                                <div className="media__preview">
                                                    <div className="media__info">
                                                        <div className="like">
                                                            <span>
                                                                <HeartIcon />
                                                            </span>
                                                            <span>99</span>
                                                        </div>
                                                        <div className="comment">
                                                            <span>
                                                                <CommentIcon />
                                                            </span>
                                                            <span>9</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TabPanel>
                                        ))}
                                    </div>
                                </TabsBody>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </AuthenticateLayout>
        </>
    );
};

export default Profile;
