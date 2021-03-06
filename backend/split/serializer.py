from django.db.models import fields
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed

from .models import *

limit = 20


class UserInfoSerial(serializers.ModelSerializer):

    id = serializers.IntegerField(required=False)

    class Meta:
        model = ActiveUserInfo
        fields = ["id", 'UIname', 'UImoney',
                  'UIweight', 'UIjoin', 'UIfianlmoney']


class ActivitySerial(serializers.ModelSerializer):
    # userinfo = UserInfoSerial(many = True, require = False)
    # turn arrylist into json type
    AMoney = serializers.ListField(
        child=serializers.FloatField())  # limit 20 people per group
    Aweighted = serializers.ListField(
        child=serializers.FloatField())
    AfinalMoney = serializers.ListField(
        child=serializers.FloatField())
    Ajoined = serializers.ListField(
        child=serializers.BooleanField())
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Activity
        fields = ['id', 'Aname', 'Adate', 'Atime', "APaid",
                  'AMoney', 'Aweighted', 'Ajoined', "AfinalMoney", 'AtotalMoney']


class GroupSerial(serializers.ModelSerializer):
    # this name should same as the related_name of forieng key
    # require = False allows creating group without activity
    activities = ActivitySerial(many=True, required=False)
    totalMoney = serializers.ListField(
        child=serializers.FloatField())
    joinedUser = serializers.ListField(
        child=serializers.CharField(), default=[])
    # joinUsers = UserSerial(many=True, required=True)

    class Meta:
        model = SplitGroup
        fields = ['Gname', 'Gid', 'totalMoney',
                  'joinedUser', 'activities']

    def create(self, group_data):
        # print(group_data)
        group = SplitGroup(**group_data)
        # users = [x.Uid for x in group.joinUsers.all()]
        # group.joinedUser = users
        # group.activities.set([])
        group.save()  # model need to be save inorder to create serializer
        return group

    def update(self, instance, input_data):
        # if input data doesnt has Gname then pass origin Gname(instance.Gname) back to instance
        # get(new_data, origin_data) if no new_data then pass origin
        instance.Gname = input_data.get('Gname', instance.Gname)
        instance.totalMoney = input_data.get('totalMoney', instance.totalMoney)
        # print(instance.joinUsers.all())

        for x in instance.joinUsers.all():
            name = str(x.Uid)+str(x.Uname)
            print(name)
            print(instance.joinedUser)
            if name not in instance.joinedUser:
                # this will keep the order of user in current group
                instance.joinedUser.append(name)
            print(instance.joinedUser)
        # instance.joinedUser = [str(x.Uid)+str(x.Uname)
        #                        for x in instance.joinUsers.all()]
        instance.save()
        # TODO: currently joined user need manually update, set joinedUser=userserial would be better

        activities = input_data.get('activities', [])  # actiivty should be[]
        for active in activities:
            # if update activity then id must contain in json
            active_id = active.get('id')
            if active_id:
                ini_activity = Activity.objects.get(
                    id=active_id, group=instance)
                ini_activity.Aname = active.get('Aname', ini_activity.Aname)
                ini_activity.Adate = active.get('Adate', ini_activity.Adate)
                ini_activity.AMoney = active.get('AMoney', ini_activity.AMoney)
                ini_activity.Aweighted = active.get(
                    'Aweighted', ini_activity.Aweighted)
                ini_activity.Ajoined = active.get(
                    'Ajoined', ini_activity.Ajoined)
                ini_activity.AtotalMoney = active.get(
                    'AtotalMoney', ini_activity.AtotalMoney)
                ini_activity.AfinalMoney = active.get(
                    'AfinalMoney', ini_activity.AfinalMoney)
                ini_activity.APaid = active.get(
                    'APaid', ini_activity.APaid)
                ini_activity.save()
            else:
                Activity.objects.create(group=instance, **active)
        return instance


class UserSerial(serializers.ModelSerializer):
    joinedGroup = GroupSerial(many=True, required=False)

    class Meta:
        model = SplitUser
        fields = ['Uname', 'Uid', 'joinedGroup', 'Umessage']

    def create(self, user_data):
        user = SplitUser(**user_data)
        user.save()  # model need to be save inorder to create serializer
        return user

    def update(self, instance, input_data):

        instance.Uname = input_data.get('Uname', instance.Uname)

        if len(input_data['joinedGroup']) == 2 and input_data['joinedGroup'][0]['Gname'] == input_data['joinedGroup'][1]['Gname']:
            instance.joinedGroup.set(instance.joinedGroup.exclude(
                Gid=input_data['joinedGroup'][0]['Gid']))
        else:
            for g in input_data['joinedGroup']:
                group = SplitGroup.objects.get(Gid=g['Gid'])
                instance.joinedGroup.add(group)

        if len(instance.Umessage) > 3 and instance.Umessage.count("@") < 8 and input_data.get('Umessage') != "":
            instance.Umessage += "@" + input_data.get('Umessage')
        else:
            instance.Umessage = input_data.get('Umessage')

        # print(instance.joinedGroup.all())
        instance.save()
        # TODO: currently joined user need manually update, set joinedUser=userserial would be better

        return instance
