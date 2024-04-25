import CreateIcon from "@/Components/Icons/Create";
import ExploreIcon from "@/Components/Icons/Explore";
import HomeIcon from "@/Components/Icons/Home";
import MessageIcon from "@/Components/Icons/Message";
import NotificationIcon from "@/Components/Icons/Notification";
import ProfileIcon from "@/Components/Icons/Profile";
import ReelsIcon from "@/Components/Icons/Reels";
import SearchIcon from "@/Components/Icons/Search";
import { router } from "@inertiajs/react";
import { useMemo } from "react";

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
                    />
                ),
                link: menu.profile,
            },
        ];
    }, [location.pathname, menu]);
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
            </div>
        </div>
    );
};

export default SideBarLeft;
