import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Register a clean font if possible, or use standard ones
// Note: Standard PDF fonts don't support many styles, so we define a simple system font stack
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#51bc8f',
  },
  date: {
    fontSize: 10,
    color: '#94a3b8',
  },
  hero: {
    marginBottom: 40,
    textAlign: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'black',
    color: '#0f172a',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  summaryCard: {
    backgroundColor: '#f8fafc',
    padding: 24,
    borderRadius: 12,
    marginBottom: 40,
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4f46e5',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 13,
    lineHeight: 1.6,
    color: '#1e293b',
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#51bc8f',
    paddingLeft: 12,
  },
  toolCard: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    borderRadius: 8,
    marginBottom: 16,
  },
  toolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  toolName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  toolSpend: {
    fontSize: 10,
    color: '#64748b',
  },
  toolReason: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 1.5,
    marginBottom: 12,
  },
  actionBox: {
    backgroundColor: '#f0fdf4',
    padding: 10,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#166534',
  },
  savingsText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#166534',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 9,
    color: '#94a3b8',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 20,
  }
});

interface AuditPDFProps {
  data: {
    total_monthly_savings: number;
    total_annual_savings: number;
    strategic_summary: string;
    per_tool_breakdown: Array<{
      tool_name: string;
      current_estimated_monthly_spend: number;
      recommended_action: string;
      estimated_monthly_savings: number;
      reasoning: string;
    }>;
  };
}

const AuditPDF: React.FC<AuditPDFProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>getPriced</Text>
        <Text style={styles.date}>Generated on {new Date().toLocaleDateString()}</Text>
      </View>

      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>${data.total_annual_savings.toLocaleString()} Annual Savings</Text>
        <Text style={styles.heroSubtitle}>Identified AI Stack Optimization Report</Text>
      </View>

      {/* Strategic Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Fractional CFO Analysis</Text>
        <Text style={styles.summaryText}>"{data.strategic_summary}"</Text>
      </View>

      {/* Tool Breakdown */}
      <Text style={styles.sectionTitle}>Detailed Stack Breakdown</Text>
      
      {data.per_tool_breakdown.map((tool, index) => (
        <View key={index} style={styles.toolCard} wrap={false}>
          <View style={styles.toolHeader}>
            <Text style={styles.toolName}>{tool.tool_name}</Text>
            <Text style={styles.toolSpend}>Current Spend: ${tool.current_estimated_monthly_spend}/mo</Text>
          </View>
          <Text style={styles.toolReason}>{tool.reasoning}</Text>
          <View style={styles.actionBox}>
            <Text style={styles.actionText}>ACTION: {tool.recommended_action}</Text>
            {tool.estimated_monthly_savings > 0 && (
              <Text style={styles.savingsText}>+${tool.estimated_monthly_savings}/mo</Text>
            )}
          </View>
        </View>
      ))}

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Confidential Audit Report • © 2026 getPriced • Secure SaaS Spend Management</Text>
      </View>
    </Page>
  </Document>
);

export default AuditPDF;
