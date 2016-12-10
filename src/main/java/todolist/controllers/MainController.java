package todolist.controllers;

import todolist.models.User;
import todolist.models.UserDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@Controller
@RequestMapping(value = {"/", "/login"})
public class MainController {
    @Autowired
    UserDao userDao;
    @Autowired
    HttpSession session;


    @RequestMapping(method = RequestMethod.GET)
      public String login() {
        return "login";
      }


    @RequestMapping(value="/userControl")
    @ResponseBody
    public String getByEmail(@RequestParam String lgnUser,@RequestParam String lgnPass) {
        String userId;
        try {
            User user = userDao.getControlUser(lgnUser,lgnPass);
            userId = String.valueOf(user.getId());
        }
        catch (Exception ex) {
            return "hata";
        }
        session.setAttribute("userId",userId);
        return userId;
    }
      
}
