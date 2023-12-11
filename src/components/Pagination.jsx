import { useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";


function Pagination() {
    const [active, setActive] = useState(1);
    const lastVisiblePage = 1032;

    const getItemProps = (index) => ({
        variant: active === index ? "filled" : "text",
        color: "gray",
        onClick: () => setActive(index),
        className: "rounded-full",
    });

    const next = () => {
        if (active === lastVisiblePage) return;

        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;

        setActive(active - 1);
    };

    const renderButtons = () => {
        const buttons = [];
        for (let i = 1; i <= lastVisiblePage; i++) {
            buttons.push(
                <IconButton key={i} {...getItemProps(i)}>
                    {i}
                </IconButton>
            );
        }
        return buttons;
    };

    return (
        <div className="flex items-center gap-4">
            <Button
                variant="text"
                className="flex items-center gap-2 rounded-full"
                onClick={prev}
                disabled={active === 1}
            >
                <FaArrowLeftLong />
                Previous
            </Button>
            <div className="flex items-center gap-2">{renderButtons()}</div>
            <Button
                variant="text"
                className="flex items-center gap-2 rounded-full"
                onClick={next}
                disabled={active === lastVisiblePage}
            >
                Next
                <FaArrowRightLong />
            </Button>
        </div>
    );
}
export default Pagination;
