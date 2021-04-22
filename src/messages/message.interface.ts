// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DataObject = Record<string, any>;

export interface Message {
	sent: Date;
	sender: string;
	action: string;
	status?: number;
	ack?: boolean;
	received?: Date;
	data: DataObject;
}
