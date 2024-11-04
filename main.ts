type CataLogType = "creational" | "structural" | "behavioral";
type CreationalDPType =
  | "factory"
  | "abstract-factory"
  | "builder"
  | "prototype"
  | "singleton"
  | "adapter";
type CreationalSTType = "adapter";
const catalogType: CataLogType = "structural";
const dpType: CreationalDPType = "adapter";

async function main() {
  try {
    const module = await import(`./${catalogType}-patterns/${dpType}`);
    module.main();
  } catch (error) {
    console.error(error); // Write to stderr, log writes to stdout
  }
}

main();
