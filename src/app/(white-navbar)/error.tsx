"use client";

import { useEffect } from "react";
import { ErrorProps } from "@/types";
import ErrorPage from "@/components/error-page";

export default function ErrorBoundary({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Log to error monitoring service
        console.error("Error Boundary:", error);
    }, [error]);

    const isNotFound = error.statusCode === 404;
    const errorDetails = {
        title: isNotFound ? "Page Not Found" : "Something Went Wrong",
        description: isNotFound
            ? "The page you're looking for doesn't exist or has been moved."
            : "We apologize for the inconvenience. Our team has been notified.",
    };

    return (
        <ErrorPage
            error={error}
            errorDetails={errorDetails}
            isNotFound={isNotFound}
            reset={reset}
        />
    );
}
