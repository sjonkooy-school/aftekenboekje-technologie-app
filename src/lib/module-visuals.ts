const visuals: Record<string, { icon: string; accent: string }> = {
  Robomind: { icon: "robot-grid", accent: "#4de0ff" },
  "Virtual Reality": { icon: "vr", accent: "#8a7cff" },
  Cubism: { icon: "cubes", accent: "#ff7fb8" },
  Gadgeteer: { icon: "chain", accent: "#ffb84c" },
  "Gravity Lab": { icon: "orbit", accent: "#9dff7a" },
  Multibrush: { icon: "brush", accent: "#ff6fd8" },
  Arkio: { icon: "architecture", accent: "#48e0b8" },
  Robots: { icon: "robot", accent: "#4de0ff" },
  "3D ontwerpen": { icon: "3d", accent: "#ffc857" },
  "Coaster Mania": { icon: "coaster", accent: "#ff7c5c" },
  "Some Assembly Required": { icon: "assembly", accent: "#9dff7a" },
  "Drone VR": { icon: "drone", accent: "#78a8ff" },
  "Virtual Techlab": { icon: "chip", accent: "#20d6a2" },
  "We Are One": { icon: "clone", accent: "#c98cff" },
  "Programmer VR": { icon: "code", accent: "#4de0ff" }
};

export function getModuleVisual(title: string) {
  return visuals[title] ?? { icon: "app", accent: "#20d6a2" };
}
