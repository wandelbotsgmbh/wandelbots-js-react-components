import os


def get_robot_model_files(root_dir: str) -> list[tuple[str, str]]:
  model_files = []
  for root , _, files in os.walk(root_dir):
    model_files += [(root, file.removesuffix(".tsx")) for file in files if file.endswith(".tsx")]
  return model_files


def write_newline(file, count=1):
  file.write("\n" * count)

def write_disclaimer(file):
  file.write("// This file has been automatically generated using 'npm run build:models'")
  write_newline(file)
  file.write("// DO NOT MODIFY")
  write_newline(file, 2)


def generated_robot_models_types(robot_dir: str, models: list[tuple[str, str]]):
  model_names = [model[1] for model in models]
  with open(f"{robot_dir}/getRobotModel.ts", "w") as model_file:
    # Disclaimer comments
    write_disclaimer(model_file)
    

    # Import statements
    for model_path, model_name in models:
      model_file.write(f"import {{ {model_name} }} from \"./{model_path.removeprefix(f"{robot_dir}/")}/{model_name}\"\n")

    write_newline(model_file, 2)
    
    # SupportedRobotModel Type def
    model_file.write(f"export type SupportedRobotModel = {" | ".join([f"\"{name}\"" for name in model_names])}")

    write_newline(model_file, 2)

    # getRobotModel function
    model_file.write("export function getRobotModel(modelName: SupportedRobotModel) {")
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

def generated_robot_models_stories(models: list[tuple[str, str]], stories_dir: str):
  template_story_content = None

  with open("scripts/robots/RobotStoryTemplate.stories.tsx", "r") as template_story_file:
     template_story_content = "".join(template_story_file.readlines())

  if not template_story_content:
    raise FileNotFoundError("Story template not found")
  
  for model_path, model_name in models:
    story_file_name = f"{stories_dir}/{model_name}.stories.tsx"
    os.makedirs(os.path.dirname(story_file_name), exist_ok=True)
    with open(story_file_name, "w") as story_file:
      # Disclaimer comments
      write_disclaimer(story_file)
      story_content = template_story_content
      story_content = story_content.replace("{{PAGE_TITLE}}", f"3D View/Robot/Supported Models/{model_name}")
      story_content = story_content.replace("{{ROBOT_MODEL_NAME}}", model_name)
      
      # TODO might put a dh params file alongside the robot model
      story_content = story_content.replace("{{DH_PARAMETERS}}", "[]")
      story_file.write(story_content)


if __name__ == "__main__":

  robot_dir = "src/components/robots"

  models = get_robot_model_files(f"{robot_dir}/models")
  generated_robot_models_types(robot_dir=robot_dir, models=models)
  generated_robot_models_stories(models=models, stories_dir="stories/robots")

  
