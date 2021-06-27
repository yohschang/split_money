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
"calresult"

Global command
exit                                    exit program
$name                                   login person group list
$name $groupname                        login and creat group
__________________________________________________________________________________

current user list : ['mike' 'rick' 'tom' 'mary' 'watson' 'andy' 'sara' 'nick' ]

tom Havefun
add mike,rick,mary,watson,andy,sara
addActivity lunch tom,mike,rick
addActivity dinner tom,mike,rick

activity demo
tom
1
addActivity market rick,mike,nick,sara
getactivity
toActivity market
info
setpaid mike:1000,sara:50
info
setweight rick:2


calresult demo

getactivity
toActivity lunch
info
back
toActivity dinner
info
back
calfinal 






