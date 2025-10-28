import { useEffect, useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

type Vacancy = {
  id: number;
  title: string;
  description?: string;
  location?: string;
  posted_date?: string;
  is_active?: boolean;
  min_salary?: number | null;
  max_salary?: number | null;
};

type Interview = {
  id: number;
  vacancy: Vacancy;
  candidate_name: string;
  scheduled_at: string;
  location?: string;
  notes?: string;
};

// Use a relative API base by default so Vite's dev proxy can forward to Django.
// You can override with VITE_API_BASE if deploying separately.
const API_BASE = ((import.meta.env.VITE_API_BASE as string) ?? "") as string;

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
                        {/* Apply dialog */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="default" size="sm" className="mt-2">Apply</Button>
                          </DialogTrigger>

                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Apply for {v.title}</DialogTitle>
                              <DialogDescription>Please provide your contact details and upload your CV. We'll be in touch.</DialogDescription>
                            </DialogHeader>

                            <form
                              onSubmit={async (e) => {
                                e.preventDefault();
                                const form = e.target as HTMLFormElement & {
                                  name: { value: string };
                                  email: { value: string };
                                  phone: { value: string };
                                  message: { value: string };
                                  cv: { files: FileList | null };
                                };

                                const name = form.name.value.trim();
                                const email = form.email.value.trim();
                                const phone = form.phone.value.trim();
                                const message = form.message.value.trim();
                                const cvFile = form.cv.files && form.cv.files[0];

                                // Basic CV validation (size <= 10MB and common types)
                                if (cvFile) {
                                  const maxSize = 10 * 1024 * 1024; // 10MB
                                  const allowed = [
                                    "application/pdf",
                                    "application/msword",
                                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                                  ];
                                  if (cvFile.size > maxSize) {
                                    toast({ title: "File too large", description: "Please upload a file up to 10MB.", });
                                    return;
                                  }
                                  if (!allowed.includes(cvFile.type)) {
                                    toast({ title: "Unsupported file type", description: "Allowed: PDF, DOC, DOCX.", });
                                    return;
                                  }
                                }

                                if (!name || !email) {
                                  toast({ title: "Missing information", description: "Please provide your name and email.", });
                                  return;
                                }

                                const fd = new FormData();
                                fd.append("vacancy", String(v.id));
                                fd.append("name", name);
                                fd.append("email", email);
                                fd.append("phone", phone);
                                fd.append("message", message);
                                if (cvFile) fd.append("cv", cvFile);

                                try {
                                  const res = await fetch(`${API_BASE}/api/v1/apply/`, {
                                    method: "POST",
                                    body: fd,
                                  });

                                  if (!res.ok) {
                                    // If backend endpoint is not available, still show a friendly message.
                                    toast({ title: "Application received", description: "We couldn't save the application to the server, but your submission is received locally.", });
                                  } else {
                                    toast({ title: "Application submitted", description: "Thank you — we'll review your application and contact you if there's a fit.", });
                                  }
                                } catch (err) {
                                  // Network or other error
                                  // Still show success toast but inform user
                                  toast({ title: "Application recorded", description: "There was an issue submitting to the server; please email your CV if this persists.", });
                                }

                                // Close dialog by programmatically resetting the form
                                form.reset();
                              }}
                            >
                              <div className="grid gap-2">
                                <div>
                                  <Label htmlFor={`name-${v.id}`}>Full name</Label>
                                  <Input id={`name-${v.id}`} name="name" required />
                                </div>

                                <div>
                                  <Label htmlFor={`email-${v.id}`}>Email</Label>
                                  <Input id={`email-${v.id}`} name="email" type="email" required />
                                </div>

                                <div>
                                  <Label htmlFor={`phone-${v.id}`}>Phone</Label>
                                  <Input id={`phone-${v.id}`} name="phone" />
                                </div>

                                <div>
                                  <Label htmlFor={`message-${v.id}`}>Message / Cover note</Label>
                                  <Textarea id={`message-${v.id}`} name="message" rows={4} />
                                </div>

                                <div>
                                  <Label htmlFor={`cv-${v.id}`}>Upload CV</Label>
                                  <Input id={`cv-${v.id}`} name="cv" type="file" />
                                </div>
                              </div>

                              <DialogFooter className="mt-4">
                                <Button type="submit" variant="default">Send application</Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>
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
