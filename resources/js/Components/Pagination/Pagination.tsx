import React, { useEffect } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
type Props = {
    total: number;
    onChange?: (current: number) => void;
};
export function Pagination({ total, onChange }: Props) {
    const [active, setActive] = React.useState(1);

    const getItemProps = (index) =>
        ({
            variant: active === index ? "filled" : "text",
            color: "gray",
            onClick: () => setActive(index),
        }) as any;

    const next = () => {
        if (active === 5) return;

        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;

        setActive(active - 1);
    };
    useEffect(() => {
        if (onChange) {
            onChange(active);
        }
    }, [onChange, active]);

    return (
        <div className="flex items-center gap-4">
            <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={prev}
                disabled={active === 1}
            >
                <IoIosArrowRoundBack strokeWidth={2} className="h-4 w-4" />{" "}
                Previous
            </Button>
            <div className="flex items-center gap-2">
                {Array.apply(null, { length: total } as unknown[])
                    .map(Number.call, Number)
                    .map((item) => (
                        <IconButton {...getItemProps(Number(item) + 1)}>
                            {Number(item) + 1}
                        </IconButton>
                    ))}
            </div>
            <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={next}
                disabled={active === 5}
            >
                Next
                <IoIosArrowRoundForward strokeWidth={2} className="h-4 w-4" />
            </Button>
        </div>
    );
}
