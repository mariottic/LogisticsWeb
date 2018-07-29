
package application.web;


        import application.entity.Repository_attendance;
        import application.entity.attendance;
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
public  class ApiController_attendance {
    @Resource
    Repository_attendance repository;

    @CrossOrigin(origins="*")
    @RequestMapping("/attendance")
    public java.lang.Iterable<application.entity.attendance> getFc() {
        return repository.findAll();
    }

    @CrossOrigin(origins="*")
    @RequestMapping("/attendance/{id}")
    public attendance getId_account(@PathVariable String id) {
        return repository.findOne(id);
    }


//    @CrossOrigin(origins="*")
//    @RequestMapping(value="{id}",method=org.springframework.web.bind.annotation.RequestMethod.DELETE)
//    public void deleteId_account(@PathVariable String  id) {
//        repository.delete(id);
//    }
@CrossOrigin(origins="*")
@RequestMapping(value="/attendance/delete/{id}",method=org.springframework.web.bind.annotation.RequestMethod.DELETE)
public void deleteId_account(@PathVariable String  id) {
    repository.delete(id);
}

    @CrossOrigin(origins="*")
    @RequestMapping(value = "/attendance/save", method = RequestMethod.POST)
    public attendance saveInfo(attendance server ) {
            if(repository.findOne(server.getId())==null) {
                repository.save(server);
            }
            else{
                if(server.getTransact_number()==null){
                    server.setTransact_number(repository.findOne(server.getId()).getTransact_number());
                }
                 if(server.getUsername()==null){
                    server.setUsername(repository.findOne(server.getId()).getUsername());
                }
                 if(server.getStart_date()==null)
                {
                    server.setStart_date(repository.findOne(server.getId()).getStart_date());
                }
                 if(server.getEnd_date()==null)
                {
                    server.setEnd_date(repository.findOne(server.getId()).getEnd_date());
                }
                repository.save(server);
            }
            return server;

    }

}
