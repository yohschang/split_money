import com.sun.security.jgss.GSSUtil;

import java.io.*;
import java.util.*;

public class Group implements Serializable {
    private static final long serialVersionUID = 7095158835028304130L;

    public final double inf = -9999999;

    String groupName;

    ArrayList<Person> fullPersonList = new ArrayList<Person>(); //store all person object
    ArrayList<String> fullNameList = new ArrayList<String>(); // store all person name
    HashMap<String,Activity> activitiesList = new HashMap<String , Activity>();
    int currentFastActivity = 0;
    String StringResult;
    String StringName;
    ArrayList<String> splitText = new ArrayList<String>();

    public Group(){}

    /**
     * build group
     * @param personlist name1,name2,name3,............
     * @param groupName
     */
    public Group(String personlist , String groupName){
        this.groupName = groupName;
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

    /**
     * basic create activity method
     * @param ActivityName
     * @param names
     */
    public void addActivity(String ActivityName,  String names){
        Activity newactivity = new Activity(this , ActivityName , names);
        activitiesList.put(ActivityName , newactivity);

    }
    //fast add

    /**
     * fast create activity method
     * @param tag
     * @param money
     */
    public void addActivity(tags tag , int money){
        Activity newactivity = new Activity(this , tag , money);
        activitiesList.put( "fastMode" + currentFastActivity , newactivity);
        currentFastActivity+=1;
    }


    /**
     * add person to current group, the activity inside this group will update spontaneously
     * @param personlist
     */
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

    /**
     * calculate the final result of each person in this group
     * @return
     * @throws IOException
     */
    public ArrayList<String> calFinalResult() throws IOException {

        double[] eachStep;
        double[] finalresult = new double[fullNameList.size()];
        for(Activity act : activitiesList.values()) {
//            System.out.println(act.calResult());  // "!!!" do not print arrayList in this method
            eachStep = act.calResult();


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
        ArrayList<String> splittext = split_money(StringResult , StringName);
//        return finalresult;
        return splittext;
    }

    /**
     * the algorithm of splitting, here we use python to develop and will return the pair of money flow
     * @param finalResult
     * @param Names
     * @return
     * @throws IOException
     */
    public ArrayList<String> split_money(String finalResult , String Names) throws IOException {
        String command = "python min_split.py " + finalResult + " " + Names;
        Process p = Runtime.getRuntime().exec(command);
        BufferedReader in = new BufferedReader(new InputStreamReader(p.getInputStream()));

        String line;
        while ((line = in.readLine()) != null) {
            System.out.println(line );
            splitText.add(line);
        }

        return splitText;
    }

    /**
     * save group object
     * @param savegroup
     * @throws IOException
     */
    public static void saveGroup(Group savegroup) throws IOException {
        String fileName = "Group";
        FileOutputStream fos = new FileOutputStream(fileName+ "\\" + savegroup.groupName);
        ObjectOutputStream oos = new ObjectOutputStream(fos);
        oos.writeObject(savegroup);
        oos.close();
    }

    public void info(){
        System.out.println("people in this group : " + fullNameList);
        System.out.println("activities in this group : " + activitiesList.keySet());
    }

    public static void main(String[] args) throws IOException {
        Group Havefun  = new Group("mike,rick,tom,mary,watson" ,"Havefun");
        Havefun.addActivity("lunch" , "mike,tom,mary");
        Havefun.addPerson("andy,sara");
        Havefun.activitiesList.get("lunch").setFirstPaid("mike:1000,mary:50");
        Havefun.addActivity("dinner" , "mike,tom,watson,rick");
        Havefun.activitiesList.get("dinner").setFirstPaid("tom:10,watson:80");
        ArrayList<String> splittext = Havefun.calFinalResult();
        for (String s : splittext){
            System.out.println(s);
        }
//        saveGroup(Havefun);
//
//        Group TaipeiTrip  = new Group("mike,rick,andy,mary,nick,sara" ,"TaipeiTrip");
//        TaipeiTrip.addActivity("taxi" , "mike,andy,mary,nick");
//        TaipeiTrip.activitiesList.get("taxi").setFirstPaid("mike:1000,mary:200,nick:50");
//        TaipeiTrip.addActivity("hotel" , "mike,rick,andy,mary,nick,sara");
//        TaipeiTrip.activitiesList.get("hotel").setFirstPaid("mary:2300,sara:1200");
//        ArrayList<String> splittext2 = TaipeiTrip.calFinalResult();
//        for (String s : splittext2){
//            System.out.println(s);
//        }
//        saveGroup(TaipeiTrip);

//        ChiFan.fullPersonList.get(0).remind("123");
    }
}

