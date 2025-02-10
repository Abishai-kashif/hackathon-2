"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, LifeBuoy } from "lucide-react";
import { ErrorProps } from "@/types";
import Link from "next/link";

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
        <main className="wrapper flex items-center justify-center bg-yellow  px-4 py-10">
            <div className="w-full max-w-lg space-y-6 rounded-md border bg-card p-8 shadow-sm">
                <div className="flex flex-col items-center space-y-4">
                    <div className="rounded-full flex items-center justify-center bg-destructive/20 p-4">
                        <AlertTriangle className="h-10 w-10 text-destructive" />
                    </div>

                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                            {errorDetails.title}
                        </h1>
                        <p className="text-muted-foreground">
                            {errorDetails.description}
                        </p>

                        {!isNotFound && (
                            <div className="mt-4 rounded-lg bg-muted/50 p-4 text-left font-mono text-sm">
                                <p className="font-medium text-foreground">
                                    Error details:
                                </p>
                                <p className="mt-1 text-muted-foreground">
                                    {error.message}
                                </p>
                                {error.digest && (
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Digest: {error.digest}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                    <Button
                        size="lg"
                        onClick={reset}
                        className="gap-2 bg-primary/90 hover:bg-primary text-[16px]"
                    >
                        <RefreshCw className="h-4 w-4" />
                        Try Again
                    </Button>

                    <Button
                        size="lg"
                        variant="outline"
                        asChild
                        className="gap-2 text-[16px]"
                    >
                        <Link
                            href={`mailto:support@yourdomain.com?subject=Error Report (${error.digest})&body=Please describe what you were doing when the error occurred:`}
                        >
                            <LifeBuoy className="h-4 w-4" />
                            Contact Support
                        </Link>
                    </Button>
                </div>

                {!isNotFound && (
                    <p className="text-center text-xs text-muted-foreground">
                        Error code: {error.statusCode || "CLIENT_ERROR"}
                    </p>
                )}
            </div>
        </main>
    );
}
