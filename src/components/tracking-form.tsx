"use client";

import { useState } from "react";

export default function TrackingForm() {
    const [data, setData] = useState<TrackingStatus | null>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const trackingNumber = formData.get("trackingNumber") as string;
        const carrier = formData.get("carrier") as string;

        try {
            const response = await fetch("/api/track", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ trackingNumber, carrier }),
            });

            if (!response.ok) throw new Error("Tracking failed");

            const result = await response.json();
            setData(result);
        } catch (err: any) {
            setError(err.message || "Failed to track shipment");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-4">
                    <input
                        name="trackingNumber"
                        type="text"
                        placeholder="Tracking Number"
                        className="flex-1 p-2 border rounded"
                        required
                    />
                    <input
                        name="carrier"
                        type="text"
                        placeholder="Carrier (e.g., usps)"
                        className="flex-1 p-2 border rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {loading ? "Tracking..." : "Track Shipment"}
                </button>
            </form>

            {error && (
                <div className="mt-4 p-4 bg-red-100 text-red-700">{error}</div>
            )}

            {data && (
                <div className="mt-6 space-y-4">
                    <h2 className="text-xl font-bold">Shipment Details</h2>
                    <div className="p-4 bg-gray-50 rounded">
                        <p className="font-semibold">
                            Status:{" "}
                            <span className="text-blue-600">{data.status}</span>
                        </p>
                        {data.location && (
                            <p className="mt-2">
                                Location: {data.location.city},{" "}
                                {data.location.state}
                            </p>
                        )}
                    </div>

                    <h3 className="text-lg font-bold mt-6">Tracking History</h3>
                    <div className="space-y-2">
                        {data.tracking_history.map((event, index) => (
                            <div
                                key={index}
                                className="p-3 bg-white border rounded"
                            >
                                <p className="text-sm text-gray-600">
                                    {event.status_date}
                                </p>
                                <p className="font-medium">{event.status}</p>
                                {event.location && (
                                    <p className="text-sm text-gray-500">
                                        {event.location.city},{" "}
                                        {event.location.state}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
