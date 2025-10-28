from django.contrib import admin
from django.utils.html import format_html
from .models import Application


@admin.register(Application)
class ApplicantAdmin(admin.ModelAdmin):
    """Card-based read-only admin for Applicants (proxy of jobs.Application)."""

    change_form_template = "admin/applicant/application/change_form.html"
    change_list_template = "admin/applicant/application/change_list.html"

    list_display = ("name", "email", "vacancy", "created_at", "cv_link")
    list_filter = ("created_at", "vacancy")
    search_fields = ("name", "email", "vacancy__title")
    readonly_fields = ("name", "email", "phone", "vacancy", "message", "cv", "submitted_at", "created_at")
    ordering = ("-created_at",)

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        # Allow opening the detail page (renders a read-only card, no save)
        return True

    def has_delete_permission(self, request, obj=None):
        return False

    def cv_link(self, obj):
        if obj.cv:
            return format_html('<a href="{}" download>Download CV</a>', obj.cv.url)
        return "—"

    cv_link.short_description = "CV"

    class Media:
        css = {"all": ("applicant/admin.css",)}
