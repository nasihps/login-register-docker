FROM python:3.12-slim

WORKDIR /app

COPY . /app

RUN pip install -r requirements.txt
RUN pip install cryptography

EXPOSE 8000

CMD ["python3", "-m", "app.main"]
