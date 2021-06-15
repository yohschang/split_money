import java.util.*;

public class Group {

    public final double inf = -9999999;

    ArrayList<Person> fullPersonList = new ArrayList<Person>(); //store all person object
    ArrayList<String> fullNameList = new ArrayList<String>(); // store all person name
    HashMap<String,Activity> activitiesList = new HashMap<String , Activity>();
    int currentFastActivity = 0;

    public Group(){}

    public Group(String personlist){
        String[] namelist = personlist.split(",");
        for(String name:namelist) {
            fullPersonList.add(new Person(name));
            fullNameList.add(name);
        }
    }

    // for activity inheritance
    public Group(Group group){
        this.fullNameList = group.fullNameList;
        this.fullPersonList = group.fullPersonList;
    }

    //basic add
    public void addActivity(String ActivityName,  String names){
        Activity newactivity = new Activity(this , ActivityName , names);
        activitiesList.put(ActivityName , newactivity);

    }
    //fast add
    public void addActivity(tags tag , int money){
        Activity newactivity = new Activity(this , tag , money);
        activitiesList.put( "fastMode" + currentFastActivity , newactivity);
        currentFastActivity+=1;
    }


    public void addPerson(String personlist){
        String[] namelist = personlist.split(",");
        for(String name:namelist) {
            fullPersonList.add(new Person(name));
            fullNameList.add(name);
            }

        // after adding people to the group update the person list of each activity
        for(Activity act : activitiesList.values()){
            act.update();
        }
    }

    public static void main(String[] args) {
        Group ChiFan  = new Group("mike,rick,tom,mary,watson");
        ChiFan.addActivity("ChiShi" , "mike,tom,mary");
        System.out.println(ChiFan.fullNameList);
        System.out.println(ChiFan.activitiesList.get("ChiShi").paid);

        ChiFan.addPerson("andy,sara");
        System.out.println(ChiFan.activitiesList.get("ChiShi").fullNameList);
        System.out.println(ChiFan.activitiesList.get("ChiShi").paid);

    }

}
