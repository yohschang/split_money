import javax.xml.transform.stax.StAXResult;
import java.awt.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;

enum tags{
    food,
    clothing,
    housing,
    transport,
    entertainment;
}


public class Activity extends Group{
    private String ActivityName;
    private int classes;
    private Calendar calendar;
    private String location;
    public ArrayList<Double> paid = new ArrayList<Double>();
    public ArrayList<Double> weighted = new ArrayList<Double>(); // for uneven split
    public int totalMoney;
    public int totalPerson;


    //basic mode
    /**
     *
     * @param ActivityName
     * @param names : name1,name2,name3,............
     */
    public Activity(Group g , String ActivityName,  String names){
        super(g);
        this.ActivityName = ActivityName;
        calendar = Calendar.getInstance();
        List<String> nameList = Arrays.asList(names.split(","));
        totalPerson = nameList.size();
        for(String n : nameList){checkPerson(n);}
        for(String n : fullNameList){    // create paid list with same length as fullpersonlist
            if (nameList.contains(n)){
                paid.add((double)0);
                weighted.add((double)1);
            }
            else{paid.add(inf);
                weighted.add(inf);}          // if person is not in this activity, set the value to -99999
        }
    }

    //fast mode
    public Activity(Group g, tags tag , int money){
        super(g);
        totalMoney = money;
        calendar = Calendar.getInstance();
        for(String n : fullNameList){
            paid.add(inf);  // in fast mode default paid is null
            weighted.add(inf);
        }
        System.out.println("remember to fill the information");
    }

    public void addPerson(String names){
        System.out.println(fullNameList);
        List<String> nameList = Arrays.asList(names.split(","));
        totalPerson += nameList.size();
        for(String n : nameList){checkPerson(n);}
        for(String n : nameList){
            int idx = fullNameList.indexOf(n);
            paid.set(idx , (double)0);
            weighted.set(idx , (double)1);
        }
    }

    // check if you type the wrong name
    public void checkPerson(String name){
        if (!fullNameList.contains(name)){
            System.out.println(name + " is not in this group");
        }
    }


    /**
     * set the money of person who paid first
     * @param namesAndValue: name1:value1,name2:value2,.......
     */
    public void setFirstPaid(String namesAndValue) {
        for (String nv : namesAndValue.split(",")){
            String names = nv.split(":")[0];
            int idx = fullNameList.indexOf(names);
            double money = Double.parseDouble(nv.split(":")[1]);
            paid.set(idx , money);
            totalMoney += money;
        }
    }

    public void setWeighted(String NameAndWeighted){
//        ArrayList<String> names = new  ArrayList<String>();
        for (String nv : NameAndWeighted.split(",")){
            String names = nv.split(":")[0];
            int idx = fullNameList.indexOf(names);
            weighted.set(idx , Double.parseDouble(nv.split(":")[1]));
        }

    }


    // if person list change in group, each activity should be update
    public void update(){
        int lenDiff = fullNameList.size() - paid.size();
        if (lenDiff != 0 ){
            for(int i =0; i<lenDiff; i++) {
                paid.add(inf);
                weighted.add(inf);
            }
        }
    }

    public ArrayList<Double> calResult(){
        double totalWeight = 0;
        for(double w : weighted){
            if (w != inf){totalWeight += w;}
        }
        double eachPiece = totalMoney/totalWeight;
//        System.out.println(eachPiece);
        for(int i = 0 ; i < fullNameList.size() ; i++){
            if(paid.get(i) != inf){
            double firstpay = paid.get(i);
            paid.set(i , firstpay -  eachPiece * weighted.get(i));}
            else{
                paid.set(i , 0.0);
            }
        }
        return paid;
    }

    public static void main(String[] args) {
        Group g = new Group("mike,john,rick,amy,google");
        Activity activity = new Activity(g , "poop" , "amy,mike");
        System.out.println("full person list : " + activity.fullNameList);
        System.out.println("paid list : " + activity.paid);

        activity.setFirstPaid("amy:100,mike:200");
        System.out.println("paid list : " + activity.paid);
        activity.addPerson("rick");
        System.out.println("paid list : " + activity.paid);
        activity.setFirstPaid("rick:50");
        System.out.println("paid list : " + activity.paid);
        System.out.println("total money : " + activity.totalMoney);
        activity.setWeighted("amy:3");
        System.out.println("weight list : "+ activity.weighted);
        activity.calResult();
        System.out.println("calculate result : " +  activity.paid);

        Activity fastActivity = new Activity(g , tags.food , 1000);

    }

}
