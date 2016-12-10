package todolist.models;

import java.util.List;
import java.math.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import javax.sql.DataSource;

import org.omg.CORBA.Object;
import org.springframework.jdbc.core.JdbcTemplate;


import org.springframework.stereotype.Repository;

@Repository
@Transactional
public class TaskDao {
  /* Get All Tasks For Dashboard */
  public List<Task> getAllTaskList() {
    return entityManager.createQuery("from Task").getResultList();
  }
  /* Save the task in the database */
  public void create(Task task) {
    entityManager.persist(task);
    return;
  }

  public int updateNative(String taskName,String taskContent,int userId,String taskStatus,String resultDate,int taskId) {
    String queryString = "UPDATE tasks SET taskName = ?,taskContent = ?,userId = ?,taskStatus = ?,resultDate = ? WHERE taskId = :taskID";

    Query query = entityManager.createNativeQuery(queryString, Task.class);
    query.setParameter(1, taskName);
    query.setParameter(2, taskContent);
    query.setParameter(3, userId);
    query.setParameter(4, taskStatus);
    query.setParameter(5, resultDate);
    query.setParameter("taskID", taskId);


return query.executeUpdate(); }

  /* Delete the task from the database. */
  public void delete(Task task) {
    if (entityManager.contains(task))
      entityManager.remove(task);
    else
      entityManager.remove(entityManager.merge(task));
    return;
  }
  /* Find Id */
  public Task getById(long taskId) {
    return entityManager.find(Task.class, taskId);
  }



  /**
   * Login Return the user having the passed email.
   */
  public User getByEmail(String email) {
    return (User) entityManager.createQuery(
            "from User where email = :email")
            .setParameter("email", email)
            .getSingleResult();
  }




  /**
   * Update the passed user in the database.
   */
  public void update(Task task) {
    entityManager.merge(task);
    return;
  }

  @PersistenceContext
  private EntityManager entityManager;

} // class UserDao
