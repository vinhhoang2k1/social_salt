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
    posts: Array<IResPost>;
    followers: Array<IResFollow>;
    following: Array<IResFollow>;
}
export interface IResPost {
    id: string,
    user_id: string,
    location: string,
    mode: number,
    post_type: number,
}
export interface IResFollow {
    following_user_id: string,
    followed_user_id: string,
}
export interface IConfig {
    basePath: string
}
export interface IBasePropsPage<D> {
    errors: any;
    config: IConfig
    auth: {
        user: IResUser
    };
    response: D
    uploads?: {
        data: IFile[]
    } 
    flash: IFlash
}
export interface IFile {
    path: string,
    type: 'image' | 'video'
}