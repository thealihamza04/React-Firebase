import React from "react";
import { cn } from "@/utils/cn";

const Heading = ({ children, size = "lg", variant = "default", className }) => {
    const sizes = {
        sm: "text-lg font-medium",
        md: "text-xl font-semibold",
        lg: "text-2xl font-bold",
        xl: "text-3xl font-bold",
    };

    const variants = {
        default: "text-[var(--color-foreground)]",
        muted: "text-[var(--color-muted)]",
        danger: "text-[var(--color-danger)]",
        success: "text-[var(--color-success)]",
    };

    return (
        <h1 className={cn(sizes[size], variants[variant], className)}>
            {children}
        </h1>
    );
};

export default Heading;
