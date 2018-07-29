package application.web;


import application.entity.Repository_warehouse;
import  application.entity.warehouse;
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
public  class ApiController_warehouse {
    @Resource
    Repository_warehouse repository;

    @CrossOrigin(origins="*")
    @RequestMapping("/warehouse")
    public java.lang.Iterable<application.entity.warehouse> getFc() {
        return repository.findAll();
    }


    @CrossOrigin(origins="*")
    @RequestMapping("/warehouse/{id}")
    public warehouse getId_warehouse(@PathVariable String id) {
        return repository.findOne(id);
    }

//    @CrossOrigin(origins="*")
//    @RequestMapping(value="{id}",method=org.springframework.web.bind.annotation.RequestMethod.DELETE)
//    public void deleteId_account(@PathVariable String  id) {
//        repository.delete(id);
//    }

//    @CrossOrigin(origins="*")
//    @RequestMapping(value = "/account/save", method = RequestMethod.POST)
//    public boolean saveInfo(warehouse server ) {
//        if(repository.findOne(server.getUsername())==null) {
//            repository.save(server);
//            return true;
//        } else return  false;
//    }

}
