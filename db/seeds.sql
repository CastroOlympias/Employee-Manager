INSERT INTO departments (title)
VALUES
  ('Excelsior'), ('Mediocre'),('Underdog');


  INSERT INTO roles (title, salary, department_id)
VALUES
  ('Manager', '200020', 1),
  ('Supervisor', '100020', 2),
  ('Agent', '60000', 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('James', 'Fraser', 1, NULL),
  ('Jack', 'London', 2, 2),
  ('Robert', 'Bruce', 2, 3),
  ('Peter', 'Greenaway', 1, NULL),
  ('Derek', 'Jarman', 2, 2),
  ('Paolo', 'Pasolini', 3, 2),
  ('Heathcote', 'Williams', 1, NULL),
  ('Sandy', 'Powell', 2, 3),
  ('Emil', 'Zola', 3, 3);