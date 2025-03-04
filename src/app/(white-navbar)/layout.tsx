import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CartProvider from "@/components/provider";
import ShoppingCardModel from "@/components/shopping-card-model";
import { Toaster } from "react-hot-toast";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin", "latin-ext"],
    variable: "--poppins",
});

export const metadata: Metadata = {
    title: "Furniture Press",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body
                    className={`${poppins.variable} antialiased overflow-x-hidden`}
                >
                    <NuqsAdapter>
                        <CartProvider>
                            {/* Adding Toaster globally */}
                            <Toaster
                                position="top-center"
                                reverseOrder={false}
                            />
                            <ShoppingCardModel />
                            <Navbar className="bg-white" />

                            {children}
                            <script
                                src="//code.tidio.co/cvrnx771sojsuqzm3sl5w9bsduea7mqm.js"
                                async
                            ></script>
                        </CartProvider>
                    </NuqsAdapter>
                    <Footer />
                </body>
            </html>
        </ClerkProvider>
    );
}
