export interface Bidder {
  id: string;
  name: string;
  status: 'eligible' | 'ineligible' | 'manual_review';
  turnover: number | null;
  ocr_confidence: number;
  collusion_risk?: number;
  risk_level?: string;
  flags?: string[];
  rejection_reason?: string;
  review_reason?: string;
  documents: {
    type: string;
    filename: string;
    extractedText: string;
    confidence: number;
    status?: string;
  }[];
}

export interface TenderCriteria {
  id: string;
  name: string;
  type: 'mandatory' | 'optional';
  threshold: number | null;
  unit: string;
  description: string;
}

export const demoTender = {
  id: "TNDR-2026-CPWD-7842",
  title: "Construction of Administrative Building, Sector 17, Chandigarh",
  department: "Central Public Works Department",
  criteria: [
    { id: "C1", name: "Minimum Annual Turnover", type: "mandatory", threshold: 50000000, unit: "INR", description: "Bidder shall have minimum turnover of Rs 5 crore in last 3 financial years" },
    { id: "C2", name: "Valid GST Registration", type: "mandatory", threshold: null, unit: "N/A", description: "Active GSTIN required" },
    { id: "C3", name: "ISO 9001 Certification", type: "optional", threshold: null, unit: "N/A", description: "Preferred but not mandatory" },
    { id: "C4", name: "Relevant Experience", type: "mandatory", threshold: 5, unit: "Years", description: "Minimum 5 years in civil construction" },
    { id: "C5", name: "Bank Solvency", type: "mandatory", threshold: 20000000, unit: "INR", description: "Bank solvency certificate of at least Rs 2 crore" }
  ] as TenderCriteria[]
};

export const demoBidders: Bidder[] = [
  { 
    id: "B1", name: "Alpha Construction", status: "eligible", turnover: 85000000, ocr_confidence: 0.94,
    documents: [{ type: "TURNOVER_CERT", filename: "turnover_alpha.pdf", extractedText: "Turnover: 8.5cr", confidence: 0.94 }]
  },
  { 
    id: "B2", name: "Beta Infra Ltd", status: "eligible", turnover: 72000000, ocr_confidence: 0.91, collusion_risk: 79, risk_level: "HIGH",
    flags: ["Shared director: Rajesh Kumar", "Shared address: 42, Lajpat Nagar"],
    documents: [{ type: "TURNOVER_CERT", filename: "beta_infra_audit.pdf", extractedText: "Total: 7.2cr", confidence: 0.91 }]
  },
  { 
    id: "B3", name: "Gamma Builders", status: "eligible", turnover: 68000000, ocr_confidence: 0.89,
    documents: [{ type: "TURNOVER_CERT", filename: "gamma_cert.pdf", extractedText: "6.8cr", confidence: 0.89 }]
  },
  { 
    id: "B4", name: "Delta Projects", status: "eligible", turnover: 91000000, ocr_confidence: 0.96,
    documents: [{ type: "TURNOVER_CERT", filename: "delta_docs.pdf", extractedText: "9.1cr", confidence: 0.96 }]
  },
  { 
    id: "B5", name: "Epsilon Corp", status: "eligible", turnover: 73000000, ocr_confidence: 0.92, collusion_risk: 79, risk_level: "HIGH",
    flags: ["Shared director: Rajesh Kumar", "Shared address: 42, Lajpat Nagar"],
    documents: [{ type: "TURNOVER_CERT", filename: "epsilon_turnover.pdf", extractedText: "7.3cr", confidence: 0.92 }]
  },
  { 
    id: "B6", name: "Zeta Engineers", status: "eligible", turnover: 55000000, ocr_confidence: 0.88,
    documents: [{ type: "TURNOVER_CERT", filename: "zeta_audit.pdf", extractedText: "5.5cr", confidence: 0.88 }]
  },
  { 
    id: "B7", name: "Eta Ventures", status: "ineligible", turnover: 32000000, ocr_confidence: 0.95, 
    rejection_reason: "Turnover (Rs 3.2cr) below threshold (Rs 5cr)",
    documents: [{ type: "TURNOVER_CERT", filename: "eta_audit.pdf", extractedText: "3.2cr", confidence: 0.95 }]
  },
  { 
    id: "B8", name: "Theta Group", status: "ineligible", turnover: 48000000, ocr_confidence: 0.93,
    rejection_reason: "GST registration status: EXPIRED",
    documents: [{ type: "GST_CERT", filename: "gst_theta.pdf", extractedText: "Status: Expired 2023", confidence: 0.93, status: "expired" }]
  },
  { 
    id: "B9", name: "Iota Solutions", status: "ineligible", turnover: 41000000, ocr_confidence: 0.90,
    rejection_reason: "Missing mandatory document: Audit Report",
    documents: [{ type: "GST_CERT", filename: "iota_gst.pdf", extractedText: "Active", confidence: 0.90 }]
  },
  { 
    id: "B10", name: "Kappa Industries", status: "manual_review", turnover: null, ocr_confidence: 0.67,
    review_reason: "Ambiguous turnover figure due to camera angle",
    documents: [{ 
      type: "TURNOVER_CERT", 
      filename: "kappa_cert_scan.jpg", 
      extractedText: "Annual Turnover: Rs [4.8/8.4] crore — figure unclear due to photo angle", 
      confidence: 0.67 
    }]
  }
];
