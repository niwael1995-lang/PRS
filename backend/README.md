# Backend (Django)

This folder contains a minimal Django backend to manage Vacancies and Interviews and expose a small REST API that the frontend can consume.

Quick setup (Windows PowerShell):

1. Create and activate a virtual environment

```powershell
python -m venv .venv; .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

2. Apply migrations and create superuser

```powershell
python manage.py migrate
python manage.py createsuperuser
```

3. Run the server

```powershell
python manage.py runserver
```

Default API endpoints:

- GET /api/v1/vacancies/  — list vacancies
- GET /api/v1/interviews/ — list interviews

The Django admin is available at /admin/ (use the superuser to add vacancies/interviews).

Notes:
- For development ease this config allows CORS from frontend and uses SQLite.
- Consider securing and configuring for production before deploying.
