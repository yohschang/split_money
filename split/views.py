from .models import *
from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.response import Response

from .serializer import *


@api_view(['GET'])
def GroupList(request):   # list all the group
    groups = SplitGroup.objects.all()
    serializers = GroupSerial(groups, many=True)
    return Response(serializers.data)


@api_view(['GET'])
def GroupDetial(request, id):   # list each group with its sepecific url
    groups = SplitGroup.objects.get(Gid=id)
    serializers = GroupSerial(groups, many=False)  # only return one object
    return Response(serializers.data)


@api_view(['POST'])
def GroupCreate(request):   # create new group
    serializer = GroupSerial(data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        print(serializer.errors)

    return Response(serializer.data)


@api_view(['POST'])
def GroupUpdate(request, id):   # update group and add activity
    group = SplitGroup.objects.get(Gid=id)
    # instance is the origin data
    # must add Gname in request
    serializer = GroupSerial(instance=group, data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        print(serializer.errors)

    return Response(serializer.data)


@api_view(['DELETE'])
def GroupDelete(request, id):   # update group and add activity
    group = SplitGroup.objects.get(Gid=id)
    group.delete()
    return Response('group deleted')


@api_view(['DELETE'])
def ActivityDelete(request, Gid, Aid):   # update group and add activity
    group = SplitGroup.objects.get(Gid=Gid)
    activity = group.activities.get(id=Aid)
    activity.delete()
    return Response('Activity deleted')


#### User part ####
@api_view(['GET'])
def UserList(request):   # list all the user
    users = SplitUser.objects.all()
    serializers = UserSerial(users, many=True)
    return Response(serializers.data)


@api_view(['GET'])
def UserDetial(request, id):   # list each user with its sepecific url
    users = SplitGroup.objects.get(Uid=id)
    serializers = UserSerial(users, many=False)  # only return one object
    return Response(serializers.data)


@api_view(['POST'])
def UserCreate(request):   # create new user
    serializer = UserSerial(data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        print(serializer.errors)

    return Response(serializer.data)


@api_view(['POST'])
def UserUpdate(request, id):   # update User
    user = SplitGroup.objects.get(Uid=id)
    # instance is the origin data
    # must add Gname in request
    serializer = UserSerial(instance=user, data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        print(serializer.errors)

    return Response(serializer.data)


@api_view(['DELETE'])
def UserDelete(request, id):   # update group and add activity
    user = SplitUser.objects.get(Uid=id)
    user.delete()
    return Response('group deleted')
