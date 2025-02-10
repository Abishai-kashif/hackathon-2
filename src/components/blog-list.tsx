import BlogPost from "./blog-post";

const posts = [
    {
        image: "/blogs/b-1.jpg",
        title: "Going all-in with millennial design",
        para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.",
        category: "Wood",
        href: "#",
    },
    {
        image: "/blogs/b-2.jpg",
        title: "Exploring new ways of decorating",
        para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.",
        category: "Handmade",
        href: "#",
    },
    {
        image: "/blogs/b-3.jpg",
        title: "Handmade pieces that took time to make",
        para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.",
        category: "Wood",
        href: "#",
    },
];

function BlogList() {
    return (
        <ul className="space-y-20 size-fit">
            {posts.map((post, idx) => {
                const { title, image, para, href, category } = post;
                return (
                    <li key={idx}>
                        <BlogPost
                            title={title}
                            image={image}
                            para={para}
                            href={href}
                            category={category}
                        />
                    </li>
                );
            })}
        </ul>
    );
}

export default BlogList;
