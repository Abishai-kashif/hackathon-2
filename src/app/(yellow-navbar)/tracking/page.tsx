import TrackingForm from "@/components/tracking-form";

export default function TrackingPage() {
    return (
        <main className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Track Your Shipment</h1>
            <TrackingForm />
        </main>
    );
}
