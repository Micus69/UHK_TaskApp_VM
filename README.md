<h1>TaskFlow – SPA Task Management Application</h1>

<h2>Purpose of the Project</h2>
<p>
TaskFlow is a single-page application for managing projects and tasks.
The goal of the project is to demonstrate state-driven application architecture,
separation of responsibilities, business rules, authorization and controlled state changes.
</p>

<h2>Technology Stack</h2>
<ul>
    <li>JavaScript ES Modules</li>
    <li>HTML5</li>
    <li>CSS3</li>
    <li>Vite development server</li>
    <li>No frontend framework</li>
</ul>

<h2>Architecture Overview</h2>
<p>
The application follows a state-driven SPA architecture. The UI does not modify
data directly. All changes are performed through named actions, interpreted by
the dispatcher and executed through the mock API or application logic.
</p>

<pre>
index.js
 → init.js
 → store
 → dispatcher
 → actions
 → mock API
 → state
 → selectors
 → handlers
 → views
 → DOM
</pre>

<h2>Main Architectural Parts</h2>

<h3>State</h3>
<p>
The central application state is defined in <code>src/app/state.js</code>.
It contains business data, mocked authentication context and UI state.
</p>

<h3>Store</h3>
<p>
The store is implemented in <code>src/infra/createStore.js</code>.
It holds the current state, allows controlled state replacement and notifies
subscribers after each state change.
</p>

<h3>Dispatcher</h3>
<p>
The dispatcher is implemented in <code>src/infra/dispatch.js</code>.
It receives named actions and delegates them to specific action handlers.
</p>

<h3>Actions</h3>
<p>
Actions represent user or system intentions such as loading data, opening screens,
creating tasks or changing task status.
</p>

<h3>Selectors</h3>
<p>
Selectors prepare view models for the UI. They derive selected project,
selected task, project tasks and task history from the central state.
</p>

<h3>Views</h3>
<p>
Views are pure DOM projections of the current state. They are implemented using
<code>document.createElement</code> and do not use <code>innerHTML</code>.
</p>

<h3>Mock API</h3>
<p>
The mock API is implemented in <code>src/api/taskApi.js</code>.
It represents the authoritative data source and enforces business rules.
</p>

<h2>Business Entities</h2>

<h3>Project</h3>
<p>
A project groups tasks and users. A project can contain multiple tasks and
multiple members.
</p>

<h3>Task</h3>
<p>
A task represents work inside a project. It has a title, description, assignee,
priority, due date and status.
</p>

<h3>User</h3>
<p>
A user represents a mocked authenticated actor. Users have roles that define
business permissions.
</p>

<h3>Task History</h3>
<p>
Task history records important business events such as task creation and status changes.
</p>

<h2>Task State Machine</h2>
<p>
The task entity contains a state machine. Allowed task states are:
</p>

<ul>
    <li><code>TODO</code></li>
    <li><code>IN_PROGRESS</code></li>
    <li><code>DONE</code></li>
    <li><code>CANCELED</code></li>
</ul>

<h3>Allowed Transitions</h3>
<pre>
TODO        → IN_PROGRESS
TODO        → CANCELED
IN_PROGRESS → DONE
IN_PROGRESS → CANCELED
DONE        → no transition
CANCELED    → no transition
</pre>

<p>
The state machine is implemented in <code>src/domain/taskStatusMachine.js</code>.
Invalid transitions are rejected by the mock API.
</p>

<h2>Roles and Authorization</h2>

<h3>MANAGER</h3>
<ul>
    <li>Can create tasks</li>
    <li>Can change task status</li>
    <li>Can manage project tasks</li>
</ul>

<h3>MEMBER</h3>
<ul>
    <li>Can view projects and tasks</li>
    <li>Can change status of assigned tasks</li>
    <li>Cannot create new tasks</li>
</ul>

<p>
Authorization rules are implemented in <code>src/domain/authorization.js</code>.
The UI may show controls, but the authoritative validation is performed by the mock API.
</p>

<h2>Business Rules and Invariants</h2>
<ul>
    <li>A task must belong to an existing project.</li>
    <li>A task must have a non-empty title.</li>
    <li>Archived projects cannot be modified.</li>
    <li>Only authorized users can create tasks.</li>
    <li>Only allowed task status transitions can be performed.</li>
    <li>Important task changes are stored in task history.</li>
</ul>

<p>
Business invariants are implemented in <code>src/domain/invariants.js</code>.
</p>

<h2>Use Cases</h2>

<h3>Use Case 1: Load Application</h3>
<ol>
    <li>The application starts in the browser.</li>
    <li><code>APP_INIT</code> action is dispatched.</li>
    <li>Mock API returns initial users, projects, tasks and history.</li>
    <li>Central state is updated.</li>
    <li>The project list is rendered.</li>
</ol>

<h3>Use Case 2: Open Project Detail</h3>
<ol>
    <li>User clicks on a project.</li>
    <li><code>ENTER_PROJECT_DETAIL</code> action is dispatched.</li>
    <li>Selected project ID is stored in UI state.</li>
    <li>Selector derives selected project and its tasks.</li>
    <li>Project detail view is rendered.</li>
</ol>

<h3>Use Case 3: Create Task</h3>
<ol>
    <li>Manager fills task form.</li>
    <li><code>CREATE_TASK</code> action is dispatched.</li>
    <li>Mock API validates authorization and task data.</li>
    <li>New task is created in status <code>TODO</code>.</li>
    <li>Task creation is recorded in task history.</li>
    <li>State is updated and UI is re-rendered.</li>
</ol>

<h3>Use Case 4: Change Task Status</h3>
<ol>
    <li>User opens task detail.</li>
    <li>User selects available status transition.</li>
    <li><code>CHANGE_TASK_STATUS</code> action is dispatched.</li>
    <li>Mock API validates authorization and state transition.</li>
    <li>Task status is changed.</li>
    <li>Status change is recorded in task history.</li>
</ol>

<h2>Mock API Contract</h2>

<p>
Frontend communicates with the mock API through explicit functions:
</p>

<ul>
    <li><code>getInitialData()</code></li>
    <li><code>createTask(...)</code></li>
    <li><code>changeTaskStatus(...)</code></li>
</ul>

<p>
The mock API does not return random data. It works with deterministic in-memory
data and represents the boundary between frontend and backend.
</p>

<h2>Error Handling</h2>
<p>
Business errors are stored in UI state and rendered as visible error messages.
For example, if a MEMBER tries to create a task, the API rejects the action and
the UI displays an authorization error.
</p>

<h2>Test Scenarios</h2>

<ul>
    <li>Start application and verify that project list is loaded.</li>
    <li>Open project detail and verify project tasks are displayed.</li>
    <li>Create a new task as MANAGER and verify it appears in the list.</li>
    <li>Open task detail and change status from <code>TODO</code> to <code>IN_PROGRESS</code>.</li>
    <li>Verify that status change is recorded in task history.</li>
    <li>Switch user to MEMBER and try to create a task.</li>
    <li>Verify that authorization error is displayed.</li>
    <li>Try invalid task transition and verify that it is rejected.</li>
</ul>

<h2>How to Run</h2>

<pre>
npm install
npm run dev
</pre>

<p>
The application runs locally using Vite, usually at:
</p>

<pre>
http://localhost:5173
</pre>

<h2>Conclusion</h2>
<p>
The project demonstrates a clean SPA architecture with central state,
controlled actions, dispatcher, selectors, view handlers, mock API,
business authorization, state machine and audit history.
The visual design is intentionally simple because the focus is on architecture,
state consistency and business rules.
</p>