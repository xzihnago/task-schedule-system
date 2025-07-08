module.exports = {
  apps: [
    {
      name: "task-schedule-system",
      script: "src/index.ts",
      interpreter: "node",
      interpreterArgs: "--import tsx",
    },
  ],
};
