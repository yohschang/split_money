# Generated by Django 4.0.1 on 2022-01-24 19:08

import django.contrib.postgres.fields
from django.db import migrations, models
import split.models


class Migration(migrations.Migration):

    dependencies = [
        ('split', '0017_activity_ajoined'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='APaid',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='activity',
            name='AfinalMoney',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.FloatField(), blank=True, default=split.models.g_limits, null=True, size=None),
        ),
    ]
