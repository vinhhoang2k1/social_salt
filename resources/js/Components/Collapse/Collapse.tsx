import { Collapse } from "@material-tailwind/react";
import { PropsWithChildren, ReactNode, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

type Props = {
    children?: ReactNode;
    label?: ReactNode;
} & PropsWithChildren;

const CollapseComponent = ({ children, label }: Props) => {
    const [activeAccessibility, setActiveAccessibility] = useState(true);

    return (
        <div className="collapse-item ">
            <h3
                className="label flex items-center justify-between"
                onClick={() => setActiveAccessibility((pre) => !pre)}
            >
                <span style={activeAccessibility ? ({fontWeight: "bold", transition: "all .1s linear"}) : {} }>{label}</span>
                <span>
                    {activeAccessibility ? <FaChevronUp /> : <FaChevronDown />}
                </span>
            </h3>
            <Collapse open={activeAccessibility}>{children}</Collapse>
        </div>
    );
};

export default CollapseComponent;
