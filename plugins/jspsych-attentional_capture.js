/**
 *
 * jspsych-attentional-capture
 * Nadav Weisler
 *
 * display a set of objects, with or without a target, equidistant from fixation
 * subject responds to whether or not the target is present
 *
 * based on baed on Josh de Leeuw's jspsych-visual-search-circle plugin
 *
 *
 **/
class VisualSearchShape {
  constructor() {
    this.type = "VisualSearchShape";
  }

  set_border_color(border_color) {
    this.border_color = border_color;
  }

  set_location(x, y) {
    this.x = x;
    this.y = y;
  }

  set_line_angle(angle) {
    this.angle = angle;
  }

  set_size(width, height) {
    this.width = width;
    this.height = height;
  }

  draw(ctx) {
    // Abstract method for drawing a generic shape
  }

  drawLineSegment(ctx, startX, startY, endX, endY) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

class VisualSearchCircle extends VisualSearchShape {
  constructor() {
    super();
    this.type = "circle";
  }

  set_size(width, height) {
    super.set_size(width, height);
    this.radius = this.width / 2;
  }

  draw(ctx) {
    let lineStartX, lineStartY, lineEndX, lineEndY;
    if (this.angle === 90) {
      lineStartX = this.x;
      lineStartY = this.y - (this.radius / 2);
      lineEndX = this.x;
      lineEndY = this.y + (this.radius / 2);
    } else {
      lineStartX = this.x - (this.radius / 2) * Math.cos(this.angle);
      lineStartY = this.y - (this.radius / 2) * Math.sin(this.angle);
      lineEndX = this.x + (this.radius / 2) * Math.cos(this.angle);
      lineEndY = this.y + (this.radius / 2) * Math.sin(this.angle);
    }

    // Draw the circle border
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = this.border_color;
    ctx.stroke();
    ctx.closePath();

    super.drawLineSegment(ctx, lineStartX, lineStartY, lineEndX, lineEndY);
  }
}

class VisualSearchDiamond extends VisualSearchShape {
  constructor() {
    super();
    this.type = "diamond";
  }

  draw(ctx) {
    let lineStartX, lineStartY, lineEndX, lineEndY;
    if (this.angle === 90) {
      lineStartX = this.x;
      lineStartY = this.y - (this.height / 4);
      lineEndX = this.x;
      lineEndY = this.y + (this.height / 4);
    } else {
      lineStartX = this.x - (this.width / 4) * Math.cos(this.angle);
      lineStartY = this.y - (this.height / 4) * Math.sin(this.angle);
      lineEndX = this.x + (this.width / 4) * Math.cos(this.angle);
      lineEndY = this.y + (this.height / 4) * Math.sin(this.angle);
    }

    // Draw the diamond border
    ctx.beginPath();
    ctx.moveTo(this.x - this.width / 2, this.y);
    ctx.lineTo(this.x, this.y - this.height / 2);
    ctx.lineTo(this.x + this.width / 2, this.y);
    ctx.lineTo(this.x, this.y + this.height / 2);
    ctx.closePath();
    ctx.strokeStyle = this.border_color;
    ctx.stroke();

    super.drawLineSegment(ctx, lineStartX, lineStartY, lineEndX, lineEndY);
  }
}

class VisualSeachTriangle extends VisualSearchShape {
  constructor() {
    super();
    this.type = "triangle";
  }

  draw(ctx) {
    let lineStartX, lineStartY, lineEndX, lineEndY;
    if (this.angle === 90) {
      lineStartX = this.x;
      lineStartY = this.y - (this.height / 4);
      lineEndX = this.x;
      lineEndY = this.y + (this.height / 4);
    } else {
      lineStartX = this.x - (this.width / 4) * Math.cos(this.angle);
      lineStartY = this.y - (this.height / 4) * Math.sin(this.angle);
      lineEndX = this.x + (this.width / 4) * Math.cos(this.angle);
      lineEndY = this.y + (this.height / 4) * Math.sin(this.angle);
    }

    // Draw the triangle border
    ctx.beginPath();
    ctx.moveTo(this.x - this.width / 2, this.y + this.height / 2);
    ctx.lineTo(this.x, this.y - this.height / 2);
    ctx.lineTo(this.x + this.width / 2, this.y + this.height / 2);
    ctx.closePath();
    ctx.strokeStyle = this.border_color;
    ctx.stroke();

    super.drawLineSegment(ctx, lineStartX, lineStartY, lineEndX, lineEndY);
  }
}

class VisualSearchSquare extends VisualSearchShape {
  constructor() {
    super();
    this.type = "square";
  }

