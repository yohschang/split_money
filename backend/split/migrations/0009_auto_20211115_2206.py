# Generated by Django 3.1.6 on 2021-11-15 21:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('split', '0008_auto_20211115_2204'),
    ]

    operations = [
        migrations.AlterField(
            model_name='splitgroup',
            name='Gid',
            field=models.IntegerField(default='1115210', null=True),
        ),
        migrations.AlterField(
            model_name='splituser',
            name='Uid',
            field=models.IntegerField(default='11152106', null=True),
        ),
    ]
