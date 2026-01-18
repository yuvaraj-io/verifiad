"use client";

export default function BusinessDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-purple-600">
          Business Dashboard
        </h1>
        <p className="text-sm text-gray-600">
          Manage campaigns, creators, and analytics
        </p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card title="Account Status" value="Pending Verification" />
        <Card title="Active Campaigns" value="0" />
        <Card title="Creators Hired" value="0" />
        <Card title="Total Spend" value="₹0" />
      </div>

      {/* Main Sections */}
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Section title="Verification Status">
          <p className="text-sm text-gray-600">
            Your business verification is under review.
          </p>
        </Section>

        <Section title="Campaign Overview">
          <p className="text-sm text-gray-600">
            No campaigns created yet.
          </p>
        </Section>
      </div>
    </div>
  );
}

/* ---------- UI Helpers ---------- */

function Card({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-gray-800">
        {value}
      </p>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-3 text-lg font-medium text-gray-800">
        {title}
      </h2>
      {children}
    </div>
  );
}
