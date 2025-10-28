from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("jobs", "0003_application"),
    ]

    operations = [
        migrations.RunSQL(
            sql=(
                "ALTER TABLE jobs_application ADD COLUMN created_at datetime DEFAULT CURRENT_TIMESTAMP"
            ),
            reverse_sql=(
                "-- SQLite does not support DROP COLUMN; leaving created_at in place on reverse"
            ),
        )
    ]
