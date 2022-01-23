from django.db import models
from datetime import datetime
from django.db.models.base import Model
from django.contrib.postgres.fields import ArrayField
from django.db.models.deletion import CASCADE

# Create your models here.

limits = 20


def g_limits(): return list([0]*limits)
def gen_id(): return datetime.utcnow().strftime('%Y%m%d%H%M%S%f')[4:14]


class SplitGroup(models.Model):
    Gname = models.CharField(max_length=200)
    # only the one been assign to field will be added in to database
    Gid = models.CharField(max_length=10, default=gen_id, null=True)
    Gdate = models.DateTimeField(auto_now_add=True)
    totalMoney = ArrayField(models.FloatField(), null=True, blank=True)
    joinedUser = ArrayField(models.CharField(
        max_length=100), null=True, blank=True)

    # joinedUser = SplitUser.objects.filter(joinedGroup__Gname__contains = "play")

    def __str__(self):
        return self.Gname


class Activity(models.Model):
    group = models.ForeignKey(SplitGroup, related_name='activities', null=True,
                              on_delete=models.SET_NULL)  # related_name is set for SplitGroup to search which(activity) related them
    # namely, when use group.activities.all() all activities under group can be listed
    Aname = models.CharField(max_length=200)
    Adate = datetime.utcnow().strftime('%Y%m%d')
    Atime = datetime.utcnow().strftime('%H%M%S')
    AMoney = ArrayField(models.FloatField(), null=True,
                        blank=True, default=g_limits)
    Aweighted = ArrayField(models.FloatField(), null=True,
                           blank=True, default=g_limits)
    AtotalMoney = models.FloatField(null=True, blank=False)
    Ajoined = ArrayField(models.BooleanField(), null=True,
                         blank=True, default=list([False]*limits))
    # the group name it belogs to can be access using Activity.objects.all().group.Gname

    def __str__(self):
        return self.Aname

# in serializer if request is post or put then do the calculate funtion


class SplitUser(models.Model):
    joinedGroup = models.ManyToManyField(
        SplitGroup, blank=True, related_name='joinUsers')
    Uname = models.CharField(max_length=200)
    Umessage = models.TextField(blank=True)
    # pass function to default in order to generate every time
    Uid = models.CharField(max_length=10, default=gen_id, null=True)

    def __str__(self):
        return self.Uname
