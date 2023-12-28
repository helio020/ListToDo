interface TaskData {
  id: number;
  title: string;
  description: string;
}

class Task {
  private id: number;
  private title: string;
  private description: string;

  constructor(data: TaskData) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
  }

  // Getters e Setters, métodos relacionados à tarefa
  public getId(): number {
    return this.id;
  }
  public getTitle(): string {
    return this.title;
  }
  public getDescription(): string {
    return this.description;
  }
  public setId(id: number): void {
    this.id = id;
  }
  public setTitle(title: string): void {
    this.title = title;
  }
  public setDescription(description: string): void {
    this.description = description;
  }
}

export default Task;
