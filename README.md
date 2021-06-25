# split_money

## user command line interface
Group command
add $namelist                           Add people to group
addActivity $activity name $namelist    Basic build activity
addActivityf $activity tag $money       Fast build activity
back                                    Back to Group choosing
calfinal                                Calculate final result in this group
clear                                   Clear current reminder
getactivity                             Get all activity name in group
remind $target name $message            Send reminder to target person
toActivity $activity name               Change directory to activity

Activity command
add $namelist                           add people to activity
back                                    back to group girectory 
setpaid $name and paid list             set who paid first
setweight $name and weight list         set split weight of each person


Global command
exit                                    exit program
$name     	                        login person group list
$name $groupname                        login and creat group

## Activity.java
weighted list : for unequally split 

### two way to initialized
1. basic mode (Group , activityname , participant names)
2. fast mode (Group , tag , total money)
participant names form : name1,name2,name3,.....

### addPerson
add new person that is the group

### setFirstPaid
set the people paid first, and how much
input form : name1:value1,name2:value2,......

### setWeighted
set the person that has different weighted
input form : name1:weighted1,name2:weighted2,......

## update
update paid list and weighted list if group has add people

### calResult 
return the splited result of this activity 


## Group.java
### addActivity(String ActivityName,  String names)
basic type of adding activity

### addActivity(tags tag , int money)
fast type of adding activity

### addPerson
add people to the group and all the namelist in the activity will be update
