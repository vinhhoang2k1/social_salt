import React from "react";

type Props = {
    path: string;
    link: string;
    alt: string;
};

const ProfileAvatar = (props: Props) => {
    const { path, link, alt } = props;
    return (
        <div className="avatar">
            <a href={link}>
                <img src={path} alt={alt} />
            </a>
        </div>
    );
};

export default ProfileAvatar;
