import { TaskList } from "../components/drag-drop/DropTaskContainer";

/**
 * Mock data representing a list of tasks for a task management application.
 *
 * This data structure contains tasks categorized into three states:
 * - `todo`: Tasks that are yet to be started.
 * - `inProgress`: Tasks that are currently being worked on.
 * - `completed`: Tasks that have been finished.
 *
 * Each task includes the following properties:
 * - `id`: A unique identifier for the task.
 * - `name`: The name or title of the task.
 * - `assignees`: An array of assignees assigned to the task, each with an `id` and `name`.
 * - `deadline`: The deadline associated with the task (e.g., due deadline).
 * - `subtask`: A number representing the number of subtask items associated with the task.
 * - `labelNames`: An array of labels categorizing the task (e.g., priority levels).
 * - `position`: The position of the task in the list (for ordering).
 */
const mockTasks: TaskList = {
  todo: [
    {
      id: "1",
      name: "Task name A",
      assignees: [
        { id: 1, name: "Alice Maria" },
        { id: 2, name: "Bob Taylor" },
      ],
      deadline: "2023-01-01",
      subtask: 6,
      labelNames: ["Low"],
      position: 1,
      listName: "to do",
    },
    {
      id: "2",
      name: "Task name B",
      assignees: [
        { id: 3, name: "Charlie Brown" },
        { id: 4, name: "Diana Prince" },
        { id: 5, name: "Ethan Hunt" },
      ],
      deadline: "2023-10-02",
      subtask: 2,
      labelNames: ["Medium"],
      position: 2,
      listName: "to do",
    },
  ],
  inProgress: [
    {
      id: "3",
      name: "Task name C",
      assignees: [
        { id: 6, name: "Fiona Gallagher" },
        { id: 7, name: "George Costanza" },
      ],
      deadline: "2023-07-03",
      subtask: 8,
      labelNames: ["High", "Medium", "Low", "None"],
      position: 3,
      listName: "in progress",
    },
  ],
  completed: [
    {
      id: "4",
      name: "Task name D",
      assignees: [
        { id: 8, name: "Hannah Montana" },
        { id: 9, name: "Ivy League" },
      ],
      deadline: "2023-01-04",
      subtask: 1,
      labelNames: ["Low"],
      position: 1,
      listName: "completed",
    },
    {
      id: "5",
      name: "Task name E",
      assignees: [
        { id: 10, name: "Jack Sparrow" },
        { id: 11, name: "Katherine Johnson" },
        { id: 12, name: "Leonardo DiCaprio" },
      ],
      deadline: "2023-10-05",
      subtask: 4,
      labelNames: ["Medium"],
      position: 1,
      listName: "completed",
    },
    {
      id: "6",
      name: "Task name F",
      assignees: [
        { id: 13, name: "Mia Wallace" },
        { id: 14, name: "Nina Simone" },
      ],
      deadline: "2023-03-06",
      subtask: 0,
      labelNames: ["High", "Low"],
      position: 4,
      listName: "completed",
    },
  ],
};

export default mockTasks;