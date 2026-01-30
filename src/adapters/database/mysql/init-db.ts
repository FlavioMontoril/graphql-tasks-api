import { mysqlClient } from "../../../infra/database/mysql";
import { taskQueries } from "../../../sql/task-queries";

export async function initDatabase() {

  await mysqlClient.execute(taskQueries.CREATE_TABLE);

  console.log("[Database] and table 'tasks' initialized");
}
