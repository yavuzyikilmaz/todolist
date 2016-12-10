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
public class UserDao {
  /* Get All Users For Dashboard */
  public List<User> getAllUserList() {
    return entityManager.createQuery("from User").getResultList();
  }
  /* Save the user in the database */
  public void create(User user) {
    entityManager.persist(user);
    return;
  }
  /* Delete the user from the database. */
  public void delete(User user) {
    if (entityManager.contains(user))
      entityManager.remove(user);
    else
      entityManager.remove(entityManager.merge(user));
    return;
  }
  /* Find Id */
  public User getById(long id) {
    return entityManager.find(User.class, id);
  }


  public User getControlUser(String username,String password) {
    return (User) entityManager.createQuery(
        "from User where username = :username AND password = :pass")
        .setParameter("username", username).setParameter("pass", password)
        .getSingleResult();
  }


  /**
   * Update the passed user in the database.
   */
  public void update(User user) {
    entityManager.merge(user);
    return;
  }

  @PersistenceContext
  private EntityManager entityManager;
  
} // class UserDao
