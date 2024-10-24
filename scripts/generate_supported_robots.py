import os


def get_robot_model_files(root_dir: str) -> list[tuple[str, str]]:
  model_files = []
  for root , _, files in os.walk(root_dir):
    model_files += [(root, file.removesuffix(".tsx")) for file in files if file.endswith(".tsx")]
  return model_files


def write_newline(file, count=1):
  file.write("\n" * count)


if __name__ == "__main__":

  models = get_robot_model_files("src/components/robots/models")
  model_names = [model[1] for model in models]

  with open("src/components/robots/getRobotModel.ts", "w") as model_file:
    # Disclaimer comments
    model_file.write("// This file has been automatically generated using 'npm run build:models'")
    write_newline(model_file)
    model_file.write("// DO NOT MODIFY")
    write_newline(model_file, 2)

    # Import statements
    for model_path, model_name in models:
      model_file.write(f"import {{ {model_name} }} from \"./{model_path.removeprefix("src/components/robots/")}/{model_name}\"\n")

    write_newline(model_file, 2)
    
    # SupportedRobotModel Type def
    model_file.write(f"export type SupportedRobotModel = {" | ".join([f"\"{name}\"" for name in model_names])}")

    write_newline(model_file, 2)

    # getSupportedRobot function
    model_file.write("export function getSupportedRobot(modelName: SupportedRobotModel) {")
    write_newline(model_file)
    model_file.write("switch(modelName) {")
    write_newline(model_file)
    for model_name in model_names:
      model_file.write(f"case \"{model_name}\": return {model_name}")
      write_newline(model_file)
    model_file.write("default: return null")
    write_newline(model_file)
    model_file.write("}")
    write_newline(model_file)
    model_file.write("}")
