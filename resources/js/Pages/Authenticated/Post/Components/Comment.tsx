import CollapseComponent from "@/Components/Collapse/Collapse";
import CommentItem from "./CommentItem";
import { IComment } from "@/types/Web/Comment";
import { TSelectReply } from "../ViewPost";

type Props = {
    key?: string | number;
    comment: IComment;
    setSelectReply: React.Dispatch<
        React.SetStateAction<TSelectReply | undefined>
    >;
};

const Comment = ({ key, comment, setSelectReply }: Props) => {
    return (
        <div key={key}>
            <CommentItem
                comment={comment}
                level={1}
                onReply={(values) => setSelectReply(values)}
            />
            {comment.child.length > 0 && (
                <CollapseComponent label={`View replies ${comment.child.length}`}>
                    <div className="list-reply">
                        {comment.child.map((item) => (
                            <CommentItem
                                key={`${key}-reply-${item}`}
                                comment={item}
                                level={2}
                            />
                        ))}
                    </div>
                </CollapseComponent>
            )}
        </div>
    );
};

export default Comment;
