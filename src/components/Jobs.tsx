import { useEffect, useState } from "react";

type Vacancy = {
  id: number;
  title: string;
  description?: string;
  location?: string;
  posted_date?: string;
};

type Interview = {
  id: number;
  vacancy: Vacancy;
  candidate_name: string;
  scheduled_at: string;
  location?: string;
  notes?: string;
};

const API_BASE = (import.meta.env.VITE_API_BASE as string) || "http://localhost:8000";

const Jobs = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);

  const formatCurrency = (value?: number | string | null) => {
    if (value == null || value === "") return null;
    const num = typeof value === "string" ? Number(value) : Number(value || 0);
    if (!isFinite(num)) return null;
    return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(num);
  };

  const salaryLabel = (min?: number | string | null, max?: number | string | null) => {
    const minLabel = formatCurrency(min);
    const maxLabel = formatCurrency(max);
    if (minLabel && maxLabel) return `${minLabel} — ${maxLabel}`;
    return minLabel || maxLabel || "Not specified";
  };

  const formatDateTime = (iso?: string) => {
    if (!iso) return "";
    try {
      const d = new Date(iso);
      return d.toLocaleString();
    } catch (e) {
      return iso;
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const [vRes, iRes] = await Promise.all([
          fetch(`${API_BASE}/api/v1/vacancies/`),
          fetch(`${API_BASE}/api/v1/interviews/`),
        ]);

        if (!vRes.ok || !iRes.ok) return;

        const [vData, iData] = await Promise.all([vRes.json(), iRes.json()]);
        if (mounted) {
          setVacancies(vData);
          setInterviews(iData);
        }
      } catch (err) {
        // Silently ignore for now; better error handling can be added later
        // eslint-disable-next-line no-console
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="jobs" className="container mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-6">Jobs & Interviews</h2>
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-base text-muted-foreground">Loading...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Open Vacancies</h3>
            {vacancies.length === 0 ? (
              <p className="text-sm text-muted-foreground">No vacancies posted.</p>
            ) : (
              <ul className="space-y-4">
                {vacancies.map((v) => (
                  <li key={v.id} className="p-6 bg-white/60 dark:bg-slate-800 border border-border rounded-lg shadow-sm hover:shadow-lg transition">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-foreground">{v.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{v.location || "Location not specified"}</p>
                        {v.description && <p className="mt-3 text-sm leading-relaxed text-foreground/90">{v.description}</p>}
                      </div>

                      <div className="flex flex-col items-end space-y-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium">{salaryLabel((v as any).min_salary, (v as any).max_salary)}</span>
                        <span className="text-xs text-muted-foreground">{v.posted_date ? new Date(v.posted_date).toLocaleDateString() : ""}</span>
                        {v.is_active ? <span className="text-xs text-green-600 font-medium">Active</span> : <span className="text-xs text-red-600 font-medium">Closed</span>}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">Scheduled Interviews</h3>
            {interviews.length === 0 ? (
              <p className="text-sm text-muted-foreground">No interviews scheduled.</p>
            ) : (
              <ul className="space-y-4">
                {interviews.map((it) => (
                  <li key={it.id} className="p-4 bg-white/50 dark:bg-slate-800 border border-border rounded-lg shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{it.candidate_name}</h4>
                        <p className="text-sm text-muted-foreground">{it.vacancy?.title}</p>
                        {it.location && <p className="text-sm mt-1">Location: {it.location}</p>}
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-medium text-foreground">{formatDateTime(it.scheduled_at)}</div>
                        {it.notes && <p className="text-xs text-muted-foreground mt-1">Notes: {it.notes}</p>}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Jobs;
