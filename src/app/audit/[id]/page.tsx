import { redirect } from 'next/navigation';
import { Metadata } from 'next';

async function getAuditData(id: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
    const res = await fetch(`${apiUrl}/api/audit/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const data = await getAuditData(id);
  
  if (!data) return { title: 'Audit Not Found | GetPriced' };

  const savings = parseFloat(data.total_monthly_savings).toLocaleString();
  return {
    title: `Save $${savings}/mo on AI Spend | GetPriced Audit`,
    description: `We identified $${savings}/mo in potential savings for this AI stack.`,
  };
}

export default async function PublicAuditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/audit-results?id=${id}`);
}
