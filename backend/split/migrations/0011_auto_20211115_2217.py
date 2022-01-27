# Generated by Django 3.1.6 on 2021-11-15 21:17

from django.db import migrations, models
import split.models


class Migration(migrations.Migration):

    dependencies = [
        ('split', '0010_auto_20211115_2213'),
    ]

    operations = [
        migrations.AlterField(
            model_name='splitgroup',
            name='Gid',
            field=models.CharField(default=split.models.gen_id, max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='splituser',
            name='Uid',
            field=models.CharField(default=split.models.gen_id, max_length=10, null=True),
        ),
    ]