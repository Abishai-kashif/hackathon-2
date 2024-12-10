import SideTableCard from "../side-table-card";

function SideTable() {
    return (
        <section className="wrapper h-auto lg:h-[672px] bg-azure flex flex-col lg:flex-row gap-x-5 justify-center items-center p-5">
            <SideTableCard
                productImage="/home/side-table1.png"
                productName="Side table"
                href="#"
            />
            <SideTableCard
                productImage="/home/side-table2.png"
                productName="Side table"
                href="#"
            />
        </section>
    );
}

export default SideTable;
