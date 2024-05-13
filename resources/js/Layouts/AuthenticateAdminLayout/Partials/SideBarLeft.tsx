import HomeIcon from "@/Components/Icons/Home";
import { router } from "@inertiajs/react";
import { useMemo } from "react";
import { FaRegUser } from "react-icons/fa";
import { GrDocumentConfig } from "react-icons/gr";
import { RiAdminLine } from "react-icons/ri";
const menu = {
    home: "/admin/home",
    userAdmin: '/admin/user-admin',
    user: '/admin/user',
    config: '/admin/config'
};
const SideBarLeft = () => {
    // const {basePath} = usePage<PageProps>().props.config as IConfig;

    // const {user} = usePage<PageProps>().props.auth as {user: IResUser};

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
                label: "System ",
                icon: <RiAdminLine />,
                link: menu.userAdmin,
            },
            {
                label: "User ",
                icon: <FaRegUser />,
                link: menu.user,
            },
            {
                label: "Config ",
                icon: <GrDocumentConfig />,
                link: menu.config,
            },
        ];
    }, [location.pathname, menu]);
    return (
        <div className="side-bar-left">
            <div className="head">Admin</div>
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
            <div className="more-action"></div>
        </div>
    );
};

export default SideBarLeft;