  draw(ctx) {
    let lineStartX, lineStartY, lineEndX, lineEndY;
    if (this.angle === 90) {
      lineStartX = this.x;
      lineStartY = this.y - (this.height / 4);
      lineEndX = this.x;
      lineEndY = this.y + (this.height / 4);
    } else {
      lineStartX = this.x - (this.width / 4) * Math.cos(this.angle);
      lineStartY = this.y - (this.height / 4) * Math.sin(this.angle);
      lineEndX = this.x + (this.width / 4) * Math.cos(this.angle);
      lineEndY = this.y + (this.height / 4) * Math.sin(this.angle);
    }

    // Draw the square border
    ctx.beginPath();
    ctx.moveTo(this.x - this.width / 2, this.y - this.height / 2);
    ctx.lineTo(this.x + this.width / 2, this.y - this.height / 2);
    ctx.lineTo(this.x + this.width / 2, this.y + this.height / 2);
    ctx.lineTo(this.x - this.width / 2, this.y + this.height / 2);
    ctx.closePath();
    ctx.strokeStyle = this.border_color;
    ctx.stroke();

    super.drawLineSegment(ctx, lineStartX, lineStartY, lineEndX, lineEndY);
  }
}

function getShapeFromName(name) {
  if (name === "circle") {
    return new VisualSearchCircle();
  } else if (name === "diamond") {
    return new VisualSearchDiamond();
  } else if (name === "triangle") {
    return new VisualSeachTriangle();
  } else if (name === "square") {
    return new VisualSearchSquare();
  } else {
    throw new Error("Invalid shape name");
  }
}

function deepCopy(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    // If the object is an array, create a new array and copy each element
    return obj.map(deepCopy);
  }

  // If the object is a regular object, create a new object and copy each property
  const newObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepCopy(obj[key]);
    }
  }

  return newObj;
}

class FixationCross {
  constructor(size, x, y, color) {
    this.size = size;
    this.x = x;
    this.y = y;
    this.color = color;
  }

  draw(ctx) {
    // Set the color to white
    ctx.fillStyle = this.color;

    // Calculate cross line width and height
    const lineWidth = 3; // Adjust line width as needed
    const halfSize = this.size / 2;

    // Draw horizontal line
    ctx.fillRect(this.x - halfSize, this.y - lineWidth / 2, this.size, lineWidth);

    // Draw vertical line
    ctx.fillRect(this.x - lineWidth / 2, this.y - halfSize, lineWidth, this.size);
  }
}

function CreateNewCanvas(_id, _className, _width, _height, _position, _visibility) {
  let newCanvas = document.createElement('canvas');
  newCanvas.id = _id;
  newCanvas.className = _className;
  newCanvas.width = _width;
  newCanvas.height = _height;
  newCanvas.style.position = _position;
  newCanvas.style.visibility = _visibility;
  return newCanvas;
}

function GetDistractorsLocations(set_size, frame_size, radius) {
  function cosd(num) {
    return Math.cos(num / 180 * Math.PI);
  }

  function sind(num) {
    return Math.sin(num / 180 * Math.PI);
  }

  let display_locations = [];
  const random_offset = Math.floor(Math.random() * 360);
  for (let i = 0; i < set_size; i++) {
    display_locations.push([
      Math.floor(frame_size / 2 + (cosd(random_offset + (i * (360 / set_size))) * radius)),
      Math.floor(frame_size / 2 - (sind(random_offset + (i * (360 / set_size))) * radius))
    ]);
  }
  return display_locations;
}

