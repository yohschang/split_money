# Generated by Django 4.0.1 on 2022-01-24 19:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('split', '0018_activity_apaid_activity_afinalmoney'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='APaid',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
