# Generated by Django 3.1.6 on 2021-11-15 21:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('split', '0005_delete_groupuserrelate'),
    ]

    operations = [
        migrations.AddField(
            model_name='splitgroup',
            name='Gid',
            field=models.IntegerField(null=True, verbose_name='21111521004764'),
        ),
    ]