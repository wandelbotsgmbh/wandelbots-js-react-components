export default {
  branches: ["main"],
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
