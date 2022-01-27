from django.contrib import admin
from .models import SplitGroup, Activity, SplitUser, ActiveUserInfo

# Register your models here.
admin.site.register(SplitGroup)
admin.site.register(Activity)
admin.site.register(SplitUser)
admin.site.register(ActiveUserInfo)
