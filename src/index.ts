import World from './classes/world';

function main() {
  const world = new World();
  world.initialize();
  world.tick();
}
main();