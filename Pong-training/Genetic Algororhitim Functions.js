
// Genetic Algorithm Functions

// Create the next generation
let genCounter = 0;
function nextGeneration() {
  genCounter++;
  console.log("data from gen: " + genCounter);
  console.log(`last one survived for: ${minutt} : ${sekund} : ${tiendedelsSekund}`);
  // reset clock;
  minutt = 0;
  sekund = 0;
  tiendedelsSekund = 0;

  // Calculate fitness values
  calculateFitness();

  // print info to console
  let fitness_liste = [];
  let score_liste = [];
  for (i = 0; i < savedRekkerter.length; i++){
    fitness_liste.push(savedRekkerter[i].fitness);
    score_liste.push(savedRekkerter[i].score);
  }
  let fitnessSum = 0;
  let scoreSum = 0;
  for (i = 0; i < fitness_liste.length; i++){
    fitnessSum += fitness_liste[i];
    scoreSum += score_liste[i]
  }
  console.log("average fitness: " + fitnessSum/fitness_liste.length + " average score: " + scoreSum/score_liste.length);
  console.log("best fitness:    " + Math.max(...fitness_liste) + "  best score:    " + Math.max(...score_liste));



  // Create new population
  for (let i = 1; i < TOTAL; i += 1) {
    rekkerter[i] = reproduce();
    balls[i] = new Ball();
  }

  // Release all the memory
  for (let i = 0; i < TOTAL - 1; i += 1) {
    savedRekkerter[i].brain.dispose();
  }
  // Clear the array
  savedRekkerter = [];
}

// Create a child bird from two parents
function reproduce() {
  const brainA = pickOne();
  const brainB = pickOne();
  const childBrain = brainA.crossover(brainB);
  childBrain.mutate(0.1);
  return new Rekkert(childBrain);
}

// Pick one parent probability according to normalized fitness
function pickOne() {
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r -= savedRekkerter[index].fitness;
    index += 1;
  }
  index -= 1;
  const rekkert = savedRekkerter[index];
  return rekkert.brain;
}

// this was a test
// function pickBest(index) {
//   savedRekkerter.sort(function(a, b){return b.fitness-a.fintness});
//   return savedRekkerter[index].brain;
// }

// Normalize all fitness values
function calculateFitness() {
  // make scores under 0 to be 0
  for (const rekkert of savedRekkerter) {
    if (rekkert.score < 0){
      rekkert.score = 0;
    }
  }
  
  let sum = 0;
  for (const rekkert of savedRekkerter) {
    sum += rekkert.score;
  }
  for (const rekkert of savedRekkerter) {
    rekkert.fitness = rekkert.score / sum;
  }
}
