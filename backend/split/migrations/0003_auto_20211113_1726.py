# Generated by Django 3.1.6 on 2021-11-13 16:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('split', '0002_groupuserrelate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='group',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='activities', to='split.splitgroup'),
        ),
    ]
