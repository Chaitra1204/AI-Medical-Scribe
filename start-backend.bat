@echo off
echo Starting Aushadh Backend...
cd /d %~dp0
call venv\Scripts\activate
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
