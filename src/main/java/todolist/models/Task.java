package todolist.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Represents an User for this web application.
 */
@Entity
@Table(name = "tasks")
public class Task {

  // ------------------------
  // PRIVATE FIELDS
  // ------------------------

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long taskId;

  @NotNull
  private String taskName;

  @NotNull
  private String taskContent;

  @NotNull
  private int userId;

  @NotNull
  private String taskDate;

  @NotNull
  private String resultDate;

  @NotNull
  private String taskStatus;

  // ------------------------
  // PUBLIC METHODS
  // ------------------------

  public Task() { }

  public Task(long taskId) {
    this.taskId = taskId;
  }

  public Task(String taskName, String taskContent,int userId,String taskDate,String taskStatus,String resultDate) {
    this.taskName = taskName;
    this.taskContent = taskContent;
    this.userId = userId;
    this.taskDate = taskDate;
    this.taskStatus = taskStatus;
    this.resultDate = resultDate;
  }

  public long getTaskId() {
    return taskId;
  }

  public void setTaskId(long value) {
    this.taskId = value;
  }

  public String getTaskName() {
    return taskName;
  }
  
  public void setTaskName(String value) {
    this.taskName = value;
  }
  
  public String getTaskContent() {
    return taskContent;
  }

  public void setTaskContent(String value) {
    this.taskContent = value;
  }

  public int getUserId() {return userId;}

  public void setUserId(int value) {
    this.userId = value;
  }

  public String getTaskDate() {
    return taskDate;
  }

  public void setTaskDate(String value) {
    this.taskDate = value;
  }

  public String getTaskStatus() {
    return taskStatus;
  }

  public void setTaskStatus(String value) {
    this.taskStatus = value;
  }

  public String getResultDate() {
    return resultDate;
  }

  public void setResultDate(String value) {
    this.resultDate = value;
  }

} // class User
