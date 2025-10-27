from django.db import models


class Vacancy(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    location = models.CharField(max_length=255, blank=True)
    min_salary = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    max_salary = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    posted_date = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title


class Interview(models.Model):
    vacancy = models.ForeignKey(Vacancy, on_delete=models.CASCADE, related_name="interviews")
    candidate_name = models.CharField(max_length=255)
    scheduled_at = models.DateTimeField()
    location = models.CharField(max_length=255, blank=True)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.candidate_name} — {self.vacancy.title}"
