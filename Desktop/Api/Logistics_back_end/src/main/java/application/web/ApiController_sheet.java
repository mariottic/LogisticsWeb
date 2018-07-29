package application.web;


import application.entity.Repository_sheet;
import  application.entity.sheet;
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
public  class ApiController_sheet {
    @Resource
    Repository_sheet repository;

    @CrossOrigin(origins = "*")
    @RequestMapping("/sheet")
    public java.lang.Iterable<application.entity.sheet> getFc() {
        return repository.findAll();
    }


    @CrossOrigin(origins = "*")
    @RequestMapping("/sheet/{id}")
    public sheet getId_warehouse(@PathVariable String id) {
        return repository.findOne(id);
    }
    @CrossOrigin(origins="*")
    @RequestMapping(value="/sheet/delete/{id}",method=org.springframework.web.bind.annotation.RequestMethod.DELETE)
    public void deleteId_account(@PathVariable String  id) {
        repository.delete(id);
    }

    @CrossOrigin(origins="*")
    @RequestMapping(value = "/sheet/save", method = RequestMethod.POST)
    public boolean saveInfo(sheet server ) {
        if(repository.findOne(server.getId())==null) repository.save(server);
        else {
            if(server.getType()==null) server.setType(repository.findOne(server.getId()).getType());
            if(server.getWarehouse_id()==null) server.setWarehouse_id(repository.findOne(server.getId()).getWarehouse_id());
            if(server.getTransact_number()==null) server.setTransact_number(repository.findOne(server.getId()).getTransact_number());
            if(server.getFlag()==null) server.setFlag(repository.findOne(server.getId()).getFlag());
            repository.save(server);
        }
        return true;
    }
}