// move pipes
// randomly generate pipes in correct position
// collision
// reset on collision
// show score?


var game = {
  dodo_pos: 4,
  pipe_pos: [2, null, null, 3, null, null, 1, 1],
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
    this.columns[i][6] = null;
    this.columns[i - 1][6] = "dodo";
    this.dodo_pos = i - 1;
    this.draw();
  },

  move_dodo_right: function () {
    var i = this.dodo_pos;
    this.columns[i][6] = null;
    this.columns[i + 1][6] = "dodo";
    this.dodo_pos = i + 1;
    this.draw();
  },

  generate_pipes: function() {
    ['pipe', 'null', 'null', 'pipe', 'pipe', 'pipe']
  },

  move_pipes_up: function () {
    var i = this.dodo_pos;
    this.columns[pos_x][pos_y] = null;
    this.columns[pos_x][pos_y + 1] = "pipe";
    // this.pipe_pos = pos_y + 1;
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
})

