export type RequestFieldType = "text" | "textarea" | "select" | "note" | "checkbox" | "multiselect";

export interface RequestFieldDefinition {
  name: string;
  label: string;
  type: RequestFieldType;
  options?: string[];
  required?: boolean;
  placeholder?: string;
  info?: string;
  rows?: number;
  conditional?: (values: Record<string, any>) => boolean;
}

export type RequestType =
  | "General Legal Request"
  | "Vendor Contract Request"
  | "Sales Contract Request"
  | "NDA"
  | "Privacy / AI Matters"
  | "Business Development Request";
