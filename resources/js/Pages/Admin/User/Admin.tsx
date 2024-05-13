import { DataTable, TColumn } from "@/Components/Table/DataTable";
import AuthenticateLayout from "@/Layouts/AuthenticateAdminLayout";
import { IUser } from "@/types";
import { IBasePropsPage, IConfig } from "@/types/common/Common.type";
import { PageProps } from "@inertiajs/inertia";
import { Head, router, usePage } from "@inertiajs/react";
import { Button, Card, Typography } from "@material-tailwind/react";
import { useMemo, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import "./style.scss";
import PopupForm from "./components/Create";
import useBetterForm from "@/Utilities/useBetterForm";
type Props = {} & IBasePropsPage<{
    users: IUser[];
}>;
export type TFormUserState = {
    open: boolean;
    type: "CREATE" | "UPDATE";
    data?: IUser;
};
//fullname, email, avatar, bio, gender, date_of_birth
export type TUserPayload = {
    fullname: string;
    email: string;
    avatar: null | string;
    bio: null | string;
    gender: null | string;
    date_of_birth: null | string;
    role: string;
    password: string;
    password_confirmation: string;
};
const defaultForm = {
    fullname: "",
    email: "",
    avatar: "avatar/PfJo1R0dy8vw1715422459phpIxKi4X.jpg",
    bio: "",
    gender: "",
    date_of_birth: "",
    role: "ADMIN",
    password: "",
    password_confirmation: "",
};
const Admin = ({ response }: Props) => {
    const { basePath } = usePage<PageProps>().props.config as IConfig;
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [openform, setOpenForm] = useState<TFormUserState>({
        open: false,
        type: "CREATE",
    });
    const userForm = useBetterForm<TUserPayload>(defaultForm);
    const handleSuccess = () => {
        setOpenForm({ open: false, type: "CREATE" });
        userForm.clearErrors();
        userForm.setAllData(defaultForm);
    };
    const handleSearch = () => {
        router.get(
            "/admin/user-admin" + `?user=${searchInputRef.current?.value}`,
        );
    };
    const handleSaveUser = () => {
        if (openform.type == "CREATE") {
            router.post(
                "/admin/user-create",
                { ...userForm.data, id: openform.data?.id },
                {
                    onError: (e) => {
                        for (let k in e) {
                            userForm.setError(k as any, e[k]);
                        }
                    },
                    onSuccess: handleSuccess,
                },
            );
        }
        if (openform.type == "UPDATE") {
            router.post(
                "/admin/user-update",
                { ...userForm.data },
                {
                    onError: (e) => {
                        for (let k in e) {
                            userForm.setError(k as any, e[k]);
                        }
                    },
                    onSuccess: handleSuccess,
                },
            );
        }
    };
    const handleDeleteUser = (userId) => {
        if (userId) {
            router.post("/admin/user-destroy/" + userId);
        }
    };
    const column = useMemo((): TColumn[] => {
        return [
            {
                index: "avatar",
                title: "User",
                render: (row) => {
                    return (
                        <>
                            <img
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                }}
                                src={row.avatar}
                                alt=""
                            />
                        </>
                    );
                },
            },
            {
                index: "fullname",
                title: "FullName",
            },
            {
                index: "email",
                title: "Email",
            },
            {
                index: "role",
                title: "Role",
            },
            {
                index: "date_of_birth",
                title: "Date of birth",
            },
            {
                index: "action",
                title: "Action",
                render: (row) => {
                    return (
                        <>
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => {
                                        delete row.password;

                                        setOpenForm({
                                            open: true,
                                            type: "UPDATE",
                                            data: row,
                                        });
                                    }}
                                >
                                    <FaEdit />
                                </Button>
                                <Button
                                    color="red"
                                    onClick={() => handleDeleteUser(row.id)}
                                >
                                    <IoTrashBin />
                                </Button>
                            </div>
                        </>
                    );
                },
            },
        ];
    }, [response.users, userForm]);
    const data = useMemo(() => {
        if (response.users) {
            return response.users.map((user) => ({
                ...user,
                avatar: `${basePath}/${user.avatar}`,
            }));
        } else {
            return [];
        }
    }, [response.users]);

    return (
        <>
            <Head title="System page" />

            <AuthenticateLayout>
                <div id="user-admin">
                    <Card className="p-4">
                        <div className="head">
                            <Typography variant="h3">Search</Typography>
                            <div className="input-search flex gap-2">
                                <input ref={searchInputRef} type="text" />
                                <Button
                                    type="button"
                                    onClick={handleSearch}
                                    className="btn"
                                >
                                    Search
                                </Button>
                            </div>
                        </div>
                    </Card>
                    <div className="table-user mt-5">
                        <div className="title flex items-center justify-between pl-2 pr-5 ">
                            <Typography variant="h3">
                                List user system
                            </Typography>
                            <Button
                                onClick={() => {
                                    setOpenForm({
                                        open: true,
                                        type: "CREATE",
                                    });
                                }}
                                color="blue-gray"
                                className="flex items-center gap-2"
                            >
                                <CiCirclePlus size="20" /> Create
                            </Button>
                        </div>
                        <DataTable
                            className="mt-3"
                            columns={column}
                            datas={data}
                            totalPage={1}
                            onChangePage={(curr) => console.log("curr", curr)}
                        />
                    </div>
                    <PopupForm
                        openForm={openform}
                        label="Create new user"
                        onClose={handleSuccess}
                        instanceForm={userForm}
                        onSubmit={handleSaveUser}
                    />
                </div>
            </AuthenticateLayout>
        </>
    );
};

export default Admin;
