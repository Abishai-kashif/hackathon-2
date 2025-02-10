import getData, { isError } from "@/utils";
import SideTableCard from "../side-table-card";
import { ProductPreview } from "@/types";
import { urlFor } from "@/sanity/lib/image";
import { SIDE_TABLE_QUERY } from "@/queries";
import ErrorMessage from "../error-message";

async function SideTable() {
    const classes =
        "wrapper h-auto lg:h-[672px] bg-azure flex flex-col lg:flex-row gap-x-5 justify-center  p-5 px-24";

    const sideTables = await getData<ProductPreview[]>(SIDE_TABLE_QUERY);

    if (!sideTables) {
        return (
            <ErrorMessage
                className="text-black"
                message={"Something went wrong while fetching side tables"}
            />
        );
    }

    if (isError(sideTables)) {
        return <ErrorMessage message={sideTables.message} />;
    }

    return (
        <section className={classes}>
            {sideTables.map((table) => {
                const { _id, image, name, slug } = table;
                return (
                    <SideTableCard
                        key={_id}
                        productImage={urlFor(image).url()}
                        productName={name}
                        href={`/${slug.current}`}
                    />
                );
            })}
        </section>
    );
}

export default SideTable;
