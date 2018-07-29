package application.web;


import application.entity.Repository_user_order;
import  application.entity.account;
import application.entity.Repository_account;
import application.entity.user_order;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.annotation.Resource;

/**
 * Created by chen on 2017/7/19.
 */
@RestController
public  class ApiController_user_order {

    @Resource
    Repository_user_order repository_user_order;

    @CrossOrigin(origins="*")
    @RequestMapping("/user_order")
    public java.lang.Iterable<application.entity.user_order> get() {
        return repository_user_order.findAll();
    }

    @CrossOrigin(origins="*")
    @RequestMapping("/user_order/{id}")
    public user_order getId_user_order(@PathVariable String id) {
        return repository_user_order.findOne(id);
    }

    @CrossOrigin(origins="*")
    @RequestMapping(value="/user_order/delete/{id}",method=org.springframework.web.bind.annotation.RequestMethod.DELETE)
    public void deleteId_user_order(@PathVariable String  id) {
        repository_user_order.delete(id);
    }

    @CrossOrigin(origins="*")
    @RequestMapping(value = "/user_order/save", method = RequestMethod.POST)
    public user_order saveinfo(user_order server ) {
        if(repository_user_order.findOne(server.getTransact_number())==null) {
            repository_user_order.save(server);

        }
        else {

            if(server.getDescription()==null)
            {
                server.setDescription(repository_user_order.findOne(server.getTransact_number()).getDescription());
            }
            if(server.getSender_address()==null)
            {
                server.setSender_address(repository_user_order.findOne(server.getTransact_number()).getSender_address());
            }
            if(server.getSender_name()==null)
            {
                server.setSender_name(repository_user_order.findOne(server.getTransact_number()).getSender_name());
            }
            if(server.getSender_phone_number()==null)
            {
                server.setSender_phone_number(repository_user_order.findOne(server.getTransact_number()).getSender_phone_number());
            }
            if(server.getFee()==null)
            {
                server.setFee(repository_user_order.findOne(server.getTransact_number()).getFee());
            }
            if(server.getRecipent_address()==null)
            {
                server.setRecipent_address(repository_user_order.findOne(server.getTransact_number()).getRecipent_address());
            }
            if(server.getRecipent_fixedline()==null)
            {
                server.setRecipent_fixedline(repository_user_order.findOne(server.getTransact_number()).getRecipent_fixedline());
            }
            if(server.getRecipent_name()==null)
            {
                server.setRecipent_name(repository_user_order.findOne(server.getTransact_number()).getRecipent_name());
            }
            if(server.getRecipent_phone_number()==null)
            {
                server.setRecipent_phone_number(repository_user_order.findOne(server.getTransact_number()).getRecipent_phone_number());
            }
            if(server.getWeigh()==null)
            {
                server.setWeigh(repository_user_order.findOne(server.getTransact_number()).getWeigh());
            }
            if(server.getStatement()==null)
            {
                server.setStatement(repository_user_order.findOne(server.getTransact_number()).getStatement());
            }
            if(server.getDetail_St()==null)
            {
                server.setDetail_St(repository_user_order.findOne(server.getTransact_number()).getDetail_St());
            }
            repository_user_order.save(server);
        }
             return  server;
    }

}
