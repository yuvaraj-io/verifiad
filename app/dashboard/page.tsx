"use client";

export default function CreatorDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-purple-600">
          Creator Dashboard
        </h1>
        <p className="text-sm text-gray-600">
          Manage your profile, content, and earnings
        </p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card title="Profile Status" value="Under Review" />
        <Card title="Campaigns Joined" value="0" />
        <Card title="Total Earnings" value="₹0" />
      </div>

      {/* Main Content */}
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Section title="Verification">
          <p className="text-sm text-gray-600">
            Your documents are being reviewed by our team.
          </p>
        </Section>

        <Section title="Recent Activity">
          <p className="text-sm text-gray-600">
            No activity yet.
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
