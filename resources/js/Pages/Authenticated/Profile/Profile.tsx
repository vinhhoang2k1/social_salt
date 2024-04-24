import { useState } from "react";
import AuthenticateLayout from "@/Layouts/AuthenticateLayout";
import { IBasePropsPage } from "@/types/common/Common.type";
import { Head } from "@inertiajs/react";
import ProfileAvatar from "./components/Avatar";
import Button from "./components/Button";
import "./style.scss";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";

type Props = {} & IBasePropsPage<{}>;

const Profile = (props: Props) => {
    const { auth } = props;
    const [activeTab, setActiveTab] = useState("posts");

    console.log(props);

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const postsGroup = [
        {
            label: "POSTS",
            value: "POSTS",
            desc: `posts list`,
        },
        {
            label: "SAVED",
            value: "SAVED",
            desc: `saved posts`,
        },
        {
            label: "TAGGED",
            value: "TAGGED",
            desc: `tagged posts`,
        },
    ];

    return (
        <>
            <Head title="Home page" />
            <AuthenticateLayout>
                <div id="profile">
                    <div className="head">
                        <div className="avatar">
                            <a href="">
                                <img src="https://i.pravatar.cc/300" alt="" />``
                            </a>
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
                                <svg
                                    aria-label="Plus icon"
                                    className="x1lliihq x1n2onr6 x10xgr34"
                                    fill="currentColor"
                                    height="44"
                                    role="img"
                                    viewBox="0 0 24 24"
                                    width="44"
                                >
                                    <title>Plus icon</title>
                                    <path d="M21 11.3h-8.2V3c0-.4-.3-.8-.8-.8s-.8.4-.8.8v8.2H3c-.4 0-.8.3-.8.8s.3.8.8.8h8.2V21c0 .4.3.8.8.8s.8-.3.8-.8v-8.2H21c.4 0 .8-.3.8-.8s-.4-.7-.8-.7z"></path>
                                </svg>
                            </button>
                            <span>New</span>
                        </div>

                        <div className="media__list">

                            <Tabs value="POSTS">
                                <TabsHeader>
                                    {postsGroup.map(({ label, value }) => (
                                        <Tab key={value} value={value} className="label">
                                            {label}
                                        </Tab>
                                    ))}
                                </TabsHeader>
                                <TabsBody>
                                    {postsGroup.map(({ value, desc }) => (
                                        <TabPanel key={value} value={value}>
                                            {desc}
                                        </TabPanel>
                                    ))}
                                </TabsBody>
                            </Tabs>

                            {/* <div className="group-btn">
                                <button
                                    className={
                                        activeTab === "posts" ? "active" : ""
                                    }
                                    onClick={() => handleTabClick("posts")}
                                >
                                    Posts
                                </button>
                                <button
                                    className={
                                        activeTab === "saved" ? "active" : ""
                                    }
                                    onClick={() => handleTabClick("saved")}
                                >
                                    Saved
                                </button>
                                <button
                                    className={
                                        activeTab === "tagged" ? "active" : ""
                                    }
                                    onClick={() => handleTabClick("tagged")}
                                >
                                    Tagged
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </AuthenticateLayout>
        </>
    );
};

export default Profile;
