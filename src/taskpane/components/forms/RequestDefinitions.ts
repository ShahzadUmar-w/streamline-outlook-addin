export type RequestFieldType = "text" | "textarea" | "select" | "note" | "checkbox" | "multiselect";

export interface RequestFieldDefinition {
  name: string;
  label: string;
  type: RequestFieldType;
  options?: string[];
  required?: boolean;
  placeholder?: string;
  info?: string;
  conditional?: (values: Record<string, any>) => boolean;
}

export type RequestType =
  | "General Legal Request"
  | "Vendor Contract Request"
  | "Sales Contract Request"
  | "NDA"
  | "Privacy / AI Matters"
  | "Business Development Request";

export const requestTypes: RequestType[] = [
  "General Legal Request",
  "Vendor Contract Request",
  "Sales Contract Request",
  "NDA",
  "Privacy / AI Matters",
  "Business Development Request",
];

// Product lists used in multiple places
const xifinProducts = [
  "AI Products", "Billing Services (formerly OSB)", "CareAlerts", "Empower LIS",
  "Empower RCM (formerly RPM)", "Encounter- Rx", "Fusion Rx", "Other XiFin not listed",
  "Pharmacy Essentials (formerly known as CareCLAIM)", "Pharmacy Essentials (as a component of Pharmacy Enterprise)",
  "Radiology (not on Empower RCM XiFin RPM)", "SaaS+ Services added to Empower RCM", "Strand"
];

// HR Matter options
const hrMatterOptions = ["Benefits", "Employee Performance/ Termination", "All Other HR"];

// Privacy Matter options
const privacyMatterOptions = [
  "Data subject access request",
  "Customer request relating to privacy",
  "Product/development related request relating to privacy",
  "Billing services request relating to privacy",
  "Audit related privacy request"
];

// AI Matter options
const aiMatterOptions = [
  "New AI Tool for internal XiFin use",
  "Change in previously approved AI tool for internal XiFin use",
  "New AI product or service to be used for XiFin customers",
  "Change in AI product or service to be used for XiFin customers",
  "Vendor AI use",
  "Other AI related matters"
];

