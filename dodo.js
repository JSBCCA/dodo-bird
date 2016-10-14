// image replace on left/right movement
// move pipes
// randomly generate pipes in correct position
// collision
// reset on collision
// show score?


var game = {
  dodo_pos: 4,
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
    this.draw();
  },

  move_dodo_right: function () {
    var i = this.dodo_pos;
    this.columns[i][6] = null;
    this.columns[i + 1][6] = "dodo";
    this.draw();
  },

  draw: function () {
    for i in columns:
      for j in columns:
          item = $('#tablecenter').children("div")[i]
          kid = item.children("img")[j]
          kid.attr("src", "img/???.png")
}}

