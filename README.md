# Setup

## Download

:link: [=> mongoDB](https://www.mongodb.com/download-center/community)

## Environment variable

Add to `PATH` the mongoDB binaries

## Directory

Create a directory that will contains the database

```bash
mkdir <directory>
```

## Running mongoDB

Run mongo with the `daemon`

```bash
$ mongod --verbose --logpath <some_location>/<log_name>.log --cpu --dbpath <your_directory>
```

