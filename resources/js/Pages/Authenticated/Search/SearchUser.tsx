import AuthenticateLayout from "@/Layouts/AuthenticateLayout";
import { Head, router, usePage } from "@inertiajs/react";
import "./style.scss";
import { useRef } from "react";
import { Typography } from "@material-tailwind/react";
import { IBasePropsPage, IConfig } from "@/types/common/Common.type";
import { IUser } from "@/types";
import { PageProps } from "@inertiajs/inertia";
type Props = {} & IBasePropsPage<IUser[]>;

const SearchUser = ({ response }: Props) => {
    const { basePath } = usePage<PageProps>().props.config as IConfig;

    const searchInputRef = useRef<HTMLInputElement>(null);
    const handleSearch = () => {
        router.get(`/search/${searchInputRef.current?.value}`);
    };
    return (
        <>
            <Head title="Search page" />
            <AuthenticateLayout>
                <div id="search">
                    <div className="head">
                        <Typography variant="h2">Search</Typography>
                        <div className="input-search flex gap-2">
                            <input ref={searchInputRef} type="text" />
                            <button
                                type="button"
                                onClick={handleSearch}
                                className="btn"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                    <div className="search-content flex">
                        {/* <div className="history">
                            <div className="flex justify-between">
                                <span className="label">Recent</span>
                                <span className="label btn-clear">
                                    Clear All
                                </span>
                            </div>
                            <div className="history__list">
                                {Array.from([
                                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                                ]).map((item) => (
                                    <div className="history__item">
                                        <div
                                            key={`result`}
                                            className="result__item flex gap-2"
                                        >
                                            <div className="avatar">
                                                <img
                                                    src="https://i.pravatar.cc/300"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="info">
                                                <div className="name">
                                                    Hoang Vinh
                                                </div>
                                                <div className="talk">
                                                    NOTHING IS IMPOSSIBLE
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div> */}
                        <div className="result">
                            <div className="">
                                {response && response.map((user) => (
                                    <a
                                        href={`/profile/${user.id}`}
                                        key={`result-${user.id}`}
                                        className="result__item flex gap-2"
                                    >
                                        <div className="avatar">
                                            <img
                                                src={`${basePath}/${user.avatar}`}
                                                alt=""
                                            />
                                        </div>
                                        <div className="info">
                                            <div className="name">
                                                {user.fullname}
                                            </div>
                                            <div className="talk">
                                                NOTHING IS IMPOSSIBLE
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticateLayout>
        </>
    );
};

export default SearchUser;
