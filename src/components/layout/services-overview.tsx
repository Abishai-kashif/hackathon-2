const services = [
    {
        title: "Free Delivery",
        para: "For all oders over $50, consectetur adipim scing elit.",
    },
    {
        title: "90 Days Return",
        para: "If goods have problems, consectetur adipim scing elit.",
    },
    {
        title: "Secure Payment",
        para: "100% secure payment, consectetur adipim scing elit.",
    },
];

export function Service({ title, para }: { title: string; para: string }) {
    return (
        <div className="max-w-[376px] mx-auto md:mx-0  ">
            <h3 className="font-medium text-[32px] text-black">{title}</h3>
            <p className="font-normal text-[20px] text-gray">{para}</p>
        </div>
    );
}

function ServicesOverview() {
    return (
        <div className="wrapper h-auto lg:h-[300px] bg-azure px-3 md:px-24 py-10 lg:py-0 overflow-hidden">
            <ul className=" h-full w-full grid place-content-center grid-cols-1 text-center md:text-start md:grid-cols-2 lg:grid-cols-3 gap-[40px]">
                {services.map((service, idx) => (
                    <li key={idx}>
                        <Service title={service.title} para={service.para} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ServicesOverview;
