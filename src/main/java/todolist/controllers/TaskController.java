package todolist.controllers;

import todolist.models.Task;
import todolist.models.TaskDao;

import todolist.models.UserDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;


/**
 * Class TaskController
 */
@Controller
public class TaskController {
  DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
  Calendar cal = Calendar.getInstance();


  @RequestMapping(value="/tasks")
  public String task(Model model, HttpSession session) {
    return "tasks";
  }

  /* Create a new Task */
  @RequestMapping(value="/createNewTask", method = RequestMethod.GET)
  @ResponseBody
  public String createNewTask(@RequestParam String taskName,@RequestParam String taskContent,@RequestParam int userId,@RequestParam String taskDate,@RequestParam String taskStatus) {
    try {
      String resultDate="0000-00-00 00:00:00";
      String taskCurrentDate="";
      cal.setTime(new Date()); // sets calendar time/date
      cal.add(Calendar.HOUR_OF_DAY, 1); // adds one hour
      taskCurrentDate=dateFormat.format(cal.getTime());
      Task user = new Task(taskName,taskContent,userId,taskCurrentDate,taskStatus,resultDate) ;
      taskDao.create(user);
    }
    catch (Exception ex) {
      return "";
    }
    return "Task succesfully created!";
  }
  /* Update a new Task */
  @RequestMapping(value="/updateTheTask", method = RequestMethod.GET)
  @ResponseBody
  public String updateTheTask(@RequestParam int taskId,@RequestParam int userId,@RequestParam String taskName,@RequestParam String taskContent,@RequestParam String taskStatus) {
    try {
      String resultDate="";
      if(taskStatus=="1"){
        cal.setTime(new Date()); // sets calendar time/date
        cal.add(Calendar.HOUR_OF_DAY, 1); // adds one hour
        resultDate=dateFormat.format(cal.getTime());
      }
      taskDao.updateNative(taskName,taskContent,userId,taskStatus,resultDate,taskId);

      }
    catch (Exception ex) {
      return "";
    }
    return "Task succesfully updated!";
  }

  /* Delete the User */
  @RequestMapping(value="/deleteTheTask", method = RequestMethod.GET)
  @ResponseBody
  public String deleteTheTask(@RequestParam int taskId) {
    try {
      Task task = new Task(taskId);
      taskDao.delete(task);
    }
    catch (Exception ex) {
      return "";
    }
    return "Task succesfully deleted!";
  }

  //Get All Tasks
  @RequestMapping(value = "/getAllTaskList")
  @ResponseBody
  public java.lang.Object getAllTaskList() {

    return taskDao.getAllTaskList();
  }


  //Get All USERS
  @RequestMapping(value = "/getAllUsers")
  @ResponseBody
  public java.lang.Object getAllUsersAjax() {
    return userDao.getAllUserList();
  }

  @Autowired
  private UserDao userDao;


  @Autowired
  private TaskDao taskDao;

} // class UserController
