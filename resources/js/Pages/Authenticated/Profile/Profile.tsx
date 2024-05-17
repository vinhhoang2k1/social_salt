import React, { useMemo, useRef, useState, useEffect } from "react";
import AuthenticateLayout from "@/Layouts/AuthenticateLayout";
import {
    IResUser,
    IResFollow,
    IBasePropsPage,
    IConfig,
    IResPost,
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
import { usePage } from "@inertiajs/react";
import { PageProps } from "@inertiajs/inertia";
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
    isFollowing: boolean;
    posts: Array<IResPost>;
} & IBasePropsPage<{}>;

type ModalProps = {
    config: IConfig;
    heading: string;
    openLabel: string;
    apiPath: string;
}

const menu = {
    posts: "/",
    saved: "/saved",
    tagged: "/tagged",
};

export function FollowModal(props: ModalProps) {
    const [follows, setFollows] = useState<IResUser[]>([]);
    const {config, heading, openLabel, apiPath } = props;
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        const fetch = async () => {
            const { data } = await fetcher.get(apiPath);
            setFollows(data.follows);
        };
        fetch();
    }, []);


    const handleOpen = () => setOpen((cur) => !cur);

    return (
        <section className="modal">
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
                    <ul className="mt-4">
                        {follows?.map((item, key) => (
                            <div key={key} className="follow-item flex items-center my-2">
                                <a href={`/profile/${item.id}`} className="flex items-center">
                                    <img 
                                        style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '50%'
                                        }}
                                        src={config.basePath + "/" + item.avatar} 
                                        alt={item.fullname} 
                                    />
                                    <span className="px-2">{item.fullname}</span>
                                </a>
                            </div>
                        ))}
                    </ul>
                </DialogBody>
            </Dialog>
        </section>
    );
}

const Profile = (props: Props) => {
    const {config, auth, profileData, isFollowing, posts } = props;
    const [activeTab, setActiveTab] = useState("posts");
    const [avatarUrl, setAvatarUrl] = useState("");
    const inputAvatarRef = useRef<HTMLInputElement>(null);
    const { basePath } = usePage<PageProps>().props.config as IConfig;

    
    console.log('isFollowing,', isFollowing);
    
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

    const handleFollow = () => {
        const fetch = async () => {
            const { data } = await fetcher.get(`/profile/follow/${profileData.id}`);
            if (data.success == true) {
                // setFollowing(true);
            }
        };
        fetch();
    }

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
                                src={config.basePath + "/" + profileData.avatar}
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
                                    {profileData.fullname}
                                </h3>

                                {profileData.id == auth.user.id ? (
                                    <a href="/" className="grey">Edit profile</a>
                                ) : (
                                    <button className="blue-sky" onClick={handleFollow}>
                                         {isFollowing ? "Following" : "Follow"}
                                    </button>
                                )}
                                {/* <a href="/" className="grey">
                                    {profileData.id == auth.user.id
                                        ? "Edit profile"
                                        : "Follow"}
                                </a> */}
                                <a href="/" className="grey">
                                    View archive
                                </a>
                                <button>
                                    <Setting />
                                </button>
                            </div>

                            <div className="social">
                                <h3>
                                    {" "}
                                    <span>{posts.length}</span>posts
                                </h3>
                                <FollowModal
                                    config={config}
                                    apiPath={`/profile/followers/${profileData.id}`}
                                    heading="Followers"
                                    openLabel={
                                        String(profileData.followers.length) +
                                        " followers"
                                    }
                                />
                                <FollowModal
                                    config={config}
                                    apiPath={`/profile/following/${profileData.id}`}
                                    heading="Following"
                                    openLabel={
                                        String(profileData.following.length) +
                                        " following"
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="social-media">
                        <div className="add-btn">
                            <button className="" onClick={() => router.get('/post/create')}>
                                <Plus />
                            </button>
                            <span>New</span>
                        </div>

                        <div className="media-list">
                            <Tabs value={'POSTS'}>
                                <TabsHeader>
                                    {menus.map((menu, key) => (
                                        <Tab
                                            key={key}
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
                                        {posts.map((post, key) => (
                                            <TabPanel
                                                className="media__item"
                                                key={key}
                                                value={'POSTS'}
                                            >
                                                <img
                                                    src={basePath + "/" + post.medias[0]?.media_path}
                                                    alt=""
                                                />
                                               
                                                <div 
                                                    onClick={() => router.get(`/post/view/${post.id}`)}
                                                    className="media__preview"
                                                >
                                                    <div className="media__info">
                                                        <div className="like">
                                                            <HeartIcon />
                                                            <span>{Math.floor(Math.random() * 100) + 1}</span>
                                                        </div>
                                                        <div className="comment">
                                                            <CommentIcon />
                                                            <span>{post.comments_count}</span>
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
