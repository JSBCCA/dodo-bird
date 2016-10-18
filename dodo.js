var game = {
  time: 1000,
  score: 0,
  high_score: 0,
  dodo_pos: 4,
  spike_pos: [null, null, null, null, null, null, null, null],

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
    if (this.columns[i - 1][6] == "spike") {
      this.reset_game();
    }
    this.columns[i][6] = null;
    this.columns[i - 1][6] = "dodo";
    this.dodo_pos = i - 1;
    this.draw();
  },

  move_dodo_right: function () {
    var i = this.dodo_pos;
    if (this.columns[i + 1][6] == "spike") {
      this.reset_game();
    }
    this.columns[i][6] = null;
    this.columns[i + 1][6] = "dodo";
    this.dodo_pos = i + 1;
    this.draw();
  },

  generate_spike: function() {
    if (this.spike_pos[0] === null && this.spike_pos[1] === null) {
      return 1 + Math.floor(Math.random() * 6);
    } else {
      return null;
    }
  },

  clear_spike: function (row) {
    for (var col = 0; col < this.columns.length; col++) {
      if (this.columns[col][row] == "spike")
        this.columns[col][row] = null;
    }
  },

  add_spike: function (row, size) {
    for (var col = 0; col < size; col++) {
      if (this.columns[col][row] === "dodo") {
        this.reset_game();
        throw "reset";
      }
      else {
      this.columns[col][row] = "spike";
      }
    }
    for (var col = size + 2; col < this.columns[0].length + 1; col++) {
      if (this.columns[col][row] === "dodo") {
        this.reset_game();
        throw "reset";
      }
      else {
      this.columns[col][row] = "spike";
      }
    }
  },

  add_score: function() {
    var i = this.dodo_pos;
    if (( i < (this.columns.length - 1) && this.columns[i + 1][6] === 'spike')
        || ( i > 0 && this.columns[i - 1][6] === 'spike')) {
      this.score++;
    }
  },

  update_column_spikes: function() {
    for (var row = 0; row < this.columns[0].length; row++) {
      if (this.spike_pos[row] < 1) {
        this.clear_spike(row);
      } else {
        this.add_spike(row, this.spike_pos[row]);
      }
    }
  },

  move_spikes_up: function () {
    this.spike_pos.pop();
    this.spike_pos.unshift(this.generate_spike());
    this.update_column_spikes();
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
    game.add_score();
    var your_score = document.getElementById("score");
    your_score.innerText = game.score;
    var your_high_score = document.getElementById("high_score");
    your_high_score.innerText = game.high_score;
  },

  image_for: function(value) {
    if (value === "dodo") {
      return "img/dodo.png";
    } else if (value === "spike") {
      return "img/gordo.png";
    } else {
      return "img/blue.png";
    }
  },

  reset_game: function() {
    this.time = 1000;
    if (this.score > this.high_score) {
      this.high_score = this.score;
    }
    this.score = 0;
    this.spike_pos = [null, null, null, null, null, null, null, null];
    this.move_spikes_up();
  },

  loop: function() {
    try {
      this.move_spikes_up();
      this.time = Math.max(this.time - 10, 480);
      this.score_count++;
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
