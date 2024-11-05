from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # Unique identifier for each task
    title = db.Column(db.String(100), nullable=False)  # Task title (required)
    completed = db.Column(db.Boolean, default=False)  # Task completion status (default to False)

    def __repr__(self):
        return f"<Task {self.title}>"

@app.route('/')
def home():
    return render_template('index.html')  # This serves the HTML file

@app.route('/tasks', methods=['POST'])
def create_task():
    data = request.get_json()  # Get JSON data from the request
    new_task = Task(title=data['title'], completed=False)  # Create a new task
    db.session.add(new_task)  # Add the task to the database
    db.session.commit()  # Save the task
    return jsonify({"id": new_task.id, "title": new_task.title, "completed": new_task.completed})  # Return task details

@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()  # Query all tasks from the database
    task_list = [{"id": task.id, "title": task.title, "completed": task.completed} for task in tasks]  # Convert to list of dictionaries
    return jsonify(task_list)  # Return as JSON response

@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    task = Task.query.get(id)  # Find the task by ID
    if task is None:
        return jsonify({"error": "Task not found"}), 404

    data = request.get_json()  # Get JSON data from the request
    task.title = data.get('title', task.title)  # Update the title if provided
    task.completed = data.get('completed', task.completed)  # Update the completed status if provided
    db.session.commit()  # Save changes to the database
    
    return jsonify({"id": task.id, "title": task.title, "completed": task.completed})  # Return updated task details

@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get(id)  # Find the task by ID
    if task is None:
        return jsonify({"error": "Task not found"}), 404

    db.session.delete(task)  # Delete the task
    db.session.commit()  # Save changes to the database
    
    return jsonify({"message": "Task deleted"})  # Confirm deletion


if __name__ == "__main__":
    app.run(debug=True)