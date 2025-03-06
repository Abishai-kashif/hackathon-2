export default {
	name: "order",
	type: "document",
	title: "Order",
	fields: [
		{
			name: "name",
			type: "string",
			title: "Name",
		},
		{
			name: "email",
			type: "string",
			title: "Email",
		},
		{
			name: "address",
			type: "string",
			title: "Address",
		},
		{
			name: "city",
			type: "string",
			title: "City",
		},
		{
			name: "phone",
			type: "string",
			title: "Phone",
		},
		{
			name: "paymentMethod",
			type: "string",
			title: "Payment Method",
		},
		{
			name: "clientSecret",
			type: "string",
			title: "Client Secret",
			hidden: true,
		},
		{
			name: "products",
			type: "array",
			title: "Products",
			of: [
				{
					type: "object",
					fields: [
						{
							name: "id",
							type: "string",
							title: "ID",
						},
						{
							name: "quantity",
							type: "number",
							title: "Quantity",
						},
					],
				},
			],
		},
	],
};
