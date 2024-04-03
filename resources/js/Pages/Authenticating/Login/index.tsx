import Input from "@/Components/Inputs/Input";
import GuestLayout from "@/Layouts/GuestLayout";
import useBetterForm from "@/Utilities/useBetterForm";
import { TLoginPayload } from "@/types/Auth/auth";
import { Head, router } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import "./style.scss";

const index = () => {
    const userForm = useBetterForm<TLoginPayload>({
        email: "",
        password: "",
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(
            "/login",
            {
                ...userForm.data,
            },
            {
                onError: (e) => {
                    for (let k in e) {
                        userForm.setError(k as any, e[k]);
                    }
                },
            },
        );
    };

    return (
        <>
            <Head title="Login page" />
            <GuestLayout>
                <div className="login-container">
                    <div className="login-pic">
                        <img
                            className="img"
                            src="./images/pic-login.webp"
                            alt=""
                        />
                    </div>
                    <div className="login-form">
                        <form className="space-y-4" onSubmit={submit}>
                            <h2 className="title">Member Login</h2>
                            <Input
                                label=""
                                name="email"
                                type="text"
                                autoFocus
                                value={userForm.data.email}
                                errorMsg={userForm.errors.email}
                                hideError={userForm.isDirty("email")}
                                disabled={userForm.processing}
                                className="cs-input"
                                autoComplete="email"
                                onChange={(e) =>
                                    userForm.setData("email", e.target.value)
                                }
                                icon={<MdEmail className="cs-input-icon" />}
                                required={false}
                                classNameWrap="wrap-input"
                                placeholder="Email"
                            />
                            <Input
                                label=""
                                name="password"
                                type="password"
                                autoFocus
                                value={userForm.data.password}
                                errorMsg={userForm.errors.password}
                                hideError={userForm.isDirty("password")}
                                disabled={userForm.processing}
                                className="cs-input"
                                autoComplete="password"
                                onChange={(e) =>
                                    userForm.setData("password", e.target.value)
                                }
                                icon={
                                    <RiLockPasswordFill className="cs-input-icon" />
                                }
                                classNameWrap="wrap-input"
                                placeholder="Password"
                                required={false}
                            />
                            <div className="action">
                                <button
                                    type="submit"
                                    className="cs-input cs-btn-submit"
                                >
                                    Login
                                </button>
                            </div>
                            <div className="more-action">
                                <span className="label">Forgot </span>
                                <span className="active-hover forgot">
                                    Username / Password
                                </span>
                            </div>
                            <div className="active-hover create-account-action" onClick={() => router.get('register')}>
                                <span className="label">
                                    Create your account{" "}
                                </span>
                                <span>
                                    <FaLongArrowAltRight />
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </GuestLayout>
        </>
    );
};

export default index;
