import java.sql.*;
import java.sql.DriverManager;
import java.util.ArrayList;


/**
 * use SQLite to create local database
 */
public class database {
    public void buiddb(){
        Connection c = null;
        try {
            Class.forName("org.sqlite.JDBC");
            c = DriverManager.getConnection("jdbc:sqlite:person.db");
        } catch ( Exception e ) {
            System.err.println( e.getClass().getName() + ": " + e.getMessage() );
            System.exit(0);
        }
        System.out.println("Opened database successfully");
    }

    /**
     * create table in database
     */
    public void createTable(){
        Connection c = null;
        Statement stmt = null;
        try {
            Class.forName("org.sqlite.JDBC");
            c = DriverManager.getConnection("jdbc:sqlite:person.db");
            System.out.println("Opened database successfully");

            stmt = c.createStatement();
            String sql = "CREATE TABLE personlist " +
                    "(ID INT PRIMARY KEY     NOT NULL," +
                    " NAME           TEXT    NOT NULL, " +
                    " joinGroup      TEXT    NOT NULL, "+
                    " REMIND         TEXT    NOT NULL)";
            stmt.executeUpdate(sql);
            stmt.close();
            c.close();
        } catch ( Exception e ) {
            System.err.println( e.getClass().getName() + ": " + e.getMessage() );
            System.exit(0);
        }
//        System.out.println("Table created successfully");
    }

    /**
     * insert data in table
     */
    public void insertTable(){
        Connection c = null;
        Statement stmt = null;
        try {
            Class.forName("org.sqlite.JDBC");
            c = DriverManager.getConnection("jdbc:sqlite:person.db");
            c.setAutoCommit(false);
//            System.out.println("Opened database successfully");

            stmt = c.createStatement();
            String sql = "INSERT INTO personlist (ID,NAME,joinGroup,REMIND ) " +
                    "VALUES (1, 'mike', 'TaipeiTrip,Havefun', '');";

            stmt.executeUpdate(sql);
            sql = "INSERT INTO personlist (ID,NAME,joinGroup,REMIND ) " +
                    "VALUES (2, 'rick', 'TaipeiTrip,Havefun', '');";

            stmt.executeUpdate(sql);
            sql = "INSERT INTO personlist (ID,NAME,joinGroup,REMIND ) " +
                    "VALUES (3, 'mary', 'TaipeiTrip,Havefun', '');";

            stmt.executeUpdate(sql);
            sql = "INSERT INTO personlist (ID,NAME,joinGroup,REMIND ) " +
                    "VALUES (4, 'andy', 'TaipeiTrip,Havefun', '');";

            stmt.executeUpdate(sql);
            sql = "INSERT INTO personlist (ID,NAME,joinGroup,REMIND ) " +
                    "VALUES (5, 'sara', 'TaipeiTrip,Havefun', '');";

            stmt.executeUpdate(sql);
            sql = "INSERT INTO personlist (ID,NAME,joinGroup,REMIND ) " +
                    "VALUES (6, 'nick', 'TaipeiTrip', '');";

            stmt.executeUpdate(sql);
            sql = "INSERT INTO personlist (ID,NAME,joinGroup,REMIND ) " +
                    "VALUES (7, 'tom', 'Havefun', '');";
            stmt.executeUpdate(sql);

            sql = "INSERT INTO personlist (ID,NAME,joinGroup,REMIND ) " +
                    "VALUES (8, 'watson', 'Havefun', '');";
            stmt.executeUpdate(sql);

            stmt.close();
            c.commit();
            c.close();
        } catch ( Exception e ) {
            System.err.println( e.getClass().getName() + ": " + e.getMessage() );
            System.exit(0);
        }
//        System.out.println("Records created successfully");
    }

    /**
     * get the whole information of specific person with known condition
     */
    public ArrayList<String> getTable(String entername){
        ArrayList<String> result = new ArrayList<String>();
        Connection c = null;
        Statement stmt = null;
        try {
            Class.forName("org.sqlite.JDBC");
            c = DriverManager.getConnection("jdbc:sqlite:person.db");
            c.setAutoCommit(false);
//            System.out.println("Opened database successfully");

            stmt = c.createStatement();

            PreparedStatement statement = c.prepareStatement("SELECT * FROM personlist WHERE name = ?");
            statement.setString(1 , entername);
            ResultSet rs = statement.executeQuery();

//            ResultSet rs = stmt.executeQuery( "SELECT * FROM personlist;" );
//            System.out.println("id" + "     " + "name" + "           "+"joingroup"+"              "+"reminder");
            while ( rs.next() ) {
                int id = rs.getInt("id");
                result.add(String.valueOf(id));
                String  name = rs.getString("name");
                result.add(name);
                String joingroup  = rs.getString("joinGroup");
                result.add(joingroup);
                String  remind = rs.getString("REMIND");
                result.add( remind );
//                System.out.println(String.valueOf(id) + "     " + name + "       "+joingroup+"     "+remind);
            }
            rs.close();
            stmt.close();
            c.close();
        } catch ( Exception e ) {
            System.err.println( e.getClass().getName() + ": " + e.getMessage() );
            System.exit(0);
        }
//        System.out.println("Operation done successfully");
        return result;
    }

    /**
     * update person info, add reminder message to him
     * @param who : person name
     * @param notice : reminder messafe
     * @throws ClassNotFoundException
     * @throws SQLException
     */
    public void update(String who , String notice) throws ClassNotFoundException, SQLException {
        Connection c = null;
        Statement stmt = null;
        Class.forName("org.sqlite.JDBC");
        c = DriverManager.getConnection("jdbc:sqlite:person.db");
        c.setAutoCommit(false);
//        System.out.println("Opened database successfully");

        stmt = c.createStatement();
//        PreparedStatement statement = c.prepareStatement("SELECT * FROM personlist WHERE name = ?");
        PreparedStatement statement = c.prepareStatement("UPDATE personlist set REMIND = ? WHERE name = ?");
        statement.setString(1 , notice);
        statement.setString(2 , who);
        statement.executeUpdate();
        c.commit();

    }

    public static void main( String args[] ) throws SQLException, ClassNotFoundException {
        database db = new database();
//        db.buiddb();
//        db = new database();
//        db.createTable();
//        db = new database();
//        db.insertTable();
//        db = new database();
//        db.update("mike" , "rick from TaipeiTrip : give my money back");
//        db = new database();
        ArrayList<String> rs = db.getTable("mike");
//        System.out.println(rs);
//        System.out.println(rs.get(3));
//        System.out.println(rs.get(3).equals(""));
//        db = new database();
//        db.update();
    }
}

