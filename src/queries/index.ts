export const SIDE_TABLE_QUERY = `*[_type == "product" && "Side Table" in tags] | order(_createdAt desc)[0..1]  {
            _id,
            name,
            "image": images[0],
            slug
}`;

export const NEW_ARRIVAL_QUERY = `*[_type == "product" && "New Arrival" in tags][0] {
            _id,
            name,
            "image": images[0],
            slug
        }`;

export const TOP_PICKS_QUERY = `*[_type == "product" && "Top Pick" in tags][0..3] {
            _id,
            name,
            "image": images[0],
            price,
            slug
        }`;

export const STOCK_LEVELS_QUERY = `*[_type == "product" && _id == $productId][0] {
        stockLevel
      }`;

export const PRODUCTS_QUERY = `*[_type == "product"]`;

export const FILTRABLE_PRODUCTS_QUERY = `*[_type == "product"] 
| order(@[$sort] asc) [$offset...($offset+$limit)] {
        _id,
        name,
        price,
        "image": images[0],
        slug,
        price_id
}
        
`;

export const WISHLIST_QUERY = `*[_type == "product" && _id in $wishlistIds] {
        _id,
        name,
        price,
        "image": images[0],
        slug,
}`;

export const RELATED_PRODUCTS_QUERY = `*[_type == "product" && category->category == $category && _id != $id][0..3] {
            _id,
            name,
            price,
            "image": images[0],
            slug
}`;

export const PRODUCT_QUERY = `*[_type == "product" && slug.current == $slug][0] {
        _id,
        name,
        "images": images[].asset -> url,
        price,
        tags,
        description,
        "category": category -> category,
        sku,
        detailedDescription,
        additionalInfo,
        reviews,
        stockLevel,
        sizes,
        colors,
        price_id,
    }`;

export const SEARCH_RESULTS_QUERY = `*[_type == "product" && (
  name match ($searchTerm + "*") || 
  category->category match ($searchTerm + "*") || 
  count(tags[@ match ($searchTerm + "*")]) > 0
)][0..4] {
  _id,
  name,
  "slug": slug.current,
}`;