export const requestForms: Record<RequestType, { description: string; fields: any[] }> = {
  "General Legal Request": {
    description: "Submit a general legal matter for review and handling by the Legal department.",
    fields: [
      {
        name: "category",
        label: "Category of Request",
        type: "select",
        required: true,
        options: ["Accounting/ Finance", "Business Development", "Compliance/ Regulatory", "Corporate", 
          "Current Sales Contract Interpretation/ Question", "Current Vendor Contract Interpretation/ Question", 
          "Cybersecurity Questions (Non-Questionnaires)", "Development & Product", "EDI", "Facilities/ Leases", 
          "HR", "Insurance", "Intellectual Property (IP)", "IT", "Marketing", "Mergers & Acquisitions", 
          "Other Legal Matter", "Pre-Sales & Post- Sales Questionnaires", "Pre-Sales Questions", 
          "Subpoena/ Dispute/ Investigation/ Litigation/ Arbitration"],
      },
      {
        name: "hrMatter",
        label: "HR Matter",
        type: "select",
        required: true,
        options: hrMatterOptions,
        conditional: (v:any) => v.category === "HR",
      },
      { 
        name: "subject", 
        label: "What is the subject of your request?", 
        type: "text", 
        required: true,
        placeholder: "Brief summary of the matter"
      },
      { 
        name: "details", 
        label: "Please provide the details of your request.", 
        type: "textarea", 
        required: true,
        placeholder: "Provide comprehensive details including background, parties involved, and desired outcome",
        rows: 4
      },
      { 
        name: "urgent", 
        label: "Is your request urgent?", 
        type: "select", 
        required: true, 
        options: ["Yes", "No"] 
      },
      { 
        name: "deadline", 
        label: "If urgent, please specify the deadline", 
        type: "text", 
        required: false,
        conditional: (v:any) => v.urgent === "Yes",
        placeholder: "e.g., EOD today, By Friday, etc."
      },
      { 
        name: "note_attach", 
        label: "Direction", 
        type: "note", 
        info: "📎 Attach any supporting documents to this email." 
      },
    ],
  },

  "Vendor Contract Request": {
    description: "Submit vendor contract review request. Please ensure all compliance questions are answered accurately.",
    fields: [
      { 
        name: "counterparty", 
        label: "Counterparty name", 
        type: "text", 
        required: true,
        placeholder: "Full legal name of the vendor"
      },
      {
        name: "category", 
        label: "Category of request", 
        type: "select", 
        required: true,
        options: ["Accounting/ Finance", "Billing Services", "Business Development", "Compliance/ Regulatory", 
          "Corporate", "Cybersecurity", "EDI", "Facilities/ Leases", "HR", "Insurance", "IT/ Software", 
          "Intellectual Property (IP)", "Marketing", "Mergers & Acquisitions", "Other vendor contract not listed here", 
          "Technical Services"]
      },
      { 
        name: "subject", 
        label: "Subject", 
        type: "text", 
        required: true,
        placeholder: "Brief description of the contract purpose"
      },
      { 
        name: "contractType", 
        label: "Existing contract being modified or new contract?", 
        type: "select", 
        required: true, 
        options: ["Existing contract", "New contract"] 
      },
      {
        name: "existingContractDetails", 
        label: "Describe or attach the existing contract being modified", 
        type: "textarea", 
        required: true,
        conditional: (v:any) => v.contractType === "Existing contract",
        placeholder: "Provide contract number, date, or attach the document",
        rows: 3
      },
      { 
        name: "productDescription", 
        label: "Description of vendor products or services to be purchased", 
        type: "textarea", 
        required: true,
        placeholder: "Detailed description of what is being procured",
        rows: 3
      },
      { 
        name: "purpose", 
        label: "Purpose or use of purchased products/ services", 
        type: "textarea", 
        required: true,
        placeholder: "How will XiFin use these products/services?",
        rows: 3
      },
      { 
        name: "term", 
        label: "Term for which XiFin is purchasing each product or service", 
        type: "text",
        placeholder: "e.g., 1 year, 3 years, Month-to-month"
      },
      { 
        name: "hasMinPurchase", 
        label: "Is there a minimum purchase amount?", 
        type: "select", 
        options: ["Yes", "No"] 
      },
      { 
        name: "minSpend", 
        label: "What is the minimum spend?", 
        type: "text", 
        conditional: (v:any) => v.hasMinPurchase === "Yes",
        placeholder: "e.g., $10,000 annually"
      },
      { 
        name: "phiAccess", 
        label: "Will the vendor have access to any Protected Health Information (PHI)?", 
        type: "select", 
        required: true, 
        options: ["Yes", "No"] 
      },
      { 
        name: "piiAccess", 
        label: "Will the vendor have access to any Personally Identifiable Information (PII)?", 
        type: "select", 
        required: true, 
        options: ["Yes", "No"] 
      },
      { 
        name: "itReview", 
        label: "Has IT Security reviewed the vendor?", 
        type: "select", 
        required: true, 
        options: ["Yes", "No"], 
        info: "⚠️ If no, please immediately submit a request to IT Security. Legal action will be on hold pending such review."
      },
      { 
        name: "aiInvolved", 
        label: "Does this product involve any AI?", 
        type: "select", 
        required: true, 
        options: ["Yes", "No"], 
        info: "⚠️ If yes, AI Committee review is necessary. Legal action may be put on hold pending such review."
      },
      { 
        name: "offshore", 
        label: "Will this vendor provide any services to or behalf of XiFin outside of the United States?", 
        type: "select", 
        required: true, 
        options: ["Yes", "No"],
        info: "Examples: use of offshore data storage or personnel"
      },
      { 
        name: "offshoreLocations", 
        label: "If yes, please specify locations", 
        type: "text",
        conditional: (v:any) => v.offshore === "Yes",
        placeholder: "e.g., India, Philippines, etc."
      },
      { 
        name: "additionalDetails", 
        label: "Please provide additional details for your request", 
        type: "textarea",
        rows: 3
      },
      { 
        name: "note_attach", 
        label: "Direction", 
        type: "note", 
        info: "📎 Attach the counterparty's paper/contract draft to this email." 
      },
    ]
  },

  "Sales Contract Request": {
    description: "Submit sales contract request for customer agreements.",
    fields: [
      { 
        name: "product", 
        label: "XiFin product or service", 
        type: "select", 
        required: true, 
        options: xifinProducts 
      },
      { 
        name: "counterparty", 
        label: "Counterparty name", 
        type: "text", 
        required: true,
        placeholder: "Full legal name of customer"
      },
      { 
        name: "state", 
        label: "State of formation, if known", 
        type: "text",
        placeholder: "Delaware, California, etc."
      },
      { 
        name: "entityType", 
        label: "Type of entity, if known", 
        type: "select", 
        options: ["Corporation", "LLC", "Other"] 
      },
      { 
        name: "entityOther", 
        label: "If 'Other', please specify", 
        type: "text", 
        required: true, 
        conditional: (v:any) => v.entityType === "Other" 
      },
      { 
        name: "signer", 
        label: "Counterparty signer, if known", 
        type: "text",
        placeholder: "Name and title of authorized signer"
      },
      { 
        name: "industry", 
        label: "Customer industry", 
        type: "select", 
        required: true, 
        options: ["Hospital/ Medical System", "Laboratory/ Diagnostic", "Med Device", "Other", 
          "Pharmacy", "Radiology", "Specialty Pharmacy", "Specialty Physician"] 
      },
      { 
        name: "contractType", 
        label: "Existing contract being modified or new contract?", 
        type: "select", 
        required: true, 
        options: ["Existing contract", "New contract"] 
      },
      { 
        name: "existingDetails", 
        label: "Describe or attach the existing contract being modified", 
        type: "textarea", 
        required: true, 
        conditional: (v:any) => v.contractType === "Existing contract",
        placeholder: "Provide contract number, date, or attach the document",
        rows: 3
      },
      { 
        name: "isGov", 
        label: "Government/ Tribal/ Government-Funded entity?", 
        type: "select", 
        required: true, 
        options: ["Yes", "No"] 
      },
      { 
        name: "govEntity", 
        label: "List the specific Government/ Tribal/ Government-Funded entity", 
        type: "text", 
        required: true, 
        conditional: (v:any) => v.isGov === "Yes",
        placeholder: "e.g., U.S. Department of Health, State of California"
      },
      { 
        name: "pricing", 
        label: "Proposed pricing (including any additional or ancillary services)", 
        type: "textarea", 
        required: true,
        placeholder: "Detail all pricing components, discounts, and fees",
        rows: 3
      },
      { 
        name: "terms", 
        label: "Service order term and renewal terms", 
        type: "text", 
        required: true,
        placeholder: "e.g., 12 months initial term, auto-renewing annually"
      },
      { 
        name: "additionalInfo", 
        label: "Any additional information?", 
        type: "textarea",
        rows: 3
      },
      { 
        name: "annualRev", 
        label: "Expected annual revenue", 
        type: "text", 
        required: true,
        placeholder: "e.g., $50,000"
      },
      { 
        name: "offshore", 
        label: "Will XiFin use offshore personnel in its performance of the contract?", 
        type: "select", 
        required: true, 
        options: ["Yes", "No"] 
      },
      { 
        name: "subject", 
        label: "Request subject", 
        type: "text", 
        required: true,
        placeholder: "Clear, concise subject line"
      },
      { 
        name: "note_attach", 
        label: "Direction", 
        type: "note", 
        info: "📎 Attach any supporting files to this email." 
      },
    ]
  },

  "NDA": {
    description: "Submit Non-Disclosure Agreement request. Please identify the purpose and parties involved.",
    fields: [
      { 
        name: "counterparty", 
        label: "Counterparty name", 
        type: "text", 
        required: true,
        placeholder: "Full legal name of other party"
      },
      { 
        name: "state", 
        label: "State of formation, if known", 
        type: "text",
        placeholder: "Delaware, California, etc."
      },
      { 
        name: "entityType", 
        label: "Type of entity, if known", 
        type: "select", 
        options: ["Corporation", "LLC", "Other"] 
      },
      { 
        name: "entityOther", 
        label: "If 'Other', please specify", 
        type: "text", 
        conditional: (v:any) => v.entityType === "Other" 
      },
      { 
        name: "address", 
        label: "Counterparty address", 
        type: "text",
        placeholder: "Street address, city, state, zip"
      },
      { 
        name: "purpose", 
        label: "Purpose of the NDA", 
        type: "select", 
        required: true, 
        options: ["Sales prospect", "Existing customer", "Vendor", "Transactional"],
        info: "Transactional NDA is for potential mergers, acquisitions, business partnerships, and other strategic relationships/business development"
      },
      { 
        name: "hasPhi", 
        label: "Does this request involve Protected Health Information (PHI)?", 
        type: "select", 
        required: true, 
        options: ["Yes", "No"] 
      },
      { 
        name: "phiExplain", 
        label: "Please explain why PHI is necessary for this request", 
        type: "textarea", 
        required: true, 
        conditional: (v:any) => v.hasPhi === "Yes",
        rows: 3
      },
      { 
        name: "phiParty", 
        label: "Which party will be providing PHI?", 
        type: "checkbox", 
        options: ["XiFin", "Counterparty", "Third Party"], 
        required: true, 
        conditional: (v:any) => v.hasPhi === "Yes" 
      },
      { 
        name: "phiThirdParty", 
        label: "Who is the third party receiving PHI?", 
        type: "text", 
        required: true, 
        conditional: (v:any) => v.hasPhi === "Yes" && v.phiParty?.includes("Third Party") 
      },
      { 
        name: "hasPii", 
        label: "Does this request involve Personally Identifiable Information (PII) that is not PHI?", 
        type: "select", 
        required: true, 
        options: ["Yes", "No"] 
      },
      { 
        name: "piiParty", 
        label: "Which party will be providing PII?", 
        type: "checkbox", 
        options: ["XiFin", "Counterparty", "Third Party"], 
        required: true, 
        conditional: (v:any) => v.hasPii === "Yes" 
      },
      { 
        name: "piiThirdParty", 
        label: "Who is the third party receiving PII?", 
        type: "text", 
        required: true, 
        conditional: (v:any) => v.hasPii === "Yes" && v.piiParty?.includes("Third Party") 
      },
      { 
        name: "additionalInfo", 
        label: "Please provide any relevant additional information", 
        type: "textarea",
        rows: 3
      },
      { 
        name: "isXifinForm", 
        label: "Is this request a review of a XiFin form or counterparty form/template?", 
        type: "select", 
        required: true, 
        options: ["XiFin", "Counterparty"] 
      },
      { 
        name: "askedXifinForm", 
        label: "Have you asked the counterparty to use the XiFin form/template?", 
        type: "select", 
        required: true, 
        conditional: (v:any) => v.isXifinForm === "Counterparty", 
        options: ["Yes", "No"] 
      },
      { 
        name: "note_attach", 
        label: "Direction", 
        type: "note", 
        info: "📎 Please attach counterparty NDA form/template to this email." 
      },
    ]
  },

  "Privacy / AI Matters": {
    description: "Submit Privacy or Artificial Intelligence related matters for review.",
    fields: [
      { 
        name: "type", 
        label: "Please state if this is a Privacy or AI Matter request", 
        type: "select", 
        required: true, 
        options: ["Privacy related matter", "Artificial Intelligence related matter"] 
      },
      { 
        name: "privacyMatter", 
        label: "Privacy related matter", 
        type: "select", 
        required: true, 
        conditional: (v:any) => v.type === "Privacy related matter", 
        options: privacyMatterOptions 
      },
      { 
        name: "aiMatter", 
        label: "Artificial Intelligence related matter", 
        type: "select", 
        required: true, 
        conditional: (v:any) => v.type === "Artificial Intelligence related matter", 
        options: aiMatterOptions 
      },
      { 
        name: "summary", 
        label: "Please summarize the matter subject to this request, including what assistance you need.", 
        type: "textarea", 
        required: true,
        rows: 4,
        placeholder: "Provide comprehensive details about the matter and specific assistance needed"
      },
      { 
        name: "hasOtherParty", 
        label: "Does this request involve another party?", 
        type: "select", 
        required: true, 
        options: ["Yes", "No"] 
      },
      { 
        name: "partyType", 
        label: "What type of party does this request involve?", 
        type: "select", 
        required: true, 
        conditional: (v:any) => v.hasOtherParty === "Yes", 
        options: ["Customer", "Vendor", "Other party"] 
      },
      { 
        name: "otherPartyName", 
        label: "Please name the type of relationship with the other party", 
        type: "text", 
        required: true, 
        conditional: (v:any) => v.partyType === "Other party" 
      },
      { 
        name: "hasContract", 
        label: "Is there a contract in place with the other party?", 
        type: "select", 
        required: true, 
        conditional: (v:any) => v.partyType === "Other party", 
        options: ["Yes", "No"] 
      },
      { 
        name: "contractId", 
        label: "Please identify the relevant contract", 
        type: "text",
        placeholder: "Contract number or description"
      },
      { 
        name: "hasPhi", 
        label: "Does this request involve Protected Health Information (PHI)?", 
        type: "select", 
        required: true, 
        options: ["Yes", "No"] 
      },
      { 
        name: "phiReceive", 
        label: "Will XiFin be receiving another party's PHI?", 
        type: "select", 
        conditional: (v:any) => v.hasPhi === "Yes", 
        options: ["Yes", "No"] 
      },
      { 
        name: "phiShare", 
        label: "Will XiFin be sharing PHI with another party?", 
        type: "select", 
        conditional: (v:any) => v.hasPhi === "Yes", 
        options: ["Yes", "No"] 
      },
      { 
        name: "phiOther", 
        label: "Other type of PHI processing?", 
        type: "select", 
        conditional: (v:any) => v.hasPhi === "Yes", 
        options: ["Yes", "No"] 
      },
      { 
        name: "phiOtherExplain", 
        label: "Please explain the other type of PHI processing", 
        type: "textarea", 
        conditional: (v:any) => v.hasPhi === "Yes" && v.phiOther === "Yes",
        rows: 3
      },
      { 
        name: "hasPii", 
        label: "Does this request involve Personally Identifiable Information (PII) that is not PHI?", 
        type: "select", 
        required: true, 
        options: ["Yes", "No"] 
      },
      { 
        name: "piiReceive", 
        label: "Will XiFin be receiving another party's PII?", 
        type: "select", 
        conditional: (v:any) => v.hasPii === "Yes", 
        options: ["Yes", "No"] 
      },
      { 
        name: "piiShare", 
        label: "Will XiFin be sharing PII with another party?", 
        type: "select", 
        conditional: (v:any) => v.hasPii === "Yes", 
        options: ["Yes", "No"] 
      },
      { 
        name: "piiOther", 
        label: "Other type of PII processing?", 
        type: "select", 
        conditional: (v:any) => v.hasPii === "Yes", 
        options: ["Yes", "No"] 
      },
      { 
        name: "piiOtherExplain", 
        label: "Please explain the other type of PII processing", 
        type: "textarea", 
        conditional: (v:any) => v.hasPii === "Yes" && v.piiOther === "Yes",
        rows: 3
      },
      { 
        name: "hasPcii", 
        label: "Does this request involve Payment Card Industry Information (PCII)?", 
        type: "select", 
        required: true, 
        options: ["Yes", "No"] 
      },
      { 
        name: "pciiDescribe", 
        label: "Please describe XiFin's processing and exchange of PCII", 
        type: "textarea", 
        required: true, 
        conditional: (v:any) => v.hasPcii === "Yes",
        rows: 3
      },
      { 
        name: "note_attach", 
        label: "Direction", 
        type: "note", 
        info: "📎 Please attach any relevant documents to this email." 
      },
    ]
  },

  "Business Development Request": {
    description: "Submit business development and partnership opportunities for review.",
    fields: [
      { 
        name: "counterparty", 
        label: "Counterparty", 
        type: "text", 
        required: true,
        placeholder: "Full legal name of the potential partner"
      },
      { 
        name: "contactInfo", 
        label: "Counterparty contact individual information", 
        type: "text", 
        required: true,
        placeholder: "Name, title, email, phone number"
      },
      { 
        name: "website", 
        label: "Counterparty website, if available", 
        type: "text",
        placeholder: "https://..."
      },
      { 
        name: "relType", 
        label: "Does the potential business relationship include the following?", 
        type: "checkbox", 
        required: true, 
        options: ["Integration with XiFin products/ services", "Referral of opportunities", 
          "Distribution/ Sale", "Development", "Co-Marketing", "White Label product distribution", "Other"] 
      },
      { 
        name: "integrationProducts", 
        label: "Products/ services to be integrated", 
        type: "checkbox", 
        required: true, 
        options: xifinProducts, 
        conditional: (v:any) => v.relType?.includes("Integration with XiFin products/ services") 
      },
      { 
        name: "referralDirection", 
        label: "Referral of opportunities", 
        type: "select", 
        required: true, 
        conditional: (v:any) => v.relType?.includes("Referral of opportunities"), 
        options: ["To XiFin", "To the other party"] 
      },
      { 
        name: "referralComp", 
        label: "Describe compensation", 
        type: "text", 
        conditional: (v:any) => v.relType?.includes("Referral of opportunities"),
        placeholder: "e.g., 10% commission, flat fee, etc."
      },
      { 
        name: "referralProductList", 
        label: "List of products/ services", 
        type: "textarea", 
        required: true, 
        conditional: (v:any) => v.relType?.includes("Referral of opportunities"),
        rows: 3,
        placeholder: "Specify which products/services are covered"
      },
      { 
        name: "resaleBy", 
        label: "Resale", 
        type: "select", 
        conditional: (v:any) => v.relType?.includes("Distribution/ Sale") || v.relType?.includes("White Label product distribution"), 
        options: ["By XiFin", "By Counterparty"] 
      },
      { 
        name: "otherRelDetails", 
        label: "Please describe the other potential business relationship between the parties", 
        type: "textarea", 
        conditional: (v:any) => v.relType?.includes("Other"),
        rows: 3
      },
      { 
        name: "fees", 
        label: "Fees", 
        type: "checkbox", 
        required: true, 
        options: ["To XiFin", "To the other party"] 
      },
      { 
        name: "feeAmount", 
        label: "Please describe fee structure and amounts", 
        type: "textarea",
        rows: 2,
        placeholder: "Detail any fees, commissions, or payments"
      },
      { 
        name: "exclusivity", 
        label: "Exclusivity", 
        type: "select", 
        required: true, 
        options: ["In favor of XiFin", "In favor of the other party"] 
      },
      { 
        name: "ceoApproved", 
        label: "Has XiFin's CEO approved exclusivity in favor of the other party?", 
        type: "select", 
        required: true, 
        conditional: (v:any) => v.exclusivity === "In favor of the other party", 
        options: ["Yes", "No"] 
      },
      { 
        name: "strategicPoints", 
        label: "Additional strategic business points", 
        type: "textarea",
        rows: 3
      },
      { 
        name: "hasNda", 
        label: "Is there currently an NDA in place?", 
        type: "select", 
        options: ["Yes", "No"] 
      },
      { 
        name: "socAudit", 
        label: "Does the other party have a SOC audit report?", 
        type: "select", 
        options: ["Current SOC 1", "Current SOC 2", "Both"] 
      },
      { 
        name: "certs", 
        label: "Does the other party have additional certifications?", 
        type: "select", 
        options: ["HITRUST", "ISO", "Penetration test (Pentest)", "Vulnerability test", "Other"] 
      },
      { 
        name: "certsOther", 
        label: "Please specify other certifications", 
        type: "text",
        conditional: (v:any) => v.certs === "Other"
      },
      { 
        name: "cyberDueDiligence", 
        label: "Information/ Cybersecurity due diligence", 
        type: "select", 
        options: ["Performed", "To be performed"] 
      },
      { 
        name: "techDueDiligence", 
        label: "Technical due diligence", 
        type: "select", 
        options: ["Performed", "To be performed"] 
      },
      { 
        name: "bizDueDiligence", 
        label: "Business/ competitive due diligence", 
        type: "select", 
        options: ["Performed", "To be performed"] 
      },
      { 
        name: "note_attach", 
        label: "Direction", 
        type: "note", 
        info: "📎 Attach the pro forma financial projections for the first three years of the proposed opportunity to this email." 
      },
    ]
  }
};