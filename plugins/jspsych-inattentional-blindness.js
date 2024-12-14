//Create New Canvas
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

class IB_Shape {
    constructor(posX, posY, color, dX, dY, thickness, width, vertical_limit, min_speed, max_speed, canvas) {
        this.posX = posX;
        this.posY = posY;
        this.color = color;
        this.width = width;
        this.boxLeft = 0;
        this.boxRight = canvas.width;
        this.boxTop = canvas.height / 2 - vertical_limit;
        this.boxBottom = canvas.height / 2 + vertical_limit - this.width;
        this.vel = 0;
        this.cmVel = Math.floor((Math.random() * 5) + 3);
        this.dY = dY;
        this.dX = dX;
        this.speedSwitchTime = ((Math.random() * (4000 - 3000)) + 3000)
        this.newSpeedStartTime = new Date().getTime();
        this.thickness = thickness;
        this.height = canvas.height;
        this.canvas = canvas;
        this.shapeType = "Shape";
        this.passedLineCount = 0;
        this.min_speed = min_speed;
        this.max_speed = max_speed;
    }

    move() {
        let newX = this.posX;
        let newY = this.posY;
        let newDx = this.dX;
        let newDy = this.dY;

        // If the shape is outside the canvas, move it back in and reverse its direction
        if (this.posX > this.boxRight - this.width) {
            newX = this.boxRight - this.width;
            newDx *= -1;
        } else if (this.posX < this.boxLeft) {
            newX = this.boxLeft;
            newDx *= -1;
        }

        if (this.posY > this.boxBottom) {
            newY = this.boxBottom;
            newDy *= -1;
        } else if (this.posY < this.boxTop) {
            newY = this.boxTop;
            newDy *= -1;
        }

        this.time = new Date().getTime();
        this.newSpeedTime = this.time - this.newSpeedStartTime;

        // Change speed
        if (this.newSpeedTime >= this.speedSwitchTime) {
            this.newSpeedStartTime = new Date().getTime();
            this.cmVel = ((Math.random() * (this.max_speed - this.min_speed)) + this.min_speed) / 60;
            if ((this.posY < this.boxBottom) && (this.posY > this.boxTop) &&
                (this.posX > this.boxLeft) && (this.posX < this.boxRight)) {
                newDx *= Math.random() < 0.5 ? -1 : 1; // Random direction for horizontal movement (-1 to 1)
                newDy *= Math.random() < 0.5 ? -1 : 1;
            }
        }

        // Limit speed between min_speed and max_speed
        this.vel = this.cmVel;
        if (this.vel < (this.min_speed / 60)) { // Convert min_speed from pixels per second to pixels per frame
            this.vel = this.min_speed / 60;
        } else if (this.vel > (this.max_speed / 60)) { // Convert max_speed from pixels per second to pixels per frame
            this.vel = this.max_speed / 60;
        }

        newX += this.vel * newDx;
        newY += this.vel * newDy;

        if ((this.posY + this.width < this.canvas.height / 2) && (this.onTop != true)) {
            if (this.onBottom == true) {
                console.log("passed line", this.passedLineCount)
                this.passedLineCount++;
            }
            this.onTop = true;
            this.onBottom = false;
        }
        if ((this.posY > this.canvas.height / 2) && (this.onBottom != true)) {
            if (this.onTop == true) {
                console.log("passed line", this.passedLineCount)
                this.passedLineCount++;
            }
            this.onTop = false;
            this.onBottom = true;
        }

        this.posX = newX;
        this.posY = newY;
        this.dX = newDx;
        this.dY = newDy;
    }

    draw() { }
}

class L extends IB_Shape {
    constructor(posX, posY, color, dX, dY, thickness, width, vertical_limit, min_speed, max_speed, canvas) {
        super(posX, posY, color, dX, dY, thickness, width, vertical_limit, min_speed, max_speed, canvas)
        this.shapeType = "L";
    }

