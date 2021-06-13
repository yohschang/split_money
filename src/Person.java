public class Person {
    public String Name = null;
    int id  = 0;
    int credit = 0;

    Person(String Name){
        this.Name = Name;
    }

    public void remind(String notification){
        System.out.println(notification);
    }

}
