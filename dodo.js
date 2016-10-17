// show score


var game = {
  time: 1000,
  dodo_pos: 4,
  pipe_pos: [null, null, null, null, null, null, null, null],

  columns: [[null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, "dodo", null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null]],

  move_dodo_left: function () {
    var i = this.dodo_pos;
    if (this.columns[i - 1][6] == "pipe") {
      this.reset_game();
    }
    this.columns[i][6] = null;
    this.columns[i - 1][6] = "dodo";
    this.dodo_pos = i - 1;
    this.draw();
  },

  move_dodo_right: function () {
    var i = this.dodo_pos;
    if (this.columns[i + 1][6] == "pipe") {
      this.reset_game();
    }
    this.columns[i][6] = null;
    this.columns[i + 1][6] = "dodo";
    this.dodo_pos = i + 1;
    this.draw();
  },

  generate_pipe: function() {
    if (this.pipe_pos[0] === null && this.pipe_pos[1] === null) {
      return 1 + Math.floor(Math.random() * 6);
    } else {
      return null;
    }
  },

  clear_pipe: function (row) {
    for (var col = 0; col < this.columns.length; col++) {
      if (this.columns[col][row] == "pipe")
        this.columns[col][row] = null;
    }
  },

  add_pipe: function (row, size) {
    for (var col = 0; col < size; col++) {
      if (this.columns[col][row] === "dodo") {
        this.reset_game();
        throw "reset";
      }
      else {
      this.columns[col][row] = "pipe";
      }
    }
    for (var col = size + 2; col < this.columns[0].length + 1; col++) {
      if (this.columns[col][row] === "dodo") {
        this.reset_game();
        throw "reset";
      }
      else {
      this.columns[col][row] = "pipe";
      }
    }
  },

  update_column_pipes: function() {
    for (var row = 0; row < this.columns[0].length; row++) {
      if (this.pipe_pos[row] < 1) {
        this.clear_pipe(row);
      } else {
        this.add_pipe(row, this.pipe_pos[row]);
      }
    }
  },

  move_pipes_up: function () {
    this.pipe_pos.pop();
    this.pipe_pos.unshift(this.generate_pipe());
    this.update_column_pipes();
    this.draw();
  },

  draw: function () {
    for (i = 0; i < 9; i++) {
      for (j = 0; j < 8; j++) {
          item = $('#tablecenter').children("div")[7 - j];
          kid = $(item).children("img")[i];
          $(kid).attr("src", this.image_for(this.columns[i][j]));
      }
    }
  },

  image_for: function(value) {
    if (value === "dodo") {
      return "img/dodo.png";
    } else if (value === "pipe") {
      return "img/pipe.png";
    } else {
      return "img/blue.png";
    }
  },

  reset_game: function() {
    this.time = 1000;
    this.pipe_pos = [null, null, null, null, null, null, null, null];
    this.move_pipes_up();
  },

  loop: function() {
    try {
      this.move_pipes_up();
      this.time = Math.max(this.time - 10, 480);
      setTimeout(function () { game.loop(); }, this.time);
    } catch (m) {
      if (m === "reset") {
        setTimeout(function () { game.loop(); }, this.time);
      }
    }
  }
};

$(document).keydown(function (e) {
    switch(e.which) {
        case 37: // left
        game.move_dodo_left();
        break;

        case 39: // right
        game.move_dodo_right();
        break;

        default: return; // exit this handler for other keys
  }
  e.preventDefault(); // prevent the default action (scroll / move caret)
});

game.loop();

