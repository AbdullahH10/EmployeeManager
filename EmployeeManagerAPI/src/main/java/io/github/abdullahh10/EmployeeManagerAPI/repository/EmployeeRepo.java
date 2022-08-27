package io.github.abdullahh10.EmployeeManagerAPI.repository;

import io.github.abdullahh10.EmployeeManagerAPI.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

//JpaRepository needs Model type as well as Primary Key data type.
//Each Model requires one repository of its own.
public interface EmployeeRepo extends JpaRepository<Employee, Long> {
    Optional<Employee> findEmployeeById(Long id);

    void deleteEmployeeById(Long id);
}
