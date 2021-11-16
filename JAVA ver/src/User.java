import java.io.*;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Scanner;

public class User implements Serializable {
    private static final long serialVersionUID = 7095158835028304130L;

    Group currentGroup;
    Activity currentActivity;
    String currentUser;
    database db = new database();

    /**
     * get the group list of login user and enter for further purpose
     * if input string has group name inside , then create a new group with given name
     * @param id : user name
     * @return
     * @throws IOException
     * @throws ClassNotFoundException
     */
    public Group getUserGroup(String id ) throws IOException, ClassNotFoundException {
        currentUser = id;
        ArrayList<String> info =  db.getTable(id);
        String[] groupName = info.get(2).split(",");
        String remind = info.get(3);
        if(!remind.equals("")){
            System.out.println("=================================");
            System.out.println(remind);
            System.out.println("=================================");
        }

        String choosestr = "Choose enter group : ";
        for(int s = 0; s< groupName.length; s++){choosestr += (String.valueOf(s+1) + "." + groupName[s] + ", ");}
        System.out.println(choosestr);

        int choosegroup = new Scanner(System.in).nextInt();
        currentGroup = readGroup(groupName[choosegroup-1]);
//        currentGroup = new Group("mike,rick,tom,mary,watson", " gogo");
        return currentGroup;
    }

    /**
     * get the list of group the user join from data base
     * @param id
     * @param groupname
     * @return
     * @throws IOException
     * @throws ClassNotFoundException
     */
    public Group getUserGroup(String id, String groupname) throws IOException, ClassNotFoundException {
        currentGroup = new Group(id, groupname);
        return currentGroup;
    }

    /**
     * save group as object file
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

    /**
     * read the exit group
     * @param groupname
     * @return
     * @throws IOException
     * @throws ClassNotFoundException
     */
    public static Group readGroup(String groupname) throws IOException, ClassNotFoundException {
        System.out.println();
        String fileName = "Group";
        FileInputStream fin = new FileInputStream(fileName+ "\\" + groupname);
        ObjectInputStream ois = new ObjectInputStream(fin);
        Group currentGroup= (Group) ois.readObject();
        ois.close();

        return currentGroup;
    }

    /**
     * all the cmd of this app (type help to see)
     */
    public void cmdlist(){
        System.out.println(
        "////Group command\n"+
        "add $namelist                             Add people to group\n"+
        "addActivity $activity name $namelist      Basic build activity\n"+
        "addActivityf $activity tag $money         Fast build activity\n"+
        "back                                      Back to Group choosing\n"+
        "calfinal                                  Calculate final result in this group\n"+
        "clear                                     Clear current reminder\n"+
        "getactivity                               Get all activity name in group\n"+
        "remind $target name $message              Send reminder to target person\n"+
        "toActivity $activity name                 Change directory to activity\n"+
        "////Activity command\n"+
        "add $namelist                             add people to activity\n"+
        "back                                      back to group girectory\n"+
        "setpaid $name and paid list               set who paid first\n"+
        "setweight $name and weight list           set split weight of each person\n"+
        "calresult                                 calculate result in activity\n"+

        "////Global command\n"+
        "exit                                      exit program\n"+
        "$name                                     login person group list\n"+
        "$name $groupname                          login and creat group\n"
        );
    }


    /**
     * the command line interface for use to use this splitting software
     * include group layer, activity layer and global layer
     * @param cmds
     * @param pos
     * @return
     * @throws IOException
     * @throws SQLException
     * @throws ClassNotFoundException
     */
    public String runcmd(String cmds, String pos) throws IOException, SQLException, ClassNotFoundException {
        String[] cmdlist = cmds.split(" ");
        String cmd = cmdlist[0];

        ArrayList<String> arg = new ArrayList<String>();
        if (cmdlist.length >1){
            for(int i = 1 ; i < cmdlist.length; i++){
                arg.add(cmdlist[i]);
            }
        }

        if(pos.equals("group " + currentGroup.groupName)) {
            switch (cmd) {
                case "add":
                    currentGroup.addPerson(arg.get(0)); break;
                case "addActivity":
                    currentGroup.addActivity(arg.get(0), arg.get(1)); break;
                case "addActivityf":
                    currentGroup.addActivity(tags.valueOf(arg.get(0)), Integer.parseInt(arg.get(1))); break;
                case "calfinal":
                    ArrayList<String> splittext = currentGroup.splitText;
                    for (String s : splittext){
                        System.out.println(s);
                    }
                    break;
                case "toActivity":
                    currentActivity = currentGroup.activitiesList.get(arg.get(0));
                    return "activity "+ arg.get(0);
                case "clear" :
                    db = new database();
                    db.update(currentUser , "");
                    break;
                case "remind" :
                    String target = arg.get(0);
                    String notification = currentUser + " from " + currentGroup.groupName + " : ";
                    for(int i = 1 ;i< arg.size(); i++){
                    notification+=(arg.get(i) +" ");}

                    db = new database();
                    db.update(target , notification);
//                    System.out.println(notification);
//                    currentGroup.fullPersonList.get(currentGroup.fullNameList.indexOf(arg.get(0))).remind(arg.get(1),currentUser,currentGroup.groupName);
                    break;
                case "back" : getUserGroup(currentUser);
                    break;

                case "getactivity" :
                    System.out.println(currentGroup.activitiesList.keySet());
                    break;
                case "info":
                    currentGroup.info();
                    break;
                default:
                    System.out.println("wrong cmd");
            }
            return "group " + currentGroup.groupName;
        }
        else if (pos.equals("activity "+ currentActivity.ActivityName)){
            switch (cmd){
                case "back": return "group " + currentGroup.groupName;
                case "add" : currentActivity.addPerson(arg.get(0)); break;
                case "setpaid" : currentActivity.setFirstPaid(arg.get(0)); break;
                case "setweight" : currentActivity.setWeighted(arg.get(0)); break;
                case "calresult" : currentActivity.calResult(); break;
                case "info" : currentActivity.getinfo(); break;
                default:
                    System.out.println("wrong cmd");
            }
            return "activity " + currentActivity.ActivityName;
        }
        return null;
    }


    public static void main(String[] args) throws IOException, ClassNotFoundException, SQLException {
        User user = new User();
        Group chooseGroup;
        System.out.println("Enter your name : ");
        String[] name = new Scanner(System.in).nextLine().split(" ");

        if (name.length >1){
            chooseGroup = user.getUserGroup(name[0] , name[1]);
        }
        else{
        chooseGroup = user.getUserGroup(name[0]);}
        String pos = "group " + chooseGroup.groupName;

        while (true){
            System.out.println("your now at : " + pos);
            System.out.println("Enter command : ");
            String cmd = new Scanner(System.in).nextLine();
            if (cmd.equals("exit")){
                System.exit(0);
                saveGroup(user.currentGroup);}
            else if (cmd.equals("help")){
                user.cmdlist();
            }

            pos = user.runcmd(cmd , pos);
            System.out.println("  ");
        }
    }
}
