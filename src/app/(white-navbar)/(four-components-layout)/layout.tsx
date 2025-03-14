import RouteBanner from "@/components/layout/route-banner";
import ServicesOverview from "@/components/layout/services-overview";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <RouteBanner />
            {children}
            <ServicesOverview />
        </>
    );
}
