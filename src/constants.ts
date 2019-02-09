import Spring from "./classes/spring";
import Particle from "./classes/particle";

export const NUM_OBJECTS = 20;
export const NUM_SPRINGS = NUM_OBJECTS;
export const SPRING_K = 1000;
export const SPRING_D = 100;
export const Objects = new Array<Particle>(NUM_OBJECTS);
export const Springs = new Array<Spring>(NUM_SPRINGS);

export const THRUST_FORCE = 50;
export const STEERING_FORCE = 3;
export const MAX_THRUST = 300;
export const MIN_THRUST = 0;
export const DTHRUST = 10;
export const LINEAR_DRAG_COEFFICIENT = 1.25;
export const RHO = 1;
export const SPAWN_AREA = 50;
export const MAX_NUM_UNITS = 100;
export const NUM_OBSTACLES = 20;
export const OBSTACLE_RADIUS = 50;
export const GROUND_PLANE = 0;
export const RESTITUTION = .6;
export const EPS = .02;
export const RADIUS = 0;
export const FRICTION = .95;
export const TIME_INTERVAL = 30 / 1000;
export const GRAVITY_ACCELERATION = 9.8;
export const AIR_DENSITY = 1.23;
export const DRAG_COEFFICIENT = 0;
export const WIND_SPEED = 1;
export const WINDOW_HEIGHT = innerHeight;
export const WINDOW_WIDTH = innerWidth;
export const canvas = document.querySelector('canvas')
export const context: CanvasRenderingContext2D = canvas.getContext('2d')
canvas.width = innerWidth;
canvas.height = innerHeight;
// context.scale(1, -1);
// context.translate(0, -WINDOW_HEIGHT);