import { IUser } from "..";

export interface IComment {
    id: string;
    user_id: string;
    post_id: string;
    content: string;
    comment_parent: string | null;
    created_at: string;
    updated_at: string;
    user: IUser
}
