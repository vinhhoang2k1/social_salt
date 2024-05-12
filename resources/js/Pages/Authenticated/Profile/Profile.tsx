import React, { useMemo, useRef, useState, useEffect } from "react";
import AuthenticateLayout from "@/Layouts/AuthenticateLayout";
import {
    IResUser,
    IResFollow,
    IBasePropsPage,
} from "@/types/common/Common.type";
import { Head, router } from "@inertiajs/react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    IconButton,
    Typography,
    Input,
} from "@material-tailwind/react";
import { fetcher } from "@/Api/Axios";
import ListIcon from "./components/Icons/List";
import SavedIcon from "./components/Icons/Saved";
import TaggedIcon from "./components/Icons/Tagged";
import HeartIcon from "./components/Icons/Heart";
import CommentIcon from "./components/Icons/Comment";
import Setting from "./components/Icons/Setting";
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

type Props = {
    profileData: IResUser;
} & IBasePropsPage<{}>;

type ModalProps = {
    heading: string;
    openLabel: string;
    followData: Array<IResUser>,
};

const menu = {
    posts: "/",
    saved: "/saved",
    tagged: "/tagged",
};

export function FollowModal(props: ModalProps) {
    const { heading, openLabel, followData } = props;
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen((cur) => !cur);

    return (
        <section>
            <Button onClick={handleOpen}>{openLabel}</Button>
            <Dialog
                className="modal__body grid p-4"
                size="md"
                open={open}
                handler={handleOpen}
            >
                <DialogHeader className="justify-between">
                    <Typography color="blue-gray" className="mb-1 font-bold">
                        {heading}
                    </Typography>
                    <IconButton size="sm" variant="text" onClick={handleOpen}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </DialogHeader>
                <DialogBody className="overflow-y-scroll">
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full rounded-md p-1"
                        />
                    </div>
                    <ul>
                        {followData.map(item => (
                            <>
                                <h2>{item.fullname}</h2>
                            </>
                        ))}
                    </ul>
                </DialogBody>
            </Dialog>
        </section>
    );
}

const Profile = (props: Props) => {
    const [followers, setFollowers] = useState([]);
    const {config, auth, profileData } = props;
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

    console.log('state', followers);
    useEffect(() => {
        const fetch = async () => {
            const { data } = await fetcher.get("/profile/followers");
            setFollowers(data.followers);
        };
        fetch();
    }, []);

    const postList = [
        {
            group: "POSTS",
            media_path: "https://i.pravatar.cc/300",
            media_type: 0,
            title: "post 1",
        },
        {
            group: "SAVED",
            media_path:
                "https://videocdn.cdnpk.net/joy/content/video/free/2019-12/large_preview/190915_B_02_HaLong_11.mp4",
            media_type: 1,
            title: "post 2",
        },
        {
            group: "TAGGED",
            media_path: "https://i.pravatar.cc/300",
            media_type: 0,
            title: "post 3",
        },
        {
            group: "POSTS",
            media_path:
                "https://videocdn.cdnpk.net/joy/content/video/free/2019-12/large_preview/190915_B_02_HaLong_11.mp4",
            media_type: 1,
            title: "post 4",
        },
        {
            group: "SAVED",
            media_path: "https://i.pravatar.cc/300",
            media_type: 0,
            title: "post 5",
        },
        {
            group: "TAGGED",
            media_path: "https://i.pravatar.cc/300",
            media_type: 0,
            title: "post 6",
        },
        {
            group: "POSTS",
            media_path: "https://i.pravatar.cc/300",
            media_type: 0,
            title: "post 7",
        },
        {
            group: "SAVED",
            media_path: "https://i.pravatar.cc/300",
            media_type: 0,
            title: "post 8",
        },
        {
            group: "TAGGED",
            media_path: "https://i.pravatar.cc/300",
            media_type: 0,
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
                            <img
                                src={config.basePath + "/" + auth.user.avatar}
                                alt=""
                            />
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
                                <button className="grey">Edit profile</button>
                                <button className="grey">View archive</button>
                                <button>
                                    <Setting />
                                </button>
                            </div>

                            <div className="social">
                                <h3>
                                    {" "}
                                    <span>{profileData.posts.length}</span>posts
                                </h3>
                                <FollowModal
                                    heading="Followers"
                                    openLabel={
                                        String(profileData.followers.length) +
                                        " followers"
                                    }
                                    followData={followers}
                                />
                                <FollowModal
                                    heading="Following"
                                    openLabel={
                                        String(profileData.following.length) +
                                        " following"
                                    }
                                    followData={[]}
                                />
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
                                        {postList.map((post) => (
                                            <TabPanel
                                                className="media__item"
                                                key={post.group}
                                                value={post.group}
                                            >
                                                {post.media_type == 0 ? (
                                                    <img
                                                        src={post.media_path}
                                                        alt=""
                                                    />
                                                ) : (
                                                    <video controls>
                                                        <source
                                                            src={
                                                                post.media_path
                                                            }
                                                            type="video/mp4"
                                                        />
                                                    </video>
                                                )}

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
