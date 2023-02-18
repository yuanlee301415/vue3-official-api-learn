export class Todo {
  id: string;
  title: string;
  createdTime: Date;
  completed: boolean;
  completedTime?: Date;
  constructor(_: Todo) {
    const { id, title, createdTime, completed, completedTime } = { ..._ };
    this.id = id;
    this.title = title;
    this.createdTime = createdTime;
    this.completed = completed;
    this.completedTime = completedTime;
  }
}
