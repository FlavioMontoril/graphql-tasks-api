export const userQueries = {
    CREATE: `
    INSERT INTO users(id, name, department, email, password_hash, created_at, updated_at)
    VALUES(?, ?, ?, ?, ?, ?, ?)
    `,

    FINDALL: `
    SELECT * FROM users
    ORDER BY
    created_at DESC
    `,
}