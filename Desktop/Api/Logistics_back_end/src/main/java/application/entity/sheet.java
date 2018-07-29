package application.entity;
import javax.persistence.*;
import java.time.LocalDateTime;
@Entity
@Table(name = "sheet")


public class sheet {

    @Id
    @Column
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public String id;
    @Column
    private String transact_number;

    @Column
    private String warehouse_id;
    @Column
    private String type;

    @Column
    private String flag;

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }

    public String getTransact_number() {
        return transact_number;
    }

    public void setTransact_number(String transact_number) {
        this.transact_number = transact_number;
    }

    public String getWarehouse_id() {
        return warehouse_id;
    }

    public void setWarehouse_id(String warehouse_id) {
        this.warehouse_id = warehouse_id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
