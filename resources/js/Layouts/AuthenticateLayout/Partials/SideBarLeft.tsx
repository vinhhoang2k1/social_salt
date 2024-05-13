import CreateIcon from "@/Components/Icons/Create";
import ExploreIcon from "@/Components/Icons/Explore";
import HomeIcon from "@/Components/Icons/Home";
import MessageIcon from "@/Components/Icons/Message";
import NotificationIcon from "@/Components/Icons/Notification";
import ProfileIcon from "@/Components/Icons/Profile";
import ReelsIcon from "@/Components/Icons/Reels";
import SearchIcon from "@/Components/Icons/Search";
import { IConfig, IResUser } from "@/types/common/Common.type";
import { PageProps } from "@inertiajs/inertia";
import { router, usePage } from "@inertiajs/react";
import {
    Button,
    Dialog,
    DialogBody
} from "@material-tailwind/react";
import { useMemo, useState } from "react";
import { IoLogOutOutline, IoMenu } from "react-icons/io5";

const menu = {
    home: "/",
    search: "/search",
    explore: "/explore",
    reels: "/reels",
    messages: "/messages",
    notifications: "/notifications",
    create: "/post/create",
    profile: "/profile",
};
const SideBarLeft = () => {
    const { basePath } = usePage<PageProps>().props.config as IConfig;
    const [showMore, setShowMore] = useState(false)
    const { user } = usePage<PageProps>().props.auth as { user: IResUser };

    const menus = useMemo(() => {
        return [
            {
                label: "Home",
                icon: (
                    <HomeIcon
                        currentColor="#000"
                        active={location.pathname == menu.home}
                    />
                ),
                link: menu.home,
            },
            {
                label: "Search",
                icon: (
                    <SearchIcon
                        currentColor="#000"
                        active={location.pathname == menu.search}
                    />
                ),
                link: menu.search,
            },
            {
                label: "Explore",
                icon: (
                    <ExploreIcon
                        currentColor="#000"
                        active={location.pathname == menu.explore}
                    />
                ),
                link: menu.explore,
            },
            {
                label: "Reels",
                icon: (
                    <ReelsIcon
                        currentColor="#000"
                        active={location.pathname == menu.reels}
                    />
                ),
                link: menu.reels,
            },
            {
                label: "Messages",
                icon: (
                    <MessageIcon
                        currentColor="#000"
                        active={location.pathname == menu.messages}
                    />
                ),
                link: menu.messages,
            },
            {
                label: "Notifications",
                icon: (
                    <NotificationIcon
                        currentColor="#000"
                        active={location.pathname == menu.notifications}
                    />
                ),
                link: menu.notifications,
            },
            {
                label: "Create",
                icon: (
                    <CreateIcon
                        currentColor="#000"
                        active={location.pathname == menu.create}
                    />
                ),
                link: menu.create,
            },
            {
                label: "Profile",
                icon: (
                    <ProfileIcon
                        currentColor="#000"
                        active={location.pathname == menu.profile}
                        avatar={`${basePath}/${user.avatar}`}
                    />
                ),
                link: menu.profile,
            },
        ];
    }, [location.pathname, menu, user.avatar]);
    return (
        <div className="side-bar-left">
            <div className="head">logo</div>
            <div className="menus">
                {menus.map((menu) => (
                    <div
                        key={`menu-item-${menu.label}`}
                        className={`menu-item  ${location.pathname == menu.link ? "active" : null}`}
                        onClick={() => router.get(menu.link)}
                    >
                        <span className="menu-icon">{menu.icon}</span>
                        <span className="menu-label">{menu.label}</span>
                    </div>
                ))}
            </div>
            <div className="more-action">
                <IoMenu size={"30"} onClick={() => setShowMore(true)} />
                <Dialog open={showMore} handler={() => setShowMore(false)}>
                    <DialogBody className="p-4 ">
                        <Button className="flex m-auto items-center gap-4" onClick={() => router.get('/logout')}>
                            <IoLogOutOutline size={20} />
                            <span>Logout</span>
                        </Button>
                    </DialogBody>
                </Dialog>
            </div>
        </div>
    );
};

export default SideBarLeft;
