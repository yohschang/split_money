import java.io.*;
import java.util.*;

public class Group {

    public final double inf = -9999999;

    ArrayList<Person> fullPersonList = new ArrayList<Person>(); //store all person object
    ArrayList<String> fullNameList = new ArrayList<String>(); // store all person name
    HashMap<String,Activity> activitiesList = new HashMap<String , Activity>();
    int currentFastActivity = 0;
    String StringResult;
    String StringName;

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

    public double[] calFinalResult() throws IOException {

        Object[] eachStep;
        double[] finalresult = new double[fullNameList.size()];
        for(Activity act : activitiesList.values()) {
//            System.out.println(act.calResult());  // "!!!" do not print arrayList in this method
            eachStep = act.calResult().toArray();

            for(int i = 0 ; i<fullNameList.size(); i++){
                finalresult[i] += (double)eachStep[i];
            }
        }
//        for (double d : finalresult){
        for (int d = 0; d < finalresult.length; d++){
            if (d == 0){
                StringResult = String.valueOf(finalresult[d]);
                StringName = String.valueOf(fullNameList.get(d));
            }
            else {
                StringResult += String.valueOf(finalresult[d]);
                StringName += String.valueOf(fullNameList.get(d));
            }
            StringResult += ",";
            StringName += ",";
        }
        split_money(StringResult , StringName);
        return finalresult;
    }

    public void split_money(String finalResult , String Names) throws IOException {
        String command = "python min_split.py " + finalResult + " " + Names;
        Process p = Runtime.getRuntime().exec(command);
        BufferedReader in = new BufferedReader(new InputStreamReader(p.getInputStream()));

        String line;
        while ((line = in.readLine()) != null) {
            System.out.println(line );
        }
    }

    public static void main(String[] args) throws IOException {
        Group ChiFan  = new Group("mike,rick,tom,mary,watson");
        ChiFan.addActivity("ChiShi" , "mike,tom,mary");
        ChiFan.addPerson("andy,sara");
        ChiFan.activitiesList.get("ChiShi").setFirstPaid("mike:1000,mary:50");
        ChiFan.addActivity("lalal" , "mike,tom,watson,rick");
        ChiFan.activitiesList.get("lalal").setFirstPaid("tom:10,watson:80");
        ChiFan.calFinalResult();


    }
}
