from django.db import models
from jobs.models import Application as BaseApplication


class Application(BaseApplication):
    """Proxy model to expose Applications under the 'Applicant' admin tab.

    Uses the same underlying table as jobs.Application but appears under the
    'Applicant' app with custom admin templates (card views, no form editing).
    """

    class Meta:
        proxy = True
        verbose_name = "Applicant"
        verbose_name_plural = "Applicants"
