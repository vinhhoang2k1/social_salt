import CollapseComponent from "@/Components/Collapse/Collapse";
import CommentItem from "./CommentItem";
import { IComment } from "@/types/Web/Comment";

type Props = {
    key?: string | number,
    comment: IComment
};

const Comment = ({key, comment}: Props) => {
    return (
        <div key={key}>
            <CommentItem comment={comment} />
            {/* <CollapseComponent label="View replies (2)">
                <div className="list-reply">
                    {Array.from([1, 2]).map((item) => (
                        <CommentItem key={`${key}-reply-${item}`} />
                    ))}
                </div>
            </CollapseComponent> */}
        </div>
    );
};

export default Comment;