    move(line) {
        super.move();
        // Check if the L object intersects the line and hasn't passed it in this cycle
        // if (!this.hasPassedLine &&
        //     this.posY < line.posY + line.height &&
        //     this.posY + this.width > line.posY &&
        //     this.posX < line.posX + line.width &&
        //     this.posX + this.width > line.posX
        // ) {
        //     this.passedLineCount++; // Increment count
        //     this.hasPassedLine = true; // Set flag
        // } else if (this.hasPassedLine &&
        //     (this.posY >= line.posY + line.height ||
        //         this.posY + this.width <= line.posY ||
        //         this.posX >= line.posX + line.width ||
        //         this.posX + this.width <= line.posX)
        // ) {
        //     this.hasPassedLine = false; // Reset flag if no longer intersecting
        // }
    }

    draw(context) {
        this.bottomX = this.posX;
        this.bottomY = this.posY + this.width - this.thickness;
        this.topX = this.posX;
        this.topY = this.posY;
        context.save();
        context.fillStyle = this.color;
        context.fillRect(this.topX, this.topY, this.thickness,
            this.width - this.thickness);
        context.fillRect(this.bottomX, this.bottomY, this.width,
            this.thickness);
        context.restore();
    }
}

class T extends IB_Shape {
    constructor(posX, posY, color, dX, dY, thickness, width, vertical_limit, min_speed, max_speed, canvas) {
        super(posX, posY, color, dX, dY, thickness, width, vertical_limit, min_speed, max_speed, canvas);
        this.shapeType = "T";
    }

    move(line) {
        super.move();
        // Check if the T object intersects the line and hasn't passed it in this cycle
        // if (!this.hasPassedLine &&
        //     this.posY < line.posY + line.height &&
        //     this.posY + this.width > line.posY &&
        //     this.posX < line.posX + line.width &&
        //     this.posX + this.width > line.posX
        // ) {
        //     this.passedLineCount++; // Increment count
        //     this.hasPassedLine = true; // Set flag
        // } else if (this.hasPassedLine &&
        //     (this.posY >= line.posY + line.height ||
        //         this.posY + this.width <= line.posY ||
        //         this.posX >= line.posX + line.width ||
        //         this.posX + this.width <= line.posX)
        // ) {
        //     this.hasPassedLine = false; // Reset flag if no longer intersecting
        // }
    }

    draw(context) {
        this.topX = this.posX;
        this.topY = this.posY;
        this.bottomX = this.posX + this.width / 2 - this.thickness / 2;
        this.bottomY = this.posY + this.thickness;
        context.save();
        context.fillStyle = this.color;
        context.fillRect(this.topX, this.topY, this.width, this.thickness);
        context.fillRect(this.bottomX, this.bottomY, this.thickness, this.width - this.thickness);
        context.restore();
    }
}

class EnvShape {
    constructor(posX, posY, height, color) {
        this.posX = posX;
        this.posY = posY;
        this.height = height;
        this.color = color;
    }
}

class IB_Line extends EnvShape {
    constructor(posX, posY, height, color, width) {
        super(posX, posY, height, color);
        this.width = width;
    }

    draw(context) {
        context.save();
        context.fillStyle = this.color;
        context.fillRect(this.posX, this.posY, this.width, this.height);
        context.restore();
    }
}

class IB_Fixation extends EnvShape {
    constructor(posX, posY, height, color, thickness) {
        super(posX, posY, height, color);
        this.thickness = thickness;
    }

    draw(context) {
        context.save();
        context.beginPath();
        context.lineWidth = "3";
        context.strokeStyle = "#0000FF";
        context.fillStyle = "#777777";
        context.rect(this.posX, this.posY, this.thickness, this.thickness);
        context.stroke();
        context.fill();
        context.restore();
    }
}

