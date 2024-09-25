import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.example.todolistapp.Task;
import com.example.todolistapp.TaskList;
import com.example.todolistapp.TaskAdapter;

public class MainActivity extends AppCompatActivity {
    private TaskList taskList;
    private TaskAdapter taskAdapter;
    private RecyclerView taskRecyclerView;
    private EditText addTaskEditText;
    private Button addTaskButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        taskList = new TaskList();
        taskAdapter = new TaskAdapter(taskList);

        taskRecyclerView = findViewById(R.id.task_list);
        taskRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        taskRecyclerView.setAdapter(taskAdapter);

        addTaskEditText = findViewById(R.id.add_task_edit_text);
        addTaskButton = findViewById(R.id.add_task_button);

        addTaskButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String taskText = addTaskEditText.getText().toString();
                if (!taskText.isEmpty()) {
                    taskList.addTask(new Task(taskText));
                    taskAdapter.notifyItemInserted(taskList.getTasks().size() - 1);
                    addTaskEditText.setText("");
                }
            }
        });
    }
}