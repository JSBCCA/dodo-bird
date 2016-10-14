var game = {
  whose_turn: "P1",
  columns: [[null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null]],

  drop: function (column_i) {
    var lowest = this.columns[column_i].indexOf(null);
    if (this.whose_turn === "P1") {
      this.columns[column_i][lowest] = "red";
    } else {
      this.columns[column_i][lowest] = "blue";
    }
    var td_to_change = document.getElementsByClassName('connect4_row')[this.columns[column_i].length -1 - lowest].getElementsByTagName("img")[column_i];
    if (this.whose_turn === "P1") {
      td_to_change.src = "assets/bird.png";
      this.whose_turn = "P2";
    } else {
      td_to_change.src = "assets/pipe.png";
      this.whose_turn = "P1";
    }
    var count = 0;
    for (var i = 0; i < this.columns.length; i++) {
      for (var j = 0; j < this.columns[i].length; j++) {
        if (this.columns[i][j] !== null) {
          count += 1;
        }
      }
    }
    if (this.verti(column_i, lowest) || this.hori(column_i, lowest) ||
    this.left_dia(column_i, lowest) || this.right_dia(column_i, lowest)) {
      if (this.whose_turn === 'P2') {
        document.getElementById('name').innerText = "Player 1 Wins!";
        $('.bn').attr("onclick", "");
        $('.bn').attr("src", "img/pureblack.jpg");
        return 0;
      }
      else {
        document.getElementById('name').innerText = "Player 2 Wins!";
        $('.bn').attr("onclick", "");
        $('.bn').attr("src", "img/pureblack.jpg");
        return 0;
      }
    }
    console.log(count);
    if (count === 42) {
      document.getElementById('name').innerText = "Game Over";
      return 0;
    }
    if (this.whose_turn === 'P2') {
      $('#red').css('visibility', 'hidden');
      $('#blue').css('visibility', 'visible');
    }
    else {
      $('#red').css('visibility', 'visible');
      $('#blue').css('visibility', 'hidden');
    }
  },
  verti: function (column_i, lowest) {
    x = this.columns;
    return ((x[column_i][lowest] === x[column_i][lowest - 1]) &&
            (x[column_i][lowest - 1] === x[column_i][lowest - 2]) &&
            (x[column_i][lowest - 2] === x[column_i][lowest - 3]));
  },
  hori: function (column_i, lowest) {
    x = this.columns;
    for (var i = Math.max(column_i - 3, 0); (i + 3) < Math.min(7, column_i + 4) ; i++) {
      if ((x[i][lowest] === x[i + 1][lowest]) && (x[i][lowest] === x[i + 2][lowest])
      && (x[i][lowest] === x[i + 3][lowest])) {
        return true;
      }
    }
    return false;
  },
  left_dia: function (column_i, lowest) {
    x = this.columns;
    for (var i = 3; i < 7; i++) {
      for (var j = 0; j < 3; j++) {
        if ((x[i][j] === x[i - 1][j + 1]) && (x[i][j] === x[i - 2][j + 2])
        && (x[i][j] === x[i - 3][j + 3]) && x[i][j]) {
          return true;
        }
      }
    }
    return false;
  },
  right_dia: function (column_i, lowest) {
    x = this.columns;
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 3; j++) {
        if ((x[i][j] === x[i + 1][j + 1]) && (x[i][j] === x[i + 2][j + 2])
        && (x[i][j] === x[i + 3][j + 3]) && x[i][j]) {
          return true;
        }
      }
    }
    return false;
  }
}