class IB_Target {
    constructor(x, y, dx, target_width, target_thickness) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.target_width = target_width;
        this.target_thickness = target_thickness;
        this.cmVel = 3;
        this.color = "#b2b2b2";
        this.draw = function (context) {
            context.save();
            context.fillStyle = this.color;
            context.fillRect(
                this.x + (this.target_width / 2) - (this.target_thickness / 2),
                this.y,
                this.target_thickness,
                this.target_width
            );
            context.fillRect(
                this.x,
                this.y + (this.target_width / 2) - (this.target_thickness / 2),
                this.target_width,
                this.target_thickness
            );
            context.restore();
        };
        this.move = function () {
            this.x += this.cmVel * this.dx;
        };
    }
}

function get_IB_target(target_position, frame_width, frame_height, target_width, cm, target_thickness) {
    let x, y, dx;

    switch (target_position) {
        case TARGET_POSITIONS.pvfar:
            x = frame_width;
            y = frame_height / 2 - cm * 5.9 - target_width / 2;
            dx = -1;
            break;
        case TARGET_POSITIONS.pfar:
            x = frame_width;
            y = frame_height / 2 - cm * 4.8 - target_width / 2;
            dx = -1;
            break;
        case TARGET_POSITIONS.pnear:
            x = frame_width;
            y = frame_height / 2 - cm * 2.4 - target_width / 2;
            dx = -1;
            break;
        case TARGET_POSITIONS.line:
            x = frame_width;
            y = frame_height / 2 - target_width / 2;
            dx = -1;
            break;
        case TARGET_POSITIONS.nnear:
            x = frame_width;
            y = frame_height / 2 + cm * 2.4 - target_width / 2;
            dx = -1;
            break;
        case TARGET_POSITIONS.nfar:
            x = frame_width;
            y = frame_height / 2 + cm * 4.8 - target_width / 2;
            dx = -1;
            break;
        case TARGET_POSITIONS.nvfar:
            x = frame_width;
            y = frame_height / 2 + cm * 5.9 - target_width / 2;
            dx = -1;
            break;
        default:
            // Handle unknown target_position values
            x = 0;
            y = 0;
            dx = -1;
            break;
    }

    return new IB_Target(x, y, dx, target_width, target_thickness);
}

const TARGET_POSITIONS = {
    pvfar: "pvfar",
    pfar: "pfar",
    pnear: "pnear",
    line: "line",
    nnear: "nnear",
    nfar: "nfar",
    nvfar: "nvfar"
}

