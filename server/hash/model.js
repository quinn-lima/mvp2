
const executeQuery = (query, values) => {
  return db.queryAsync(query, values).spread(results => results);
};

const parseData = options => {
  return _.reduce(options, (parsed, value, key) => {
    parsed.string.push(`${key} = ?`);
    parsed.values.push(value);
    return parsed;
  }, { string: [], values: [] });
};


class Model {
  constructor(tablename) {
    this.tablename = tablename;
  }

  getAll(options) {
    if (!options) {
      let queryString = `SELECT * FROM ${this.tablename}`;
      return executeQuery(queryString);
    }
    let parsedOptions = parseData(options);
    let queryString = `SELECT * FROM ${this.tablename} WHERE ${parsedOptions.string.join(' AND ')}`;
    return executeQuery(queryString, parsedOptions.values);
  }

  get(options) {
    let parsedOptions = parseData(options);
    let queryString = `SELECT * FROM ${this.tablename} WHERE ${parsedOptions.string.join(' AND ')} LIMIT 1`;
    return executeQuery(queryString, parsedOptions.values).then(results => results[0]);
  }


  create(options) {
    let queryString = `INSERT INTO ${this.tablename} SET ?`;
    return executeQuery(queryString, options);
  }

  update(options, values) {
    let parsedOptions = parseData(options);
    let queryString = `UPDATE ${this.tablename} SET ? WHERE ${parsedOptions.string.join(' AND ')}`;
    return executeQuery(queryString, Array.prototype.concat(values, parsedOptions.values));
  }

  delete(options) {
    let parsedOptions = parseData(options);
    let queryString = `DELETE FROM ${this.tablename} WHERE ${parsedOptions.string.join(' AND ')}`;
    return executeQuery(queryString, parsedOptions.values);
  }

  deleteAll() {
    let queryString = `TRUNCATE TABLE ${this.tablename}`;
    return executeQuery(queryString);
  }
}

module.exports = Model;
