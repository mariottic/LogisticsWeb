package application.web;


import application.entity.Repository_user_order;
import  application.entity.account;
import application.entity.Repository_account;
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
public  class ApiController_account {
    @Resource
    Repository_account repository;

    @CrossOrigin(origins="*")
    @RequestMapping("/account")
    public java.lang.Iterable<application.entity.account> getFc() {
        return repository.findAll();
    }


    @CrossOrigin(origins="*")
    @RequestMapping("/account/{id}")
    public account getId_account(@PathVariable String id) {
        return repository.findOne(id);
    }

    @CrossOrigin(origins="*")
    @RequestMapping(value="/account/delete/{id}",method=org.springframework.web.bind.annotation.RequestMethod.DELETE)
    public void deleteId_account(@PathVariable String  id) {
        repository.delete(id);
    }

    @CrossOrigin(origins="*")
    @RequestMapping(value = "/account/save", method = RequestMethod.POST)
    public account saveInfo(account server ) {
        if(repository.findOne(server.getUsername())==null) repository.save(server);
        else {
            if(server.getName()==null)server.setName(repository.findOne(server.getUsername()).getName());
             if(server.getPassword()==null)server.setPassword(repository.findOne(server.getUsername()).getPassword());
             if(server.getPermission()==null)server.setPermission(repository.findOne(server.getUsername()).getPermission());
             if(server.getPhone_number()==null)server.setPhone_number(repository.findOne(server.getUsername()).getPhone_number());
            repository.save(server);
        }
        return server;
    }

}
