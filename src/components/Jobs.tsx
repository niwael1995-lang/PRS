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
      <h2 className="text-2xl font-bold mb-4">Jobs & Interviews</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Open Vacancies</h3>
            {vacancies.length === 0 ? (
              <p>No vacancies posted.</p>
            ) : (
              <ul className="space-y-3">
                {vacancies.map((v) => (
                  <li key={v.id} className="p-4 border rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{v.title}</h4>
                        {v.location && <p className="text-sm text-muted-foreground">{v.location}</p>}
                      </div>
                      <div className="text-sm text-muted-foreground">{v.posted_date?.slice(0, 10)}</div>
                    </div>
                    {v.description && <p className="mt-2 text-sm">{v.description}</p>}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Scheduled Interviews</h3>
            {interviews.length === 0 ? (
              <p>No interviews scheduled.</p>
            ) : (
              <ul className="space-y-3">
                {interviews.map((it) => (
                  <li key={it.id} className="p-4 border rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{it.candidate_name}</h4>
                        <p className="text-sm text-muted-foreground">{it.vacancy?.title}</p>
                        {it.location && <p className="text-sm">Location: {it.location}</p>}
                      </div>
                      <div className="text-sm text-muted-foreground">{it.scheduled_at.slice(0, 16).replace("T", " ")}</div>
                    </div>
                    {it.notes && <p className="mt-2 text-sm">Notes: {it.notes}</p>}
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
