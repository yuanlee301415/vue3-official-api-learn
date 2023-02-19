export class Todo {
  id: string;
  title: string;
  createdTime: number;
  completed: boolean;
  completedTime?: number;
  constructor(_: Todo) {
    const { id, title, createdTime, completed, completedTime } = { ..._ };
    this.id = id;
    this.title = title;
    this.createdTime = createdTime;
    this.completed = completed;
    this.completedTime = completedTime;
  }
}