jsPsych.plugins["attentional-capture"] = (function () {
  var plugin = {};

  plugin.info = {
    name: 'attentional-capture',
    description: '',
    parameters: {
      target_shape: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Target shape',
        default: "diamond",
        description: 'The shape of the target to be searched for.'
      },
      distractor_shape: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Distractor shape',
        default: "circle",
        description: 'The shape of the distractors.'
      },
      distractor_shapes: {
        type: jsPsych.plugins.parameterType.COMPLEX,
        pretty_name: 'Distractor shapes',
        default: ["diamond", "triangle", "square", "octagon"],
        array: true,
        description: 'The shapes of the distractors.'
      },
      set_size: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Set size',
        default: 5,
        description: 'How many items should be displayed?'
      },
      circle_diameter: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Circle diameter',
        default: 100,
        description: 'The diameter of the search array circle in milliseconds.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'The maximum duration to wait for a response.'
      },
      fixation_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Fixation duration',
        default: 1000,
        description: 'How long to show the fixation image for before the search array (in milliseconds).'
      },
      fixation_size: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Fixation size',
        default: 12.5,
        description: 'The height or width of the fixation image (in cm).'
      },
      stimuli_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimuli width',
        default: 30,
        description: 'The width of the stimuli (in cm).'
      },
      stimuli_height: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimuli height',
        default: 30,
        description: 'The height of the stimuli (in cm).'
      },
      line_degrees: {
        type: jsPsych.plugins.parameterType.COMPLEX,
        pretty_name: 'Line degrees',
        default: [90, 0],
        description: 'The degrees of the line.'
      },
      distractor_exist: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Distractor exist',
        default: true,
        description: 'Whether or not to show distractors.'
      },
      color: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Color',
        default: 'red',
        description: 'The color of the stimuli.'
      },
      distractor_color: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Distractor color',
        default: 'green',
        description: 'The color of the distractors.'
      },
      choices: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        array: true,
        pretty_name: 'Choices',
        default: ['f', 'j'],
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
      },
      fixation_color: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Fixation color',
        default: 'white',
        description: 'The color of the fixation cross.'
      }
    }
  }

  plugin.trial = function (display_element, trial) {
    // clear display element and apply default page styles
    function clear_display() {
      display_element.innerHTML = '';
    }

    function shuffle(array) {
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle...
      while (currentIndex != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }

      return array;
    }

    clear_display();

    // Hide mouse
    document.body.style.cursor = "none";

    // Get cm per pixel
    const cm = Number(document.getElementById("dpiDiv").clientHeight);

    // Get the diameter of the circle
    const diameter = Number(trial.circle_diameter) * cm;

    // Get the radius of the circle
    const radius = diameter / 2;

    // Get the width and height of the stimuli in cm
    const stimuli_width = Number(trial.stimuli_width * cm);
    const stimuli_height = Number(trial.stimuli_height * cm);

    const target_angle = trial.line_degrees[Math.round(Math.random())];

    const distractor_angle = trial.line_degrees[Math.round(Math.random())];

    // Get the frame size in cm
    const frame_size = diameter + stimuli_width;

    // Get the set size
    const set_size = Number(trial.set_size);

    // Create the frame canvas
    const frame_canvas = CreateNewCanvas('frame_canvas', 'frame_canvas',
      frame_size, frame_size, "block", "visible");

    // Append the frame canvas to the display element
    display_element.append(frame_canvas);

    // Get the frame context
    const frame_context = frame_canvas.getContext("2d");

    // Get the display locations
    const display_locations = GetDistractorsLocations(set_size, frame_size, radius);

    // show fixation
    const fixation_size = Number(trial.fixation_size * cm);
    const fixation = new FixationCross(fixation_size, frame_size / 2, frame_size / 2, trial.fixation_color);

    let shapes = [];

    let target_shape = getShapeFromName(trial.target_shape)
    target_shape.set_line_angle(target_angle);
    target_shape.set_border_color(trial.color);
    shapes.push(target_shape);

    const shuffled_distractor_shapes = shuffle(trial.distractor_shapes);

    for (let i = 0; i < trial.set_size - 1; i++) {
      let current_distractor_shape = getShapeFromName(shuffled_distractor_shapes[i % trial.distractor_shapes.length]);
      if (trial.distractor_exist && i === 0) {
        current_distractor_shape.set_border_color(trial.distractor_color);
        current_distractor_shape.set_line_angle(distractor_angle);
      } else {
        current_distractor_shape.set_border_color(trial.color);
        current_distractor_shape.set_line_angle(trial.line_degrees[Math.round(Math.random())]);
      }
      shapes.push(current_distractor_shape);
    }

    // Set the locations and sizes of the shapes
    for (let [index, location] of display_locations.entries()) {
      shapes[index].set_location(location[0], location[1]);
      shapes[index].set_size(stimuli_width, stimuli_height);
    }

    function start_trial() {
      // show fixation
      fixation.draw(frame_context);

      // start time
      jsPsych.pluginAPI.setTimeout(function () {
        for (let shape of shuffle(shapes)) {
          shape.draw(frame_context);
        }

        let trial_over = false;

        key_listener = jsPsych.pluginAPI.getKeyboardResponse({
          callback_function: after_response,
          valid_responses: trial.choices,
          rt_method: 'date',
          persist: false,
          allow_held_key: false
        });

        if (trial.trial_duration !== null) {
          jsPsych.pluginAPI.setTimeout(function () {

            if (!trial_over) {

              jsPsych.pluginAPI.cancelKeyboardResponse(key_listener);

              trial_over = true;

              var rt = null;
              var key_press = null;

              clear_display();

              end_trial(rt, key_press);
            }
          }, trial.trial_duration);

        }

      }, trial.fixation_duration);
    }

    function after_response(info) {
      trial_over = true;

      clear_display();

      end_trial(info.rt, info.key);

    }

    function end_trial(rt, key_press) {
      const trial_data = {
        rt: rt,
        target_angle: target_angle,
        distractor_angle: distractor_angle,
        key_press: key_press,
        locations: JSON.stringify(display_locations),
        set_size: set_size
      };

      // go to next trial
      jsPsych.finishTrial(trial_data);
    }

    start_trial();
  };

  return plugin;
})();
