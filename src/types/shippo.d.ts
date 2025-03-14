interface TrackingStatus {
	object_id: string;
	status: string;
	location?: {
		city: string;
		state: string;
		country: string;
	};
	tracking_history: TrackingHistoryEvent[];
}

interface TrackingHistoryEvent {
	status: string;
	status_date: string;
	location?: {
		city: string;
		state: string;
	};
}
