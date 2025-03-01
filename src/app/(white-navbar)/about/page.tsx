import Image from "next/image";
import { Button } from "@/components/ui/button";
import MotionDiv from "@/components/motion-div";
import { ChevronRight, ShieldCheck, Truck, Palette } from "lucide-react";
import Link from "next/link";

// Image URLs from Pexels/Unsplash
const IMAGES = {
    HERO: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    CRAFTSMANSHIP:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29vZHdvcmtpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60",
    VIEW_360:
        "https://images.pexels.com/photos/8293778/pexels-photo-8293778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    MATERIALS: "/route-banner-bg.jpg",
    CONSULTATION:
        "https://images.pexels.com/photos/7681367/pexels-photo-7681367.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
};

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative h-[600px]">
                <Image
                    src={IMAGES.HERO}
                    alt="Craftsmanship in progress"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40 flex items-center">
                    <Container>
                        <MotionDiv
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-5xl font-medium text-white mb-6 max-w-3xl">
                                Where Craftsmanship Meets Modern Living
                            </h1>
                            <Button
                                variant="secondary"
                                size="lg"
                                className="w-[200px]"
                                asChild
                            >
                                <Link
                                    href="/shop"
                                    className="group flex items-center"
                                >
                                    Shop Now
                                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </MotionDiv>
                    </Container>
                </div>
            </section>

            {/* Craftsmanship Section */}
            <Section>
                <Container>
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <MotionDiv
                            initial={{ opacity: 0, x: -70 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                        >
                            <Image
                                src={IMAGES.CRAFTSMANSHIP}
                                alt="Woodworking details"
                                width={600}
                                height={400}
                                className="rounded-lg shadow-xl"
                            />
                        </MotionDiv>
                        <div>
                            <h2 className="text-[32px] font-medium mb-2">
                                The Art of Exceptional Design
                            </h2>
                            <p className="text-[18px] text-gray mb-9">
                                Our furniture tells a story of passion and
                                precision. Each piece undergoes 200+ quality
                                checks, marrying sustainable hardwoods with
                                luxe, ethical materials.
                            </p>
                            <dl className="grid grid-cols-2 gap-8">
                                <FeatureItem
                                    icon={<Palette className="h-8 w-8" />}
                                    title="Custom Finishes"
                                    text="Choose from 50+ hand-rubbed finishes"
                                />
                                <FeatureItem
                                    icon={<ShieldCheck className="h-8 w-8" />}
                                    title="15-Year Warranty"
                                    text="Craftsmanship guaranteed"
                                />
                                <FeatureItem
                                    icon={<Truck className="h-8 w-8" />}
                                    title="White-Glove Delivery"
                                    text="Nationwide assembly & placement"
                                />
                            </dl>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Experience Section */}
            <Section className="bg-azure">
                <Container>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-semibold mb-4">
                            A Curated Journey
                        </h2>
                        <p className="text-gray text-[18px] max-w-2xl mx-auto">
                            Experience furniture shopping reimagined -
                            immersive, intuitive, and utterly stress-free.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <ExperienceCard
                            title="360° Exploration"
                            description="Interactive views with zoom-in detail"
                            imgSrc={IMAGES.VIEW_360}
                        />
                        <ExperienceCard
                            title="Material Library"
                            description="Request free swatches & samples"
                            imgSrc={IMAGES.MATERIALS}
                        />
                        <ExperienceCard
                            title="Design Consultation"
                            description="Free 1:1 virtual planning sessions"
                            imgSrc={IMAGES.CONSULTATION}
                        />
                    </div>
                </Container>
            </Section>

            {/* CTA Section */}
            <Section>
                <Container>
                    <div className="bg-black/85 text-white p-16 text-center">
                        <h3 className="text-3xl font-medium mb-6">
                            Begin Your Design Journey
                        </h3>
                        <div className="flex justify-center gap-6">
                            <Button variant="secondary" size="lg" asChild>
                                <Link href="/shop">Shop Now</Link>
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                asChild
                                className="text-white border-white "
                            >
                                <Link href="/contact">Contact Us</Link>
                            </Button>
                        </div>
                    </div>
                </Container>
            </Section>
        </div>
    );
}

// Reusable Components
function Container({ children }: { children: React.ReactNode }) {
    return <div className="wrapper">{children}</div>;
}

function Section({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return <section className={`py-20 ${className}`}>{children}</section>;
}

function FeatureItem({
    icon,
    title,
    text,
}: {
    icon: React.ReactNode;
    title: string;
    text: string;
}) {
    return (
        <div className="flex items-start gap-4">
            <div className="bg-azure p-2 rounded-full text-black">{icon}</div>
            <div>
                <dt className="font-medium text-[18px]">{title}</dt>
                <dd className="text-gray">{text}</dd>
            </div>
        </div>
    );
}

function ExperienceCard({
    title,
    description,
    imgSrc,
}: {
    title: string;
    description: string;
    imgSrc: string;
}) {
    return (
        <MotionDiv
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            whileHover={{ y: -5 }}
        >
            <Image
                src={imgSrc}
                alt={title}
                width={400}
                height={300}
                className="h-64 object-cover"
            />
            <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">{title}</h4>
                <p className="text-gray">{description}</p>
            </div>
        </MotionDiv>
    );
}
