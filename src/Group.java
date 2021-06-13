import java.util.ArrayList;

public class Group {

    public final double inf = -9999999;

    ArrayList<Person> fullPersonList = new ArrayList<Person>(); //store all person object
    ArrayList<String> fullNameList = new ArrayList<String>(); // store all person name

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



}
