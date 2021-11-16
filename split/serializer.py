from django.db.models import fields
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed

from .models import *

limit = 20


class ActivitySerial(serializers.ModelSerializer):
    # turn arrylist into json type
    AMoney = serializers.ListField(
        child=serializers.FloatField(), default=[0.0]*limit)  # limit 20 people per group
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Activity
        fields = ['id', 'Aname', 'Adate', 'Atime', 'AMoney', 'AtotalMoney']


class GroupSerial(serializers.ModelSerializer):
    # this name should same as the related_name of forieng key
    # require = False allows creating group without activity
    activities = ActivitySerial(many=True, required=False)
    totalMoney = serializers.ListField(
        child=serializers.FloatField(), default=[0.0]*limit)
    joinedUser = serializers.ListField(
        child=serializers.CharField(), default=[])
    # joinUsers = UserSerial(many=True, required=True)

    class Meta:
        model = SplitGroup
        fields = ['Gname', 'Gid', 'totalMoney', 'joinedUser', 'activities']

    def create(self, group_data):
        group = SplitGroup(**group_data)
        users = [x.Uid for x in group.joinUsers.all()]
        group.joinedUser = users
        # group.activities.set([])
        group.save()  # model need to be save inorder to create serializer
        return group

    def update(self, instance, input_data):
        # if input data doesnt has Gname then pass origin Gname(instance.Gname) back to instance
        # get(new_data, origin_data) if no new_data then pass origin
        instance.Gname = input_data.get('Gname', instance.Gname)
        instance.totalMoney = input_data.get('totalMoney', instance.totalMoney)
        instance.joinedUser = [x.Uid for x in instance.joinUsers.all()]
        instance.save()
        # TODO: currently joined user need manually update, set joinedUser=userserial would be better

        activities = input_data.get('activities')
        for active in activities:
            # if update activity then id must contain in json
            active_id = active.get('id')
            if active_id:
                ini_activity = Activity.objects.get(
                    id=active_id, group=instance)
                ini_activity.Aname = active.get('Aname', ini_activity.Aname)
                ini_activity.Adate = active.get('Adate', ini_activity.Adate)
                ini_activity.AMoney = active.get('AMoney', ini_activity.AMoney)
                ini_activity.AtotalMoney = active.get(
                    'AtotalMoney', ini_activity.AtotalMoney)
                ini_activity.save()
            else:
                Activity.objects.create(group=instance, **active)
        return instance


class UserSerial(serializers.ModelSerializer):
    joinedGroup = GroupSerial(many=True)

    class Meta:
        model = SplitUser
        fields = ['Uname', 'Uid', 'joinedGroup', 'Umessage']
