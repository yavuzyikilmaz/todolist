package todolist.controllers;

import todolist.models.DashboardDao;

import org.omg.CORBA.Object;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import javax.websocket.Session;

@Controller
@RequestMapping(value = "/dashboard", method = RequestMethod.GET)
public class dashboardController {
    @Autowired //this will give you the reference to UserDAO
            DashboardDao dashboardDao;

    @RequestMapping(method = RequestMethod.GET)
    public String dashboard(Model model,HttpSession session) {
        String userId = (String)session.getAttribute("userId");
        int userCount= dashboardDao.getUserCount(userId);
        int taskCount= dashboardDao.getTaskCount(userId);
        int successTaskCount= dashboardDao.getSuccessTaskCount(userId);
        model.addAttribute("successTaskCount",successTaskCount);
        model.addAttribute("unSuccessfulTaskCount",(taskCount-successTaskCount));
        model.addAttribute("taskCount",taskCount);
        model.addAttribute("userCount",userCount);
        return "dashboard";
    }

    //Get All Tasks
    @RequestMapping(value = "/getAllTasks", method = RequestMethod.GET)
    @ResponseBody
    public java.lang.Object getAllTasks(@RequestParam int userId) {

        return dashboardDao.getAllTasks(userId);
    }

//    Get All Users
    @RequestMapping(value = "/getAllUserList")
    @ResponseBody
    public java.lang.Object getAllUserList() {

        return dashboardDao.getAll();
    }

}
