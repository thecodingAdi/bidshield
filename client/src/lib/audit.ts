import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export type AuditActor = "SYSTEM" | "OFFICER";
export type AuditAction = "EVALUATION" | "FRAUD_DETECTION" | "MANUAL_REVIEW" | "OVERRIDE" | "CRITERIA_REGISTRY_APPROVAL";

export interface AuditEntry {
  id: string;
  timestamp: string;
  actor: AuditActor;
  action: AuditAction;
  bidderId?: string;
  details: string;
  previousHash: string;
  currentHash: string;
}

export async function sha256(message: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export class AuditLog {
  private entries: AuditEntry[] = [];

  constructor(initialEntries?: AuditEntry[]) {
    if (initialEntries) {
      this.entries = initialEntries;
    }
  }

  getEntries() {
    return [...this.entries];
  }

  async addEntry(data: {
    actor: AuditActor;
    action: AuditAction;
    bidderId?: string;
    details: string;
  }): Promise<AuditEntry> {
    const id = (this.entries.length + 1).toString();
    const timestamp = new Date().toISOString();
    const previousHash = this.entries.length > 0 
      ? this.entries[this.entries.length - 1].currentHash 
      : "0";
    
    const content = id + timestamp + data.actor + data.action + data.details + previousHash;
    const currentHash = await sha256(content);

    const entry: AuditEntry = {
      id,
      timestamp,
      actor: data.actor,
      action: data.action,
      bidderId: data.bidderId,
      details: data.details,
      previousHash,
      currentHash
    };

    this.entries.push(entry);
    return entry;
  }

  async verifyIntegrity(): Promise<boolean> {
    for (let i = 0; i < this.entries.length; i++) {
      const entry = this.entries[i];
      const previousHash = i === 0 ? "0" : this.entries[i - 1].currentHash;
      
      if (entry.previousHash !== previousHash) return false;
      
      const content = entry.id + entry.timestamp + entry.actor + entry.action + entry.details + entry.previousHash;
      const recalculatedHash = await sha256(content);
      
      if (entry.currentHash !== recalculatedHash) return false;
    }
    return true;
  }

  tamper(index: number, newDetails: string) {
    if (this.entries[index]) {
      this.entries[index].details = newDetails;
    }
  }

  async exportToPDF(tenderId: string): Promise<void> {
    const doc = new jsPDF();
    const isIntegrityValid = await this.verifyIntegrity();
    const rootHash = this.entries.length > 0 ? this.entries[this.entries.length - 1].currentHash : "N/A";

    // Header
    doc.setFontSize(22);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text("BidShield - Official Audit Trail", 14, 22);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Tender ID: ${tenderId}`, 14, 30);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 35);
    doc.text(`Total Entries: ${this.entries.length}`, 14, 40);

    // Warning Banner
    if (isIntegrityValid) {
        doc.setFillColor(240, 253, 244); // emerald-50
        doc.rect(14, 45, 182, 10, 'F');
        doc.setTextColor(21, 128, 61); // emerald-700
        doc.text("✓ This document is cryptographically signed. Any modification invalidates the chain.", 18, 51);
    } else {
        doc.setFillColor(254, 242, 242); // rose-50
        doc.rect(14, 45, 182, 10, 'F');
        doc.setTextColor(190, 18, 60); // rose-700
        doc.text("✗ INTEGRITY FAILED: This audit trail has been tampered with.", 18, 51);
    }

    const tableData = this.entries.map(e => [
      e.id,
      new Date(e.timestamp).toLocaleTimeString(),
      e.actor,
      e.action,
      e.bidderId || '-',
      e.details,
      e.currentHash.substring(0, 8) + "..."
    ]);

    autoTable(doc, {
      startY: 60,
      head: [['#', 'Time', 'Actor', 'Action', 'Bidder', 'Details', 'Hash']],
      body: tableData,
      headStyles: { fillColor: [15, 23, 42], textColor: 255 },
      styles: { fontSize: 8 },
      columnStyles: {
        5: { cellWidth: 60 }, // Details column width
        6: { font: 'courier' }
      }
    });

    // Footer
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(`Page ${i} of ${pageCount} | Root Hash: ${rootHash}`, 14, doc.internal.pageSize.height - 10);
    }

    // Last Page Status
    if (pageCount > 0) {
        const finalY = (doc as any).lastAutoTable.finalY + 20;
        doc.setFontSize(12);
        if (isIntegrityValid) {
            doc.setTextColor(21, 128, 61);
        } else {
            doc.setTextColor(190, 18, 60);
        }
        doc.text(`Integrity Verification: ${isIntegrityValid ? 'PASS ✓' : 'FAIL ✗'}`, 14, finalY);
    }

    doc.save(`BidShield_Audit_${tenderId}_${new Date().toISOString().split('T')[0]}.pdf`);
  }
}
