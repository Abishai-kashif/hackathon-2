export default {
	name: "product",
	type: "document",
	title: "Product",
	fields: [
		{
			name: "name",
			type: "string",
			title: "Name",
		},
		{
			name: "price",
			type: "number",
			title: "Price",
		},
		{
			name: "description",
			type: "text",
			title: "Description",
		},
		{
			name: "stockLevel",
			type: "number",
			title: "Stock Level",
		},
		{
			name: "tags",
			type: "array",
			title: "Tags",
			of: [{ type: "string" }],
		},
		{
			name: "sku",
			type: "string",
			title: "SKU",
		},
		{
			name: "category",
			type: "reference",
			title: "Category",
			to: [{ type: "category" }],
		},
		{
			name: "additionalInfo",
			type: "object",
			title: "Additional Info",
			fields: [
				{
					name: "material",
					type: "string",
					title: "Material",
				},
				{
					name: "construction",
					type: "string",
					title: "Construction",
				},
				{
					name: "care",
					type: "string",
					title: "Care Instructions",
				},
			],
		},
		{
			name: "reviews",
			type: "array",
			title: "Reviews",
			of: [
				{
					type: "object",
					fields: [
						{
							name: "stars",
							type: "number",
							title: "Stars",
						},
						{
							name: "comment",
							type: "text",
							title: "Comment",
						},
						{
							name: "user",
							type: "string",
							title: "User",
						},
						{
							name: "date",
							type: "date",
							title: "Date",
						},
					],
				},
			],
		},
		{
			name: "images",
			type: "array",
			title: "Images",
			of: [{ type: "image" }],
		},
		{
			name: "colors",
			type: "array",
			title: "Colors",
			of: [{ type: "string" }],
		},
		{
			name: "sizes",
			type: "array",
			title: "Sizes",
			of: [{ type: "string" }],
		},
		{
			name: "detailedDescription",
			type: "text",
			title: "Detailed Description",
		},
		{
			name: "slug",
			type: "slug",
			title: "Slug",
			options: {
				source: "name",
				maxLength: 96,
			},
		},
		{
			name: "price_id",
			type: "string",
			title: "Price ID",
		},
	],
};
