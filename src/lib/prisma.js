const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default prisma;

export const prismaErrorCode = {
  P1000:
    "Authentication failed against database server at {database_host}, the provided database credentials for {database_user} are not valid. Please make sure to provide valid database credentials for the database server at {database_host}.",
  P1001:
    "Can't reach database server at {database_host}:{database_port} Please make sure your database server is running at {database_host}:{database_port}.",
  P1003: "Database {database_file_name} does not exist at {database_file_path}",
  P1009:
    "Database {database_name} already exists on the database server at {database_host}:{database_port}",
  P1010:
    "User {database_user} was denied access on the database {database_name}",
  P1016:
    "Your raw query had an incorrect number of parameters. Expected: {expected}, actual: {actual}.",
  P1017: "Server has closed the connection.",
  P2000:
    "The provided value for the column is too long for the column's type. Column: {column_name}",
  P2001:
    "The record searched for in the where condition ({model_name}.{argument_name} = {argument_value}) does not exist",
  P2002: "Unique constraint failed on the {constraint}",
  P2003: "Foreign key constraint failed on the field: {field_name}",
  P2004: "A constraint failed on the database: {,database_error}",
  P2005:
    "The value {field_value} stor,ed in the database for the field {field_name} is invalid for the field's type",
  P2006:
    "The provided value {field_value} for {model_name} field, {field_name} is not valid",
  P2007: "Data validation error {dat,abase_error}",
  P2009:
    "Failed to validate t,he query: {query_validation_error} at {query_position}",
  P2011: "Null constraint vi,olation on the {constraint}",
  P2012: "Missing a requi,red value at {path}",
  P2013:
    "Missing the re,quired argument {argument_name} for field {field_name} on {object_name}.",
  P2015: "A related record could not be found. {,details}",
  P2017:
    "The rec,ords for relation {relation_name} between the {parent_name} and {child_name} models are not connected.",
  P2020: "Value out of range for t,he type. {details}",
  P2021: "The table {table} does, not exist in the current database.",
  P2022: "The column {column} d,oes not exist in the current database.",
  P2025:
    "An operation faile,d because it depends on one or more records that were required but not found. {cause}",
  P2028: "Transaction AP,I error: {error}",
  P3000: "Failed to c,reate database: {database_error}",
};
