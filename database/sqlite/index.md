# sqlite 学习笔记

## 打开数据库

```bash
# 打开数据库
sqlite3 a.db
# 查看库里的表 (如果没有 a.db, 这时候本地会创建一个 a.db 文件)
.tables
# 退出
.exit
```

## 创建表并插入数据

```sql
CREATE TABLE DEPARTMENT(
   ID INT PRIMARY KEY      NOT NULL,
   DEPT           CHAR(50) NOT NULL,
   EMP_ID         INT      NOT NULL
);

INSERT INTO DEPARTMENT (ID, DEPT, EMP_ID)
VALUES (1, 'IT Billing', 1 );

INSERT INTO DEPARTMENT (ID, DEPT, EMP_ID)
VALUES (2, 'Engineering', 2 );

INSERT INTO DEPARTMENT (ID, DEPT, EMP_ID)
VALUES (3, 'Finance', 7 );
```

## 查看数据

```sql
SELECT * FROM DEPARTMENT;
```

## 导出数据库

```sql
-- 导出整个数据库
sqlite3 a.db .dump > a.sql
-- 导出部分表
sqlite3 a.db ".dump 'table1' 'table2'" > a.sql
```

## 导入数据库

```sql
sqlite3 a2.db < a.sql
-- 
-- sqlite 交互式环境
.read a.sql
```

## 数据格式化输出

```bash
sqlite>.header on
sqlite>.mode column
sqlite>.timer on
```

## 表 重命名

```sql
ALTER TABLE DEPARTMENT RENAME TO _department_old;
```

## 修改 表结构

```sql
PRAGMA foreign_keys=off;

BEGIN TRANSACTION;

ALTER TABLE table1 RENAME TO _table1_old;

CREATE TABLE table1 (
( column1 datatype [ NULL | NOT NULL ],
  column2 datatype [ NULL | NOT NULL ],
  ...
);

INSERT INTO table1 (column1, column2, ... column_n)
  SELECT column1, column2, ... column_n
  FROM _table1_old;

COMMIT;

PRAGMA foreign_keys=on;
```

举例：

```sql
-- article 表 添加 description 字段

PRAGMA foreign_keys=off;

BEGIN TRANSACTION;

-- DROP TABLE _article_old;

ALTER TABLE article RENAME TO _article_old;

CREATE TABLE "article" (
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
  "title" varchar NOT NULL, 
  "description" varchar NOT NULL, 
  "content" varchar NOT NULL, 
  "createTime" datetime NOT NULL DEFAULT (datetime('now')), 
  "updateTime" datetime NOT NULL DEFAULT (datetime('now')), 
  "deleteTime" datetime, 
  "authorId" integer, CONSTRAINT "FK_a9c5f4ec6cceb1604b4a3c84c87" FOREIGN KEY ("authorId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

INSERT INTO article (title, description, content,createTime ,updateTime, deleteTime, authorId)
  SELECT title,substr(content, 1, 200), content,createTime ,updateTime, deleteTime, authorId
  FROM _article_old;

COMMIT;

PRAGMA foreign_keys=on;
```

参考自 [SQLite: ALTER TABLE Statement](https://www.techonthenet.com/sqlite/tables/alter_table.php)

## 复制表

```sql
-- 完整复制表
CREATE TABLE _article_old_bak AS SELECT * FROM article

-- 复制表结构
CREATE TABLE _article_old_bak AS SELECT * FROM article WHERE 0
```
