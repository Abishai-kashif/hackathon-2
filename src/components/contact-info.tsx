import Image from "next/image";

interface IProps {
    icon: string;
    iconSize: { w: number; h: number };
    title: string;
    para: string;
}

function ContactInfo({ icon, iconSize, title, para }: IProps) {
    const { h, w } = iconSize;

    return (
        <div className="flex">
            {/* icon */}
            <div className={`h-[${h}] w-[${w}] pr-6 pt-1`}>
                <Image
                    src={icon}
                    alt="icon"
                    height={h}
                    width={w}
                    className={`h-[${h}] w-[${w}] object-contain object-center`}
                />
            </div>

            <div>
                <h3 className="text-[24px] font-medium">{title}</h3>
                <p className="max-w-[212px] text-[16px] whitespace-pre-line">
                    {para}
                </p>
            </div>
        </div>
    );
}

export default ContactInfo;
