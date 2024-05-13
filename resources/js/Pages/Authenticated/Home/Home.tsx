import AuthenticateLayout from "@/Layouts/AuthenticateLayout";
import { IResPost, IBasePropsPage, IResUser, IResPostMedia, IConfig } from "@/types/common/Common.type";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";
import PortItem from "./components/PostItem";
import "./style.scss";

type PostData = {
    user: IResUser,
    medias: Array<IResPostMedia>,
} & IResPost;

type Props = {
    posts: Array<PostData>,
    following: Array<IResUser>,
} & IBasePropsPage<{}>;

const Home = (props: Props) => {
    const { posts, following } = props;
    const { basePath } = usePage<PageProps>().props.config as IConfig;
    
    return (
        <>
            <Head title="Home page" />
            <AuthenticateLayout>
                <div id="home">
                    <div className="head">
                        <div className="suggest-followers">
                            {following.map((item, key) => (
                                <div
                                    className="suggest-followers__item"
                                    key={`item-${key}`}
                                >
                                <img
                                    src={basePath + "/" + item.avatar}
                                    alt=""
                                    className="avatar"
                                />
                                <p className="name">{item.fullname}</p>
                            </div>
                            ))}
                        </div>
                    </div>
                    <div className="post__list">
                        {posts.map((post) => (
                            <PortItem 
                                post={post}
                                user={post.user}
                                medias={post.medias}
                            />
                        ))}
                    </div>
                </div>
            </AuthenticateLayout>
        </>
    );
};

export default Home;
