import java.awt.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;

public class Activity extends Group{
    private String Name;
    private int classes;
    private Calendar calendar;
    private String location;
    public ArrayList<Person> Participant =  new ArrayList<Person>(fullPersonList.size());
    private ArrayList<Integer> paid;

    private ArrayList<String> fullNameList = new ArrayList<String>();

    //basic

    /**
     *
     * @param personlist : name1,name2,name3,...
     */
    public Activity(String personlist ){
        for (Person p : fullPersonList){
            fullNameList.add(p.Name);
        }

        String[] namelist = personlist.split(",");
        for (String name: namelist){
            int idx = fullNameList.indexOf("name");
//            Participant.add;
        }
    }

    //fast
    public Activity(){

    }

    public static void main(String[] args) {
        Activity ac = new Activity();
        System.out.println(ac.Participant.size());
        for(Person p: ac.Participant){
            System.out.println(p);
        }
    }

}
