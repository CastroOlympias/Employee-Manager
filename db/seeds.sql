INSERT INTO departments (name)
VALUES
  ('Excelsior'), ('Mediocre'),('Underdog');


INSERT INTO roles (title, salary, department_id)
VALUES
  ('Manager', '200020', 1),
  ('Supervisor', '100020', 1),
  ('Agent', '60000', 1),
  ('Manager', '200010', 2),
  ('Supervisor', '100010', 2),
  ('Agent', '50000', 2),
  ('Manager', '200000', 3),
  ('Supervisor', '100000', 3),
  ('Agent', '40000', 3);
 

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('James', 'Fraser', 1, 1),
  ('Jack', 'London', 1, 1),
  ('Robert', 'Bruce', 1, 1),
  ('Peter', 'Greenaway', 2, 2),
  ('Derek', 'Jarman', 2, 2),
  ('Paolo', 'Pasolini', 2, 2),
  ('Heathcote', 'Williams', 3, 3),
  ('Sandy', 'Powell', 3, 3),
  ('Emil', 'Zola', 3, 3);