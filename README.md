# FutureHunt
CS411 A1 Group 3

# Building & Running
Requirements:
- nodejs
- python 2.7
  - django
  - django-revproxy
  - careerjet-api-client

First, start the frontend server:
```bash
cd client
npm install && npm start
```

Then, start the backend server:
```bash
cd server
python2.7 manage.py makemigrations
python2.7 manage.py migrate
python2.7 manage.py runserver
```

Then navigate to [http://localhost:8000](http://localhost:8000).

# Docs
- [Pitch](docs/Pitch.md)
- [User Stores](docs/UserStories.md)
- [Analysis and Architecture](docs/Architecture.md)
