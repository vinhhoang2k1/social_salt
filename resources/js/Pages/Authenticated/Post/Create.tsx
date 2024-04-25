import AuthenticateLayout from "@/Layouts/AuthenticateLayout";
import { Head } from "@inertiajs/react";
import "./style.scss";
import { IBasePropsPage } from "@/types/common/Common.type";
import MediaIcon from "@/Components/Icons/Media"
type Props = {} & IBasePropsPage<{}>;

const CreatePost = (props: Props) => {
    
    return (
        <>
            <Head title="Home page" />
            <AuthenticateLayout>
                <div id="post__create">
                    <div className="content">
                        <h1 className="text-center create-title">Create new post</h1>
                        <MediaIcon className="media-icon"/>
                        <h2 className="text-center">Select photos and video here</h2>
                        <div className="btn select-media">
                            Select from computer
                        </div>
                    </div>
                </div>
            </AuthenticateLayout>
        </>
    );
};

export default CreatePost;
