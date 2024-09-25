public class Task {
    private String taskText;
    private boolean isDone;

    public Task(String taskText) {
        this.taskText = taskText;
        this.isDone = false;
    }

    public String getTaskText() {
        return taskText;
    }

    public boolean isDone() {
        return isDone;
    }

    public void setDone(boolean done) {
        this.isDone = done;
    }
}