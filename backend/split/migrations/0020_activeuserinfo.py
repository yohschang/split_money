# Generated by Django 4.0.1 on 2022-01-26 17:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('split', '0019_alter_activity_apaid'),
    ]

    operations = [
        migrations.CreateModel(
            name='ActiveUserInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('UIname', models.CharField(max_length=200, null=True)),
                ('UImoney', models.FloatField(blank=True, default=0.0, null=True)),
                ('UIweight', models.FloatField(blank=True, default=0.0, null=True)),
                ('UIjoin', models.BooleanField(default=False, null=True)),
                ('UIfianlmoney', models.FloatField(blank=True, default=0.0, null=True)),
                ('activity', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='userinfo', to='split.activity')),
            ],
        ),
    ]
