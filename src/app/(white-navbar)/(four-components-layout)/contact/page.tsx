import ContactForm from "@/components/contact-form";
import ContactInfo from "@/components/contact-info";
import TitleBar from "@/components/title-bar";

const contactInfo = [
    {
        icon: "/icons/address-icon.png",
        iconSize: { h: 28.18, w: 22 },
        title: "Address",
        para: "236 5th SE Avenue, New York NY10000, United States",
    },
    {
        icon: "/icons/phone-icon.png",
        iconSize: { h: 30, w: 30 },
        title: "Phone",
        para: "Mobile: +(84) 546-6789\nHotline: +(84) 456-6789",
    },
    {
        icon: "/icons/clock-icon.png",
        iconSize: { h: 23, w: 23 },
        title: "Working Time",
        para: `Monday-Friday: 9:00 - 22:00\nSaturday-Sunday: 9:00 - 21:00`,
    },
];

function Contact() {
    return (
        <main className="wrapper pt-24 pb-[70px]">
            <TitleBar
                title="Get In Touch With Us"
                para="For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!"
                styleContainer="gap-[8px] mb-32"
                styleTitle="font-semibold"
                stylePara="font-normal max-w-[644px] mx-auto "
            />

            <div className="flex justify-between flex-wrap lg:px-56 px-7 gap-y-24">
                <ul className="space-y-10">
                    {contactInfo.map((info) => {
                        const { icon, iconSize, title, para } = info;
                        return (
                            <li key={info.title}>
                                <ContactInfo
                                    icon={icon}
                                    iconSize={iconSize}
                                    title={title}
                                    para={para}
                                />
                            </li>
                        );
                    })}
                </ul>
                <div>
                    <ContactForm />
                </div>
            </div>
        </main>
    );
}

export default Contact;
