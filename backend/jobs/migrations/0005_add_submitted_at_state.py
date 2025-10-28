from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("jobs", "0004_add_created_at"),
    ]

    operations = [
        migrations.SeparateDatabaseAndState(
            state_operations=[
                migrations.AddField(
                    model_name="application",
                    name="submitted_at",
                    field=models.DateTimeField(auto_now_add=True, db_column="submitted_at"),
                ),
            ],
            database_operations=[],
        )
    ]
