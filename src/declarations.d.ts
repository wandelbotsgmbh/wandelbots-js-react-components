declare module "*.glb" {
  const content: string
  export default content
}

// Type for svg imports handled by vite config
declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}