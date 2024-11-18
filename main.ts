type CataLogType = "creational" | "structural" | "behavioral";
type CreationalType =
  | "factory"
  | "abstract-factory"
  | "builder"
  | "prototype"
  | "singleton"
  | "adapter"
  | "bridge"
  | "composite"
  | "decorator"
  | "facade"
  | "flyweight"
  | "proxy"
  | "responsibility"
  | "command"
  | "iterator"
  | "mediator"
  | "memento";
const catalogType: CataLogType = "behavioral";
const dpType: CreationalType = "memento";

// You can make either paramaterised way or function way for any operations.
async function main() {
  try {
    const module = await import(`./${catalogType}-patterns/${dpType}`);
    module.main();
  } catch (error) {
    console.error(error); // Write to stderr, log writes to stdout
  }
}

main();
// Usually the need for patterns arises when people choose a programming language or a
// technology that lacks the necessary level of abstraction. In this case, patterns become
// a kludge that gives the language much-needed super-abilities. - refactoring.guru
//
// "If all you have is a hammer, everything looks like a nail."
// This is the problem that haunts many novices who have just familiarized themselves
// with patterns. Having learned about patterns, they try to apply them everywhere, even
// in situations where simpler code would do just fine. - refactoring.guru
