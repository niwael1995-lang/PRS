from django.contrib import admin
from .models import Vacancy, Interview


@admin.register(Vacancy)
class VacancyAdmin(admin.ModelAdmin):
    list_display = ("title", "location", "min_salary", "max_salary", "posted_date", "is_active")
    list_filter = ("is_active", "location")
    search_fields = ("title", "description")
    fields = ("title", "description", "location", "min_salary", "max_salary", "is_active")

    class Media:
        css = {"all": ("jobs/admin.css",)}


@admin.register(Interview)
class InterviewAdmin(admin.ModelAdmin):
    list_display = ("candidate_name", "vacancy", "scheduled_at", "location")
    list_filter = ("scheduled_at",)
    search_fields = ("candidate_name", "notes")
