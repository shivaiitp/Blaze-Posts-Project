import React from "react";
import Button from "./Button"; // Assuming this is your regular button component

export default function LoadingButton({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    isLoading = false,
    ...props
}) {
    return (
        <Button
            type={type}
            className={`flex items-center justify-center w-full px-4 py-2 ${bgColor} ${textColor} ${className} ${isLoading ? "cursor-not-allowed" : ""}`}
            disabled={isLoading} // Disable button if loading
            {...props}
        >
            {isLoading && (
                <div className="animate-spin border-t-2 border-b-2 border-white border-solid rounded-full h-5 w-5 mr-3"></div>
            )}
            {children}
        </Button>
    );
}
