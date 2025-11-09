# Templator - HTML Template Manager

**Templator** is a modern web application that allows users to create, edit, and dynamically fill HTML templates with custom data through a user-friendly interface.

Perfect for generating personalized documents, invoices, contracts, or emails with dynamic placeholders.

---

## Overview

Templator lets you define reusable HTML templates containing placeholders such as `{{name}}`, `{{address}}`, or `{{date}}`. You can insert custom values into those placeholders using an intuitive web interface.

Once filled, the app renders the final document in HTML or converts it to PDF for downloading or sharing.

---

## Key Features

- Create and manage HTML templates stored in a database.
- Dynamically insert user-provided text into placeholders.
- Real-time preview of the rendered templates.
- Export results as HTML or PDF files.
- Full CRUD API for template management.
- RESTful design for easy external integration.
- Client-side form builder automatically detects placeholders.

---

## Technology Stack

- Backend: ASP.NET Core 8.0 (C#)
- Frontend: React.js (TypeScript)
- Database: Microsoft SQL Server
- PDF Generation: PuppeteerSharp
- ORM: Entity Framework Core

---

## Installation and Running

1. Clone the repository:
   
   `git clone https://github.com/Witchdoctor90/Templator.git`

   `cd Templator`

2. Build with docker-compose

   `docker-compose up -d`

---

## Usage

- Create HTML templates with the necessary placeholders (e.g., `{{name}}`).
- Use the web interface to edit and dynamically fill templates.
- Preview changes in real-time.
- Export the final document as HTML or PDF for distribution or storage.

---

## Contributing

You can propose changes or report issues via Pull Requests or Issues.

---

## Contact and Support

If you have any questions or suggestions, open an issue in the repository or contact the developer.

---

## License

MIT License — see LICENSE file
