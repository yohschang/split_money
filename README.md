# split_money

## User cmd interface
![](https://i.imgur.com/TAyrF84.png)

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
