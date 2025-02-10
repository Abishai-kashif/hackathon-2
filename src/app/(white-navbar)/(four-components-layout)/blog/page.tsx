import BlogList from "@/components/blog-list";
import Pagination from "@/components/pagination";
import Search from "@/components/search";
import SideBar from "@/components/side-bar";

function BlogPage() {
    return (
        <main className="wrapper overflow-x-hidden flex flex-col items-center justify-center mt-28 xl:pl-16 xl:pr-10 px-5">
            <div className="flex lg:flex-row flex-col-reverse gap-[65px]">
                <BlogList />
                <div>
                    <Search />
                    <SideBar />
                </div>
            </div>

            {/* mb-[88px] */}
            <div className="size-fit mx-auto mt-28 mb-[88px] ">
                <Pagination searchParams={{ page: "1", show: "3" }} />
            </div>
        </main>
    );
}

export default BlogPage;
