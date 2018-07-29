package application.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_order")
public class user_order {
    @Id
    @Column
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public String transact_number;

    @Column
    private String sender_name;
    @Column
    private String sender_address;
    @Column
    private String sender_phone_number;
    @Column

    private String recipent_name;
    @Column

    private String recipent_phone_number;
    @Column

    private String recipent_fixedline;
    @Column

    private String recipent_address;
    @Column
    private String weigh;
    @Column

    private String fee;
    @Column
    private String detail_St;
    @Column

    private String statement;
    @Column
    public String getDetail_St() {
        return detail_St;
    }

    public void setDetail_St(String detailSt) {
        this.detail_St = detailSt;
    }
    private String description;


    public String getTransact_number() {
        return transact_number;
    }

    public void setTransact_number(String transact_number) {
        this.transact_number = transact_number;
    }

    public String getSender_name() {
        return sender_name;
    }

    public void setSender_name(String sender_name) {
        this.sender_name = sender_name;
    }

    public String getSender_address() {
        return sender_address;
    }

    public void setSender_address(String sender_address) {
        this.sender_address = sender_address;
    }

    public String getSender_phone_number() {
        return sender_phone_number;
    }

    public void setSender_phone_number(String sender_phone_number) {
        this.sender_phone_number = sender_phone_number;
    }

    public String getRecipent_name() {
        return recipent_name;
    }

    public void setRecipent_name(String recipent_name) {
        this.recipent_name = recipent_name;
    }

    public String getWeigh() {
        return weigh;
    }

    public void setWeigh(String weigh) {
        this.weigh = weigh;
    }

    public String getFee() {
        return fee;
    }

    public void setFee(String fee) {
        this.fee = fee;
    }

    public String getStatement() {
        return statement;
    }

    public void setStatement(String statement) {
        this.statement = statement;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRecipent_phone_number() {
        return recipent_phone_number;
    }

    public void setRecipent_phone_number(String recipent_phone_number) {
        this.recipent_phone_number = recipent_phone_number;
    }

    public String getRecipent_fixedline() {
        return recipent_fixedline;
    }

    public void setRecipent_fixedline(String recipent_fixedline) {
        this.recipent_fixedline = recipent_fixedline;
    }

    public String getRecipent_address() {
        return recipent_address;
    }

    public void setRecipent_address(String recipent_address) {
        this.recipent_address = recipent_address;
    }
}