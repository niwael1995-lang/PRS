from rest_framework import serializers
from .models import Vacancy, Interview


class VacancySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacancy
        fields = [
            "id",
            "title",
            "description",
            "location",
            "min_salary",
            "max_salary",
            "posted_date",
            "is_active",
        ]


class InterviewSerializer(serializers.ModelSerializer):
    vacancy = VacancySerializer(read_only=True)

    class Meta:
        model = Interview
        fields = ["id", "vacancy", "candidate_name", "scheduled_at", "location", "notes"]