jsPsych.plugins["inattentional-blindness"] = (function () {
    let plugin = {};

    plugin.info = {
        name: 'inattentional-blindness',
        description: 'Inattentional blindness task',
        parameters: {
            cm: {
                type: jsPsych.plugins.parameterType.INT,
                default: 43
            },
            background_color: {
                type: jsPsych.plugins.parameterType.STRING,
                default: "#777777"
            },
            show_target: {
                type: jsPsych.plugins.parameterType.BOOL,
                default: false
            },
            target_position: {
                type: jsPsych.plugins.parameterType.INT,
                default: 0
            },
            target_shape: {
                type: jsPsych.plugins.parameterType.STRING,
                default: "T"
            },
            target_shape_color: {
                type: jsPsych.plugins.parameterType.STRING,
                default: "green"
            },
            distractors_shapes: {
                type: jsPsych.plugins.parameterType.COMPLEX,
                default: ["L", "T"]
            },
            distractors_shape_colors: {
                type: jsPsych.plugins.parameterType.COMPLEX,
                default: ["red", "blue"]
            },
            distractors_count: {
                type: jsPsych.plugins.parameterType.INT,
                default: 2,
                description: 'Number of distractors total, must be even.'
            },
            distractor_width: {
                type: jsPsych.plugins.parameterType.INT,
                default: 43
            },
            shape_size: {
                type: jsPsych.plugins.parameterType.INT,
                default: 100
            },
            frame_width: {
                type: jsPsych.plugins.parameterType.INT,
                default: 666,
                description: 'Width of the frame in pixels.'
            },
            frame_height: {
                type: jsPsych.plugins.parameterType.INT,
                default: 546,
                description: 'Height of the frame in pixels.'
            },
            frame_time: {
                type: jsPsych.plugins.parameterType.INT,
                default: 33,
                description: 'frameTime of 33 results in FPS of 30.'
            },
            trial_duration: {
                type: jsPsych.plugins.parameterType.INT,
                default: 15000
            },
            trial_waiting_time: {
                type: jsPsych.plugins.parameterType.INT,
                default: 1000
            },
            target_width: {
                type: jsPsych.plugins.parameterType.INT,
                default: 43
            },
            target_thickness: {
                type: jsPsych.plugins.parameterType.INT,
                default: 5
            },
            line_height: {
                type: jsPsych.plugins.parameterType.INT,
                default: 2
            },
            min_speed: {
                type: jsPsych.plugins.parameterType.INT,
                default: 90,
                description: 'Minimum speed of the shapes in pixels per second.'
            },
            max_speed: {
                type: jsPsych.plugins.parameterType.INT,
                default: 180,
                description: 'Maximum speed of the shapes in pixels per second.'
            }
        }
    };

    plugin.trial = function (display_element, trial) {
        // Clear previous
        display_element.innerHTML = '';
        setTimeout(function () {
            // Start timing for within trial ITI
            display_element.innerHTML = '';
            // Set up canvas
            window.requestAnimationFrame = function (callback) {
                return window.setTimeout(callback, trial.frame_time);
            }
            window.cancelAnimationFrame = window.clearTimeout;

            // Hide mouse
            document.body.style.cursor = "none";

            // this array holds handlers from setTimeout calls
            // that need to be cleared if the trial ends early
            let setTimeoutHandlers = [];

            // store response
            let response = {
                rt: -1,
                count: 0,
                key: -1
            };

            const frame_width = Number(trial.frame_width);
            const frame_height = Number(trial.frame_height);
            const distractor_width = Number(trial.distractor_width);
            const cm = Number(trial.cm);

            const frame_canvas = CreateNewCanvas('frame_canvas', 'frame_canvas',
                frame_width, frame_height, "block", "visible");
            frame_canvas.style.backgroundColor = trial.background_color;

            display_element.append(frame_canvas);

            const frame_context = frame_canvas.getContext("2d");
            const distractor_vertical_limit = frame_height / 2
            const top_limit = frame_height / 2 - distractor_vertical_limit
            const bottom_limit = frame_height / 2 + distractor_vertical_limit - distractor_width
            const distractor_thickness = Math.round(0.25 * cm)
            const target_width = Number(trial.target_width);

            function get_distractors() {
                let distractors = [];
                var positions = [];
                for (i = 0; i < trial.distractors_count; i++) {
                    var xDir = 1;
                    if (Math.random() * 10 > 5) {
                        xDir *= -1
                    }
                    valid_position = false;
                    let x = 0
                    let y = 0
                    while (!valid_position) {
                        valid_position = true;

                        x = Math.floor(Math.random() * (frame_width - distractor_width));
                        y = Math.floor(Math.random() * (frame_width - distractor_width));

                        positions.forEach(function (element) {
                            var xDist = x - element[0],
                                yDist = y - element[1],
                                distractor_distance = Math.sqrt((xDist * xDist) + (yDist * yDist));
                            if (distractor_distance < trial.distractor_width * 2) {
                                valid_position = false;
                            }
                            else if ((x < trial.distractor_width * 2) || (y < trial.distractor_width * 2)) {
                                valid_position = false;
                            }
                        });

                        if ((y < top_limit) || (y > bottom_limit)) {
                            valid_position = false;
                        }
                        else if ((y + distractor_width > frame_height / 2 - distractor_width * 3) &&
                            (y < frame_height / 2 + distractor_width * 3)) {
                            valid_position = false
                        }
                        if (y > frame_canvas.height / 2) {
                            yDir = -1
                        }
                        else {
                            yDir = 1
                        }
                    }

                    if (i % 2 == 0) {
                        color = "#FFFFFF";
                    }
                    else {
                        color = "#000000";
                    }
                    positions.push([x, y]);
                    if (i >= trial.distractors_count / 2) {
                        distractors.push(new T(x, y, color, xDir, yDir, distractor_thickness, distractor_width, distractor_vertical_limit, trial.min_speed, trial.max_speed, frame_canvas));
                    }
                    else {
                        distractors.push(new L(x, y, color, xDir, yDir, distractor_thickness, distractor_width, distractor_vertical_limit, trial.min_speed, trial.max_speed, frame_canvas));
                    }
                }

                return distractors;
            }

            const distractors = get_distractors();

            const target = trial.show_target ? get_IB_target(
                trial.target_position,
                frame_width,
                frame_height,
                target_width,
                cm,
                distractor_thickness
            ) : undefined;

            const line_height = Number(trial.line_height);
            const line = new IB_Line(
                0,
                frame_canvas.height / 2 - line_height,
                line_height,
                "#0000FF",
                frame_canvas.width
            );
            const fixation = new IB_Fixation(
                frame_canvas.width / 2 - distractor_thickness / 2,
                frame_canvas.height / 2 - distractor_thickness / 2,
                line_height,
                "#0000FF",
                distractor_thickness
            );

            let trial_start_time = 0;

            function run_animation_loop() {
                // Clear the canvas
                frame_context.clearRect(0, 0, frame_width, frame_height);


                let current_time = new Date().getTime();

                // Check the condition for showing the target
                if (trial.show_target && ((current_time - trial_start_time) >= 5000)) {
                    // Move and draw the target
                    target.move(line);
                    target.draw(frame_context);
                }

                // Move and draw distractors
                distractors.forEach(function (distractor) {
                    distractor.move(line); // Move the shape and check for collisions with others
                    distractor.draw(frame_context); // Draw the shape
                });

                line.draw(frame_context);
                fixation.draw(frame_context)

                animation = window.requestAnimationFrame(run_animation_loop);
            }


            //Function for start experiment
            const start_trial = function () {
                // start the response listener
                if (JSON.stringify(trial.choices) !== JSON.stringify(["none"])) {
                }

                frame_context.clearRect(0, 0, frame_canvas.width, frame_canvas.height);

                setTimeout(function () {
                    trial_start_time = new Date().getTime();
                    run_animation_loop();
                }, trial.trial_waiting_time);

                setTimeout(function () {
                    window.cancelAnimationFrame(animation);
                    frame_context.clearRect(0, 0, frame_canvas.width, frame_canvas.height);
                    end_trial();
                }, trial.trial_duration + trial.trial_waiting_time);
            };

            // function to handle responses by the subject
            let after_response = function (info) {
                // only record the first response
                if (response.key === -1) {
                    response = info;
                }
                end_trial();
            };

            const get_hit_count = function () {
                white_count = 0;
                black_count = 0;
                distractors.forEach(function (distractor) {
                    if (distractor.color === "#FFFFFF") {
                        white_count += distractor.passedLineCount;
                    }
                    else {
                        black_count += distractor.passedLineCount;
                    }
                });
                return [white_count, black_count];
            };

            const end_trial = function () {
                let i;

                // kill any remaining setTimeout handlers
                for (i = 0; i < setTimeoutHandlers.length; i++) {
                    clearTimeout(setTimeoutHandlers[i]);
                }

                // kill keyboard listeners
                if (typeof keyboardListener !== 'undefined') {
                    jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
                }

                // clear the display
                display_element.innerHTML = '';

                hits = get_hit_count();
                white_hit_count = hits[0];
                black_hit_count = hits[1];

                trial_data = {
                    "white_hit_count": white_hit_count,
                    "black_hit_count": black_hit_count,
                    "is_target": trial.show_target,
                    "target_position": trial.target_position,
                }

                // Add the mouse again
                document.body.style.cursor = "pointer"

                // move on to the next trial
                setTimeout(function () {
                    jsPsych.finishTrial(trial_data);
                }, 10);
            };

            start_trial();
        }, 10);
    };

    return plugin;
})();