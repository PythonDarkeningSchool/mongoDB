# Setup

## Download

:link: [=> mongoDB](https://www.mongodb.com/download-center/community)

## Environment variable

Add to `PATH` the mongoDB binaries

## Configuration file

Create a configuration file `mongod.conf`

```bash
# Where data files will reside
dbpath=<somePath>
# Where the log file will be stored
logpath=<somePath>/<logFileName>.log
# How to verbose the server will be logging (1-5)
verbose=vvvvv
```

## Running mongoDB

Run mongo with the `daemon`

```bash
$ mongod -f <configuration_file>.conf
```

## Install as a service

e.g when the machine starts, this applies for windows

```bash
mongod -f <configuration_file>.conf --install
```

To start mongodb as a services type the following command

```bash
net start mongodb
```

To check if the mongodb service is up and running type the following command

```bash
net start | findstr Mongo
```

To stop mongodb type the following command

```bash
net stop mongod
```

## Create a new database

In MongoDB default database is test. If you didn't create any database, then collections will be stored in test database



```bash
> use DATABASE_NAME
```

To check the current database type:

```bash
> db
```

To check all databases type:

```bash
show dbs
```

*At this point your database will not show in the above command because to display a database it needs at least one document into it*.

*In others words, the database is not created until it has some information*

To show commands related the database type:

```bash
db.<databaseName>.help()
```



:link: [mongoDB create databases](https://www.tutorialspoint.com/mongodb/mongodb_create_database.htm)​

## Verify the connection

```bash
$ mongo
MongoDB shell version v4.0.6
connecting to: mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("6ef3e1d5-5796-4470-80d8-33ab6b19af9a") }
MongoDB server version: 4.0.6
```

> `27017` is the port that mongoDB uses

## Database is Namespace

1. Connect to mongoDB typing `mongo`
2. Show the databases typing `show dbs`
   1. The `local` database is for mongo use, don't touch
3. Show the current database typing `db` (by default is `test`)
4. Specific a database typing `use <databaseName>`

## Replica Sets

The following is the *MINIMUM REPLICATE SET POSSIBLE MODEL*

The members of a replica set are:

![minimal_replica_set](img/minimal_replica_set.JPG)

Roles for each member

- `Primary DB`
  - Is the only and only readable instance, that's means that all the connections must be in this database for write any content, any attempts to write to `secondary DB` will fail
- `Secondary DB`
  - It is a only read instance and its a smaller machine
  - You can have many secondary databases as you want
  - To have `secondary databases` provides scalability because you can perform many more reads against the replicas ("secondary databases") rather than attacking a single server with all your request
  - Here the data will be replicated from the `primary database` eventually
  - `Automatic recovery option`: if in some point the `primary database` crash one of the `secondary databases` will take over and become as the `primary database`
  - If one of the `secondary databases` fail, there is not a big deal since you have the `primary database` running
  - To have a `secondary database` there will not it assures you *NO DATA LOSS* and functionality 
- `Arbiter DB`
  - An arbiter does *not* have a copy of data set thus *cannot* become a `primary database`
  - Replica sets may have arbiters to add a vote in `elections for primary`
  - Arbiters always have exactly *1* election vote, and thus allow replica sets to have an uneven number of voting members without the overhead of an additional member that replicates the data
  - The replica set cannot process write operations until the election completes successfully, the median time before a cluster elects a new primary should not typically exceed 12 seconds
  - *IMPORTANT*: `Do not run an arbiter on systems that also host the primary or the secondary members of the replica set`

The ideal model for `replica set` is to be run into different servers to protect the information for a system machine failure

References:

:link: [Replica set arbiter](https://docs.mongodb.com/manual/core/replica-set-arbiter)​

:link: [Replication](https://docs.mongodb.com/manual/replication)​

### Set minimal replica set model in one machine

#### Creation

1 - Create 3 directories

```bash
mkdir -p <directory>\primary <directory>\backup <directory>\arbiter
```

2 - Create the databases (this step applies for windows and it could be different on Mac os/ Linux systems)

```bash
> @REM Primary
> start "primaryDB" mongod --dbpath <directory>\primary --logpath <directory>/primary/<primaryDB>.log --port 3000 --replSet "demo"
> @REM Secondary
> start "backupDB" mongod --dbpath <directory>\backup --logpath <directory>/backup/<backupDB>.log --port 4000 --replSet "demo"
> @REM Arbiter
>start "arbiter" mongod --dbpath <directory>\arbiter --logpath <directory>/arbiter/<arbiter>.log --port 5000 --replSet "demo"
```

> Where:
>
> `port` => define a different port for each database since they will run in the same system (which is not recommend)
>
> `replSet` => sets the name of `replicate set` where the primary, secondary and arbiter will be participating

The above commands will open 3 terminals, one for each one, at this point they don't know match

Notice that you can add more options to `start` command like more verbosite `--verbose vvvvv`

#### Configuration

1 - Connect to primary database

```bash
> mongo --port 3000
```

> `TIP`: if you want to know which server are connect type `db.getMongo()`

2 - Define the replica set model (define a JavaScript object)

```javascript
let demoConfig = {
    _id: "demo",
    "members": [
        {
            "_id": 0,
            "host": "localhost:3000",
            "priority": 10
        },
        {
            "_id": 1,
            "host": "localhost:4000"
        },
        {
            "_id": 2,
            "host": "localhost:5000",
            "arbiterOnly": true
        }
    ]
}
```

> Which:
>
> `_id: "demo"` => its the `--replSet demo` parameter 
>
> `priority: 10` => the higher priority will get more voting, more votes and its more likely to become to primary



- Notes: 

  - The mongo shell is a `JavaScript` interpreter
  - Assigned priority of 10 and not assigned priority to the other will warranty that localhost 30000 will become to primary

  3 - Initialize the replication

  ```bash
  > rs.initiate(demoConfig)
  ```

  :link: [*Know Issue*](https://stackoverflow.com/questions/32636451/errmsg-bad-digit-while-parsing-port-30000-code-93)

  If you have an error with the step 3, redefine the object as follow and try it again

  ```bash
  demoConfig = { "_id": "demo", "members": [ { "_id": 0, "host": "localhost:3000", "priority": 10 }, { "_id": 1, "host": "localhost:4000" }, { "_id": 2, "host": "localhost:5000", "arbiterOnly": true } ] }
  ```

  The output will be:

  ```text
  > rs.initiate(demoConfig)
  {
          "ok" : 1,
          "operationTime" : Timestamp(1552683355, 1),
          "$clusterTime" : {
                  "clusterTime" : Timestamp(1552683355, 1),
                  "signature" : {
                          "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
                          "keyId" : NumberLong(0)
                  }
          }
  }
  demo:SECONDARY>
  demo:PRIMARY>
  ```

  after some time, type enter to show the current database as `PRIMARY`

4 - Insert a dummy value into primary database

```bash
db.foo.save({_id:1, value:"hello world"})
```

> Where:
>
> - `_id:1` => its an identifier

If you save another register with the same `_id`, the previous register will update

5 - Setup the backup database

5.1  - Connect to backup database

```bash
mongo --port 4000
```

At this point you are not able to perform any query due to this database needs to be configured as `slave`, by default `slave` is false

5.2 - Configurate the backup database as slave

```bash
> db.getMongo().setSlaveOk()
```

6 - Read the value from the `primary database`

```bash
db.foo.find()
```

> Note:
>
> - Every time you access to `backup` database you will perform the step 5.2

#### Test Failover 

1 - Making `backup datase` as *PRIMARY*

Simply close the window for `primary database` to make the backup turns as `primary database` after some seconds (12 seconds to be exact)

You can check this connecting to this database and the prompt will shows as *PRIMARY*

2 - Come alive again to `primary database` (which is in the port 3000)

```bash
> start "primaryDB" mongod --dbpath <directory>\primary --port 3000 --replSet "demo"
```

3 - Connect back to secondary

You can see now that the prompt has changed again to `SECONDARY`

#### Replication Status

To know about the `replication model status` type the command:

```bash
rs.status()
```

> More commands with `rs.help()`
>
> - `rs` stands for replication status

# The Mongo Shell

## eval command line option

### Detach option

Syntax's

```bash
mongo <server>/<database> --eval "command"
```

Example:

```bash
mongo localhost/admin --eval "printjson(db.runCommand({logRotate:1}))"
```

> Where:
>
> `admin` => is the database to connect for administrative operations
>
> `printjson function` => returns a json

### Interactive option

```bash
monogo <server> <script.js> --shell
```



## Run a JavaScript

Syntax's

```bash
mongo <server> <javaScript.js>
```

Example:

The `JavaScript` code

```javascript
let userCount = function(){
    let count = db.Users.count();
    let entry = {_id: Date(), n: count};
    db.UserCountHistory.save(entry);
    print("\nToday's User Count:" + entry.n)
};
userCount();
```

The execution:

```bash
> mongo localhost script.js
```

# Saving Data

mongo does not have any schema to store the data because it's not a relational database

## Rules

1. A document must have and *_id* field, if not mongo will assign one
   1. The size of document in mongo currently is limited to 60MB, if you need more than that you have to do it through several documents

## Collections

Collections are *analogous* to tables in relational databases

- The collection insert will be only visible through of the database from which was inserted

Example:

1 - create a collection into `foo database`

```bash
> use foo
> db.fooCollection.save({"_id":1, value: "hello world"})

```

> Where:
>
> - `db` => means operate in the current database
> - fooCollection => the name of the collection
> - save => means save a record in the current database

 2 - show the current database collections

```bash
> show collections
foorCollection

```

If you run the above command into another database it will not shows the `fooCollection`

## Document Id

The data types for `Id` field supports are:

![permitted_Ids](img/permitted_Ids.jpg)

The only data type exclude is an array:

![excluded_Ids](img/excluded_Ids.jpg)

