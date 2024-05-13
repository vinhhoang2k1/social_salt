import Input from "@/Components/Inputs/Input";
import SelectInput from "@/Components/Inputs/SelectInput";
import { UseBetterForm } from "@/Utilities/useBetterForm";
import {
    Button,
    Dialog,
    DialogBody,
    Option,
    Typography,
} from "@material-tailwind/react";
import { CiFileOn } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { IoSaveOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { SiBiolink } from "react-icons/si";
import { PiPasswordLight } from "react-icons/pi";
import { TFormUserState, TUserPayload } from "../Admin";
import { useEffect } from "react";
import { IUser } from "@/types";
type Props = {
    openForm: TFormUserState;
    onClose: () => void;
    label?: string;
    onSubmit?: () => void;
    instanceForm: UseBetterForm<TUserPayload>;
};

const PopupForm = ({
    openForm,
    label,
    onClose,
    instanceForm,
    onSubmit,
}: Props) => {
    useEffect(() => {
        if (openForm.data) {
            // for (let k in data) {
            //     instanceForm.setData(`${k}` as any, data[k]);
            // }
            const forceData: TUserPayload = openForm.data;
            instanceForm.setAllData(forceData);
        }
    }, [openForm.data]);

    return (
        <Dialog
            open={openForm.open}
            handler={onClose}
            className="post__view-dialog"
        >
            <DialogBody>
                <Typography className="text-center" variant="h4">
                    {label}
                </Typography>
                <div className="m-5 grid grid-cols-1 gap-4 p-1 sm:grid-cols-2 md:grid-cols-2">
                    <Input
                        label="Fullname"
                        name="fullname"
                        type="text"
                        autoFocus
                        value={instanceForm.data.fullname}
                        errorMsg={instanceForm.errors.fullname}
                        hideError={instanceForm.isDirty("fullname")}
                        disabled={instanceForm.processing}
                        className="cs-input"
                        autoComplete="fullname"
                        onChange={(e) =>
                            instanceForm.setData("fullname", e.target.value)
                        }
                        icon={<FaRegUser className="cs-input-icon" />}
                        required={true}
                        classNameWrap="wrap-input"
                        placeholder="fullname"
                    />
                    <Input
                        label="email"
                        name="email"
                        type="text"
                        autoFocus
                        value={instanceForm.data.email}
                        errorMsg={instanceForm.errors.email}
                        hideError={instanceForm.isDirty("email")}
                        disabled={instanceForm.processing}
                        className="cs-input"
                        autoComplete="email"
                        onChange={(e) =>
                            instanceForm.setData("email", e.target.value)
                        }
                        icon={<MdEmail className="cs-input-icon" />}
                        required={true}
                        classNameWrap="wrap-input"
                        placeholder="Email"
                    />
                    <Input
                        label="Avatar"
                        name="avatar"
                        type="file"
                        autoFocus
                        value={""}
                        errorMsg={instanceForm.errors.avatar}
                        hideError={instanceForm.isDirty("avatar")}
                        disabled={instanceForm.processing}
                        className="cs-input"
                        autoComplete="avatar"
                        onChange={(e) =>
                            instanceForm.setData("avatar", e.target.value)
                        }
                        icon={<CiFileOn className="cs-input-icon" />}
                        required={false}
                        classNameWrap="wrap-input"
                        placeholder="avatar"
                    />
                    <SelectInput
                        label="Gender"
                        name="gender"
                        autoFocus
                        value={instanceForm.data.gender!}
                        errorMsg={instanceForm.errors.gender}
                        hideError={instanceForm.isDirty("gender")}
                        disabled={instanceForm.processing}
                        className="cs-input"
                        onChange={(value) => {
                            instanceForm.setData("gender", value!);
                        }}
                        required={false}
                        placeholder="gender"
                    >
                        <Option value="0">Male</Option>
                        <Option value="1">Female</Option>
                        <Option value="2">Other</Option>
                    </SelectInput>
                    <Input
                        label="Birthday"
                        name="date_of_birth"
                        type="date"
                        autoFocus
                        value={instanceForm.data.date_of_birth!}
                        errorMsg={instanceForm.errors.date_of_birth}
                        hideError={instanceForm.isDirty("date_of_birth")}
                        disabled={instanceForm.processing}
                        className="cs-input"
                        autoComplete="date_of_birth"
                        onChange={(e) =>
                            instanceForm.setData(
                                "date_of_birth",
                                e.target.value,
                            )
                        }
                        required={false}
                        classNameWrap="wrap-input"
                        placeholder="Birthday"
                    />
                    <Input
                        label="Bio link"
                        name="bio"
                        type="text"
                        autoFocus
                        value={instanceForm.data.bio!}
                        errorMsg={instanceForm.errors.bio}
                        hideError={instanceForm.isDirty("bio")}
                        disabled={instanceForm.processing}
                        className="cs-input"
                        autoComplete="bio"
                        onChange={(e) =>
                            instanceForm.setData("bio", e.target.value)
                        }
                        icon={<SiBiolink className="cs-input-icon" />}
                        required={false}
                        classNameWrap="wrap-input"
                        placeholder="Bio"
                    />
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        autoFocus
                        value={instanceForm.data.password}
                        errorMsg={instanceForm.errors.password}
                        hideError={instanceForm.isDirty("password")}
                        disabled={instanceForm.processing}
                        className="cs-input"
                        autoComplete="password"
                        onChange={(e) =>
                            instanceForm.setData("password", e.target.value)
                        }
                        icon={<PiPasswordLight className="cs-input-icon" />}
                        required={true}
                        classNameWrap="wrap-input"
                        placeholder="Password"
                    />
                    <Input
                        label="Comfirm password"
                        name="password_confirmation"
                        type="password"
                        autoFocus
                        value={instanceForm.data.password_confirmation}
                        errorMsg={instanceForm.errors.password_confirmation}
                        hideError={instanceForm.isDirty(
                            "password_confirmation",
                        )}
                        disabled={instanceForm.processing}
                        className="cs-input"
                        autoComplete="password_confirmation"
                        onChange={(e) =>
                            instanceForm.setData(
                                "password_confirmation",
                                e.target.value,
                            )
                        }
                        icon={<PiPasswordLight className="cs-input-icon" />}
                        required={true}
                        classNameWrap="wrap-input"
                        placeholder="Comfirm password"
                    />
                </div>
                <div className="action flex justify-end gap-2">
                    <Button onClick={onClose} color="red">
                        Cancel
                    </Button>
                    <Button
                        onClick={onSubmit}
                        className="flex items-center gap-2"
                    >
                        <IoSaveOutline size={15} /> Save
                    </Button>
                </div>
            </DialogBody>
        </Dialog>
    );
};

export default PopupForm;
