export const taskQueries = {
    CREATE: `
     INSERT INTO tasks 
      (id, code, summary, description, reporter, assignee, status, created_at, updated_at, archived)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    CREATE_TABLE: `
     CREATE TABLE IF NOT EXISTS tasks (
      id VARCHAR(36) NOT NULL PRIMARY KEY,
      code VARCHAR(255) NOT NULL UNIQUE,
      summary VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      reporter VARCHAR(255) NOT NULL,
      assignee VARCHAR(255),
      status ENUM('OPEN','IN_PROGRESS','DONE','ARCHIVED') DEFAULT 'OPEN',
      created_at DATETIME NOT NULL,
      updated_at DATETIME NOT NULL,
      archived BOOLEAN DEFAULT FALSE
    )`,
    FIND_ALL: `
    SELECT * FROM tasks
     ORDER BY created_at DESC 
     LIMIT ?, ?
    `,
    FIND_BY_ID: `
    SELECT * FROM tasks WHERE id = ?
    `,
    UPDATE: `
    UPDATE tasks SET summary=?, description=?, reporter=?, assignee=?, status=?, updated_at=?, archived=? WHERE id=?
    `,
    DELETE: `
    DELETE FROM tasks WHERE id=?
    `,
    COUNT: `
    SELECT COUNT(*) as total FROM tasks
    `,
    FIND_BY_CODE: `
    SELECT * FROM tasks WHERE code = ? LIMIT 1
    `,
}