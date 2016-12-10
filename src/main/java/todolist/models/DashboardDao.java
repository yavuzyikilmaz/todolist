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

/**
 * This class is used to access data for the User entity.
 * Repository annotation allows the component scanning support to find and
 * configure the DAO wihtout any XML configuration and also provide the Spring
 * exceptiom translation.
 * Since we've setup setPackagesToScan and transaction manager on
 * DatabaseConfig, any bean method annotated with Transactional will cause
 * Spring to magically call begin() and commit() at the start/end of the
 * method. If exception occurs it will also call rollback().
 */
@Repository
@Transactional
public class DashboardDao {

  /* Return User Count */
  public int getUserCount(String userId) {
    String queryString = "SELECT Count(*) FROM users where id=:userId";
    Query query = entityManager.createNativeQuery(queryString).setParameter("userId",userId);
    return ((BigInteger) query.getSingleResult()).intValue();
  }

  /* Return Task Count */
  public int getTaskCount(String userId) {
    String queryString = "SELECT Count(*) FROM tasks where userId=:userId";
    Query query = entityManager.createNativeQuery(queryString).setParameter("userId",userId);
    return ((BigInteger) query.getSingleResult()).intValue();
  }

  /* Return Success Task Count */
  public int getSuccessTaskCount(String userId) {
    String queryString = "SELECT Count(*) FROM tasks where taskStatus='1' AND userId=:userId ";
    Query query = entityManager.createNativeQuery(queryString).setParameter("userId",userId);
    return ((BigInteger) query.getSingleResult()).intValue();
  }

  /* Get All Tasks For Dashboard */
  public List<Task> getAllTasks(int userId) {
    return entityManager.createQuery("from Task where userId = :userId order by taskDate desc").setParameter("userId", userId).getResultList();
  }


  /**
   * Save the user in the database.
   */
  public void create(User user) {
    entityManager.persist(user);
    return;
  }

//  public int userRowCount(){
//    return (int) session.createCriteria("User").setProjection(Projections.rowCount()).uniqueResult();
//
//  }

  /**
   * Delete the user from the database.
   */
  public void delete(User user) {
    if (entityManager.contains(user))
      entityManager.remove(user);
    else
      entityManager.remove(entityManager.merge(user));
    return;
  }

  /**
   * Return all the users stored in the database.
   */
  @SuppressWarnings("unchecked")
  public List<User> getAll() {
    return entityManager.createQuery("from User").getResultList();
  }

  /**
   * Return the user having the passed email.
   */
  public User getByEmail(String email) {
    return (User) entityManager.createQuery(
            "from User where email = :email")
            .setParameter("email", email)
            .getSingleResult();
  }



  /**
   * Return the user having the passed id.
   */
  public User getById(long id) {
    return entityManager.find(User.class, id);
  }

  /**
   * Update the passed user in the database.
   */
  public void update(User user) {
    entityManager.merge(user);
    return;
  }

  // ------------------------
  // PRIVATE FIELDS
  // ------------------------

  // An EntityManager will be automatically injected from entityManagerFactory
  // setup on DatabaseConfig class.
  @PersistenceContext
  private EntityManager entityManager;

} // class UserDao
