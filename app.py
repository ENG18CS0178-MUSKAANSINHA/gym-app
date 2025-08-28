from flask import Flask, render_template, request, redirect, url_for, session
import json

app = Flask(__name__)
app.secret_key = "mysecret"   # for session login

# Load users
def load_users():
    try:
        with open("users.json", "r") as f:
            return json.load(f)
    except:
        return {}

# Save users
def save_users(users):
    with open("users.json", "w") as f:
        json.dump(users, f, indent=4)

# @app.route("/", methods=["GET", "POST"])
# def login():
#     if request.method == "POST":
#         users = load_users()
#         email = request.form["email"]
#         password = request.form["password"]

#         if email in users and users[email]["password"] == password:
#             session["user"] = email
#             return redirect(url_for("dashboard"))
#         else:
#             return "Invalid credentials"
#     return render_template("login.html")
    
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Dummy validation
        if username == "admin" and password == "1234":
            return "Login successful!"
        else:
            return "Invalid credentials!"
    
    return render_template('login.html')


@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        users = load_users()
        email = request.form["email"]
        password = request.form["password"]

        if email not in users:
            users[email] = {"password": password}
            save_users(users)
            return redirect(url_for("login"))
        else:
            return "User already exists!"
    return render_template("signup.html")

@app.route("/dashboard", methods=["GET", "POST"])
def dashboard():
    if "user" not in session:
        return redirect(url_for("login"))

    if request.method == "POST":
        goal = request.form["goal"]
        with open("exercises.json", "r") as f:
            exercises = json.load(f)

        return render_template("workout.html", workouts=exercises[goal])
    return render_template("dashboard.html")

if __name__ == "__main__":
    app.run(debug=True)
