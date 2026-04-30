import { CheckCircle, Eye, GraduationCap, XCircle } from 'lucide-react';
import { RoughPill, StickyLabel, WobblyCard } from '@/app/components/handdrawn';

const applications = [
  { id: 'a1', name: 'Fatima Zahra', email: 'fatima@lums.edu.pk', university: 'LUMS', city: 'Lahore', program: 'BS CS', year: '2027', status: 'pending', appliedAt: '1d ago', motivation: 'I run the LUMS Developers Society and want to bring build-in-public culture to campus.' },
  { id: 'a2', name: 'Ahmed Raza', email: 'ahmed@nust.edu.pk', university: 'NUST', city: 'Islamabad', program: 'BS SE', year: '2026', status: 'pending', appliedAt: '2d ago', motivation: 'Already organizing hackathons at NUST. Zehunt aligns perfectly with what we do.' },
  { id: 'a3', name: 'Priya Sharma', email: 'priya@iitd.ac.in', university: 'IIT Delhi', city: 'New Delhi', program: 'BTech CS', year: '2027', status: 'pending', appliedAt: '3d ago', motivation: 'Want to expand Zehunt to Indian universities. Strong startup community here.' },
  { id: 'a4', name: 'Usman Tariq', email: 'usman@fast.edu.pk', university: 'FAST-NUCES', city: 'Lahore', program: 'BS CS', year: '2028', status: 'accepted', appliedAt: '1w ago', motivation: 'Active in FAST coding community. Can onboard 30+ builders in first month.' },
  { id: 'a5', name: 'Sara Ali', email: 'sara@itu.edu.pk', university: 'ITU', city: 'Lahore', program: 'BS AI', year: '2027', status: 'rejected', appliedAt: '2w ago', motivation: 'Interested in AI and building.' },
];

const statusStyles: Record<string, string> = {
  pending: 'border-[#e5880a] bg-[#e5880a]/10 text-[#e5880a]',
  accepted: 'border-green-600 bg-green-50 text-green-700',
  rejected: 'border-[#ff4d4d] bg-[#ff4d4d]/10 text-[#ff4d4d]',
};

export default function AdminAmbassadorsPage() {
  return (
    <>
      <div className="mb-8">
        <StickyLabel>Ambassador Management</StickyLabel>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight">Ambassador Applications</h1>
        <p className="mt-1 text-xl">Review, approve, or reject ambassador applications from universities.</p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: 'Pending', value: String(applications.filter((a) => a.status === 'pending').length) },
          { label: 'Accepted', value: String(applications.filter((a) => a.status === 'accepted').length) },
          { label: 'Rejected', value: String(applications.filter((a) => a.status === 'rejected').length) },
          { label: 'Total', value: String(applications.length) },
        ].map((stat) => (
          <WobblyCard key={stat.label} className="bg-white text-center" rotate={0}>
            <p className="text-2xl font-extrabold">{stat.value}</p>
            <p className="text-sm font-bold text-[#2d2d2d]/60">{stat.label}</p>
          </WobblyCard>
        ))}
      </div>

      {/* Applications */}
      <div className="space-y-4">
        {applications.map((app) => (
          <WobblyCard key={app.id} className="bg-white" rotate={0}>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
                  <span className="text-lg font-extrabold">{app.name}</span>
                  <span
                    className={`inline-flex border-[2px] px-2.5 py-0.5 text-xs font-bold ${statusStyles[app.status]}`}
                    style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                  >
                    {app.status}
                  </span>
                </div>
                <span className="text-xs font-bold text-[#2d2d2d]/40">{app.appliedAt}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                <RoughPill>{app.university}</RoughPill>
                <RoughPill>{app.city}</RoughPill>
                <RoughPill>{app.program}</RoughPill>
                <RoughPill>Class of {app.year}</RoughPill>
              </div>

              <div
                className="border-[2px] border-dashed border-[#2d2d2d]/30 bg-[#fdfbf7] px-3 py-2 text-base italic"
                style={{ borderRadius: '45px 255px 35px 255px / 255px 35px 225px 45px' }}
              >
                &quot;{app.motivation}&quot;
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-[#2d2d2d]/60">{app.email}</p>
                {app.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      className="inline-flex h-9 items-center gap-1 border-[2px] border-green-600 bg-white px-3 text-sm font-bold text-green-600 transition-colors hover:bg-green-600 hover:text-white"
                      style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                    >
                      <CheckCircle className="h-3.5 w-3.5" strokeWidth={2.8} />
                      Accept
                    </button>
                    <button
                      className="inline-flex h-9 items-center gap-1 border-[2px] border-[#ff4d4d] bg-white px-3 text-sm font-bold text-[#ff4d4d] transition-colors hover:bg-[#ff4d4d] hover:text-white"
                      style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                    >
                      <XCircle className="h-3.5 w-3.5" strokeWidth={2.8} />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          </WobblyCard>
        ))}
      </div>
    </>
  );
}
