export default {
  branches: [
    "main",
    { name: "v2", range: "2.x", channel: "2.x" },
    { name: "v3", range: "3.x", channel: "3.x" }
  ],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/npm",

    [
      "@semantic-release/github",
      // Workaround for rate limit issue on github
      // https://github.com/semantic-release/semantic-release/issues/2204#issuecomment-2154938064
      {
        assets: [
          {
            path: "no-draco-models.zip",
            label: "Uncompressed 3D Models (No Draco)",
          },
        ],
        successComment: false,
        failTitle: false,
      },
    ],
  ],
}
