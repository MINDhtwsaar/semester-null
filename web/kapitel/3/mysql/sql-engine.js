/**
 * Mini-SQL engine over in-memory JSON tables.
 * Supports: SHOW TABLES, SELECT … FROM … [WHERE …] [ORDER BY …]
 */
(function (global) {
  "use strict";

  function strip(sql) {
    return String(sql || "")
      .replace(/--.*$/gm, "")
      .replace(/;\s*$/, "")
      .trim();
  }

  function unquote(v) {
    if (
      (v.startsWith("'") && v.endsWith("'")) ||
      (v.startsWith('"') && v.endsWith('"'))
    ) {
      return v.slice(1, -1);
    }
    if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v);
    if (v.toLowerCase() === "true") return true;
    if (v.toLowerCase() === "false") return false;
    return v;
  }

  function cmp(a, op, b) {
    if (op === "=" || op === "==") return a == b;
    if (op === "!=" || op === "<>") return a != b;
    if (op === ">") return Number(a) > Number(b);
    if (op === "<") return Number(a) < Number(b);
    if (op === ">=") return Number(a) >= Number(b);
    if (op === "<=") return Number(a) <= Number(b);
    throw new Error("Unbekannter Operator: " + op);
  }

  function parseWhere(whereSql, row) {
    // support single condition or AND of two
    var parts = whereSql.split(/\s+AND\s+/i);
    return parts.every(function (part) {
      var m = part
        .trim()
        .match(/^([a-zA-Z_][\w]*)\s*(=|!=|<>|>=|<=|>|<)\s*(.+)$/);
      if (!m) throw new Error("WHERE nicht verstanden: " + part);
      var col = m[1];
      var op = m[2];
      var val = unquote(m[3].trim());
      if (!(col in row)) throw new Error("Unbekannte Spalte: " + col);
      return cmp(row[col], op, val);
    });
  }

  function runSQL(db, sql) {
    var q = strip(sql);
    if (!q) throw new Error("Leerer Befehl.");

    if (/^SHOW\s+TABLES$/i.test(q)) {
      return {
        columns: ["tables_in_lab"],
        rows: Object.keys(db).map(function (name) {
          return [name];
        }),
      };
    }

    var desc = q.match(/^DESC(?:RIBE)?\s+([a-zA-Z_][\w]*)$/i);
    if (desc) {
      var tname = desc[1];
      if (!db[tname]) throw new Error("Unbekannte Tabelle: " + tname);
      var sample = db[tname][0] || {};
      return {
        columns: ["field", "example"],
        rows: Object.keys(sample).map(function (k) {
          return [k, sample[k]];
        }),
      };
    }

    var m = q.match(
      /^SELECT\s+(.+?)\s+FROM\s+([a-zA-Z_][\w]*)(?:\s+WHERE\s+(.+?))?(?:\s+ORDER\s+BY\s+([a-zA-Z_][\w]*)(?:\s+(ASC|DESC))?)?$/i
    );
    if (!m) {
      throw new Error(
        "Befehl nicht unterstützt. Nutze SHOW TABLES oder SELECT … FROM …"
      );
    }

    var selectRaw = m[1].trim();
    var table = m[2];
    var whereRaw = m[3] ? m[3].trim() : null;
    var orderCol = m[4] || null;
    var orderDir = (m[5] || "ASC").toUpperCase();

    if (!db[table]) throw new Error("Unbekannte Tabelle: " + table);
    var rows = db[table].slice();

    if (whereRaw) {
      rows = rows.filter(function (row) {
        return parseWhere(whereRaw, row);
      });
    }

    if (orderCol) {
      rows.sort(function (a, b) {
        var av = a[orderCol];
        var bv = b[orderCol];
        if (av == null) return 1;
        if (bv == null) return -1;
        if (av < bv) return orderDir === "DESC" ? 1 : -1;
        if (av > bv) return orderDir === "DESC" ? -1 : 1;
        return 0;
      });
    }

    var columns;
    if (selectRaw === "*") {
      columns = rows.length
        ? Object.keys(rows[0])
        : Object.keys(db[table][0] || {});
    } else {
      columns = selectRaw.split(/\s*,\s*/).map(function (c) {
        return c.trim();
      });
      columns.forEach(function (c) {
        if (rows[0] && !(c in rows[0]) && db[table][0] && !(c in db[table][0])) {
          throw new Error("Unbekannte Spalte: " + c);
        }
      });
    }

    return {
      columns: columns,
      rows: rows.map(function (row) {
        return columns.map(function (c) {
          return row[c];
        });
      }),
    };
  }

  /** Compare query results ignoring column order? We require same columns+rows. */
  function resultsEqual(a, b) {
    if (!a || !b) return false;
    if (a.columns.length !== b.columns.length) return false;
    for (var i = 0; i < a.columns.length; i++) {
      if (String(a.columns[i]).toLowerCase() !== String(b.columns[i]).toLowerCase()) {
        return false;
      }
    }
    if (a.rows.length !== b.rows.length) return false;
    for (var r = 0; r < a.rows.length; r++) {
      for (var c = 0; c < a.columns.length; c++) {
        if (String(a.rows[r][c]) !== String(b.rows[r][c])) return false;
      }
    }
    return true;
  }

  global.MiniSQL = { runSQL: runSQL, resultsEqual: resultsEqual, strip: strip };
})(window);
