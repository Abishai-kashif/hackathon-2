import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CustomSeperator from "./custom-separator";

function ProductBreadcrumb({ prodName }: { prodName: string }) {
    return (
        <div className="w-full h-[100px] flex flex-col sm:flex-row items-center gap-6">
            <Breadcrumb className="text-[16px] font-normal text-gray">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-black" />

                    <BreadcrumbItem>
                        <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-black" />
                </BreadcrumbList>
            </Breadcrumb>

            <CustomSeperator className="hidden sm:block w-[2px]" />

            <span className="inline-block">{prodName}</span>
        </div>
    );
}

export default ProductBreadcrumb;
