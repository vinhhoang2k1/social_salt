import useBetterForm from "@/Utilities/useBetterForm";
import { ICreateUser } from "@/types";
import { router } from "@inertiajs/react";
import React, { FormEventHandler } from "react";

type Props = {};

const Register = (props: Props) => {
    const params = new URLSearchParams(window.location.search);
    const userForm = useBetterForm<ICreateUser>({
        name: params.get("name") ?? "Vinh",
        email: params.get("email") ?? "vinh@gmail.com",
        password: "12345678",
        password_confirmation: "12345678"
    });
    console.log('userForm',userForm.data);
    
    const submit:FormEventHandler = (e) => {
      e.preventDefault();
      router.post(
        "/register",
        {
          ...userForm.data
        }
      )
    }

    return (
        <div>
            <form className="space-y-4" onSubmit={submit}>
                <section>
                    <p className="text-center text-lg text-blue-gray-500">
                        Account Details
                    </p>
                    <button type="submit">
                      submit
                    </button>
                </section>
            </form>
        </div>
    );
};

export default Register;
