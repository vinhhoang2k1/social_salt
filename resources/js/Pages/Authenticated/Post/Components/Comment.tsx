import CollapseComponent from "@/Components/Collapse/Collapse";
import CommentItem from "./CommentItem";

type Props = {
    key?: string | number
};

const Comment = ({key}: Props) => {
    return (
        <div key={key}>
            <CommentItem />
            <CollapseComponent label="View replies (2)">
                <div className="list-reply">
                    {Array.from([1, 2]).map((item) => (
                        <CommentItem key={`${key}-reply-${item}`} />
                    ))}
                </div>
            </CollapseComponent>
        </div>
    );
};

export default Comment;
