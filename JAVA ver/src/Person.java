import java.io.Serializable;

public class Person implements Serializable {
    public String Name = null;
    int id  = 0;
    int credit = 0;

    Person(String Name){
        this.Name = Name;
    }

    public void remind(String notification, String fromname , String activityName){
        System.out.println(fromname + "in "+ activityName+ " : " +  notification);
    }

}

