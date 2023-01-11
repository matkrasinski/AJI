//knexfile.js
module.exports = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'root',
        database: 'AJI'
    }
 }

//Unhandled rejection Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
// SOLUTION :
// LOG INTO YOUR MYSQL SERVER :
// mysql -u root -p
// mysql> CREATE USER '{username}'@'%' IDENTIFIED WITH mysql_native_password BY '{password}';
// mysql> GRANT ALL PRIVILEGES ON *.* TO '{username}'@'%';
// mysql> FLUSH PRIVILEGES;

// OR 
//  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'
//  flush privileges
