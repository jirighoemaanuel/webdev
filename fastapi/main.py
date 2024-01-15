import json
from flask import Flask, jsonify, request

employees = [{'id': 1, 'name': 'Ashley'}, {'id': 2, 'name': 'Kate'}, {'id': 3, 'name': 'Joe'}]

app = Flask(__name__)

# Initialize nextEmployeeId
nextEmployeeId = 3  # Initialize it based on the last employee ID in your list

@app.route('/employees', methods=['GET'])
def get_employees():
    return jsonify(employees)

@app.route('/employees', methods=['POST'])
def create_employees():
    global nextEmployeeId
    employee = json.loads(request.data)

    nextEmployeeId += 1
    employee['id'] = nextEmployeeId
    employees.append(employee)

    return jsonify(employee), 201

    
    

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=True)
