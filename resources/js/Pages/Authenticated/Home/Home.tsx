import AuthenticateLayout from "@/Layouts/AuthenticateLayout";
import { Head } from "@inertiajs/react";
import PortItem from "./components/PostItem";
import "./style.scss";
type Props = {};

const Home = (props: Props) => {
    return (
        <>
            <Head title="Home page" />
            <AuthenticateLayout>
                <div id="home">
                    <div className="head">
                        <div className="suggest-followers">

                            {Array(10)
                                .fill(null)
                                .map((item, i) => (
                                    <div className="suggest-followers__item" key={`item-${i}`}>
                                        <img
                                            src="https://i.pravatar.cc/300"
                                            alt=""
                                            className="avatar"
                                        />
                                        <p className="name">Hoa Nguyễn</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                        <div className="post__list">
                            <PortItem/>
                            <PortItem/>
                        </div>
                </div>
            </AuthenticateLayout>
        </>
    );
};

export default Home;
