import AuthenticateLayout from "@/Layouts/AuthenticateLayout";
import { IResPost, IBasePropsPage, IResUser, IResPostMedia, IConfig } from "@/types/common/Common.type";
import { router, usePage } from "@inertiajs/react";
import { PageProps } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";
import PortItem from "./components/PostItem";
import "./style.scss";
import { IReactPost } from "@/types/Web/ReactPost";

export type PostData = {
    comments_count: number
    create_by: IResUser,
    medias: Array<IResPostMedia>,
    reacted: IReactPost
    count_react: number
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
                                    onClick={() => router.get(`/profile/${item.id}`)}
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
                                user={post.create_by}
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
 