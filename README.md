# 使用 Express + Mysql 做的一个添加用户名的小 DEMO
## 说明
- 使用 swig 作为模板引擎
- 使用 mysql 包连接数据库
- 使用 jQuery 发送 AJAX 请求
- 字段非空判断

## 表结构
```
/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : db_node_express

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-11-13 16:45:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `tb_user`
-- ----------------------------
DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_user
-- ----------------------------
INSERT INTO `tb_user` VALUES ('9', '张三');
INSERT INTO `tb_user` VALUES ('10', '张三');
INSERT INTO `tb_user` VALUES ('13', '王麻子');

```