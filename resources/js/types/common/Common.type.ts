export interface IFlash {
    message: string | null;
    success: string | null;
    error: string | null;
    warning: string | null;
}
export interface IResUser {
    id:string;
    fullname:string;
    email:string;
    avatar:string;
    bio:string;
    gender:string;
    date_of_birth:string;
    created_at:string;
    updated_at:string;
    deleted_at:string;
    user_status_id:string;
}
interface IConfig {
    basePath: string
}
export interface IBasePropsPage<D> {
    errors: any;
    config: IConfig
    auth: {
        user: IResUser
    };
    data: D
    flash: IFlash
}