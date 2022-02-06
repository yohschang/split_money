FROM python:3.9.9

WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

# FROM CURRENT FOLDER TO /APP FOLDER
COPY . . 

# 0.0.0.0 make project visible outside container
CMD ["python3","manage.py","runserver","0.0.0.0:8000"]


#docker build --tag splitm-django .  <- . is to build in current folder