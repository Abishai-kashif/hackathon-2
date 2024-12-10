export function getOrdinal(day: number): string {
	// Handle the 'teens' special case (11th, 12th, 13th, etc.)
	if (day % 100 >= 11 && day % 100 <= 13) {
		// return `${day}th`;
		return "th";
	}

	// Map for suffixes based on the last digit
	const suffixMap: { [key: string]: string } = {
		"1": "st",
		"2": "nd",
		"3": "rd",
	};

	// Get the appropriate suffix or default to 'th'
	const lastDigit = (day % 10).toString();
	const suffix = suffixMap[lastDigit] || "th";
	// return `${day}${suffix}`;

	return suffix;
}
