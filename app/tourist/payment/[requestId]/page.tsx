import { PaymentPageClient } from "@/components/payment-page-client"

// Generate static params for payment pages
// Since request IDs are dynamic, we generate a few placeholders for the static build.
// Real usage might depend on Client Side Logic or standard routing if hosted on Vercel.
// For static export manual upload, only these specific IDs will work directly if typed in URL.
// But mostly users click links, so we're ensuring the BUILD succeeds.
export async function generateStaticParams() {
  return [
    { requestId: "demo-123" },
    { requestId: "mock-payment-1" },
  ]
}

export default async function PaymentPage({ params }: { params: Promise<{ requestId: string }> }) {
  const { requestId } = await params
  return <PaymentPageClient requestId={requestId} />
}
