export interface ValidateCfdiResult {
	isValid: boolean;
	errors: string[];
	parsedXML?: any;
}
