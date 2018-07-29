package application.entity;
import javax.persistence.*;
import java.time.LocalDateTime;
@Entity
@Table(name = "warehouse")
public class warehouse {
    @Id
    @Column
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public String warehouse_id;
    @Column
    private String address;

    public String getWarehouse_id() {
        return warehouse_id;
    }

    public void setWarehouse_id(String warehouse_id) {
        this.warehouse_id = warehouse_id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
