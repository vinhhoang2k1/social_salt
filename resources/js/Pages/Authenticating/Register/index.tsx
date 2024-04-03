import Input from "@/Components/Inputs/Input";
import GuestLayout from "@/Layouts/GuestLayout";
import useBetterForm from "@/Utilities/useBetterForm";
import { ICreateUser } from "@/types";
import { Head, router } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import "./style.scss";

const Register = () => {
    const userForm = useBetterForm<ICreateUser>({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(
            "/register",
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
            <Head title="Register page" />
            <GuestLayout>
                <div className="register-container">
                    <div className="register-pic">
                        <img
                            className="img"
                            src="./images/pic-login.webp"
                            alt=""
                        />
                    </div>
                    <div className="register-form">
                        <form className="space-y-4" onSubmit={submit}>
                            <h2 className="title">Member Register</h2>
                            <Input
                                label=""
                                name="name"
                                type="text"
                                autoFocus
                                value={userForm.data.name}
                                errorMsg={userForm.errors.name}
                                hideError={userForm.isDirty("name")}
                                disabled={userForm.processing}
                                className="cs-input"
                                autoComplete="name"
                                onChange={(e) =>
                                    userForm.setData("name", e.target.value)
                                }
                                icon={<MdEmail className="cs-input-icon" />}
                                required={false}
                                classNameWrap="wrap-input"
                                placeholder="Your name"
                            />
                            <Input
                                label=""
                                name="email"
                                type="email"
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
                             <Input
                                label=""
                                name="password_confirmation"
                                type="password"
                                autoFocus
                                value={userForm.data.password_confirmation}
                                errorMsg={userForm.errors.password_confirmation}
                                hideError={userForm.isDirty("password_confirmation")}
                                disabled={userForm.processing}
                                className="cs-input"
                                autoComplete="password_confirmation"
                                onChange={(e) =>
                                    userForm.setData("password_confirmation", e.target.value)
                                }
                                icon={
                                    <RiLockPasswordFill className="cs-input-icon" />
                                }
                                classNameWrap="wrap-input"
                                placeholder="Confirm password"
                                required={false}
                            />
                            <div className="action">
                                <button
                                    type="submit"
                                    className="cs-input cs-btn-submit"
                                >
                                    Register
                                </button>
                            </div>
                            <div className="active-hover create-account-action" onClick={() => router.get('login')}>
                                <span className="label">
                                  Login now
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

export default Register;
