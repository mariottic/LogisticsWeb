package application.entity;
import javax.persistence.*;
import java.time.LocalDateTime;
@Entity
@Table(name = "attendance")


public class attendance {
    @Id
    @Column
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public String id;

    @Column
    private String transact_number;
    @Column
    private String username;
    @Column
    private String start_date;
    @Column
    private String end_date;

    public String getTransact_number() {
        return transact_number;
    }

    public void setTransact_number(String transact_number) {
        this.transact_number = transact_number;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStart_date() {
        return start_date;
    }

    public void setStart_date(String start_date) {
        this.start_date = start_date;
    }

    public String getEnd_date() {
        return end_date;
    }

    public void setEnd_date(String end_date) {
        this.end_date = end_date;
    }
}
