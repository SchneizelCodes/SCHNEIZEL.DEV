import bpy
import os

# Clean existing scene
bpy.ops.wm.read_factory_settings(use_empty=True)

root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
meteor_dir = os.path.join(root_dir, "meteor")

rock_folders = [
    ("moon_rock_01_4k.blend", "moon_rock_01"),
    ("moon_rock_02_4k.blend", "moon_rock_02"),
    ("moon_rock_03_4k.blend", "moon_rock_03"),
    ("moon_rock_05_4k.blend", "moon_rock_05"),
    ("moon_rock_06_4k.blend", "moon_rock_06"),
    ("moon_rock_07_4k.blend", "moon_rock_07"),
]

imported_objects = []

for folder_name, rock_id in rock_folders:
    blend_path = os.path.join(meteor_dir, folder_name, folder_name)
    if not os.path.exists(blend_path):
        print(f"Skipping {blend_path}, not found.")
        continue

    print(f"Loading {blend_path}...")
    with bpy.data.libraries.load(blend_path, link=False) as (data_from, data_to):
        # Find mesh objects
        data_to.objects = [name for name in data_from.objects]

    # Link imported objects to scene collection
    for obj in data_to.objects:
        if obj and obj.type == 'MESH':
            # Look for LOD2 or main mesh
            if "LOD3" in obj.name or "LOD0" in obj.name or "LOD1" in obj.name:
                continue
            bpy.context.scene.collection.objects.link(obj)
            obj.name = rock_id
            
            # Decimate to lightweight web geometry
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            decimate = obj.modifiers.new(name="Decimate", type="DECIMATE")
            decimate.ratio = 0.08
            bpy.ops.object.modifier_apply(modifier="Decimate")
            
            # Normalize origin
            bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='BOUNDS')
            
            imported_objects.append(obj)
            break

print(f"Total imported rock designs: {len(imported_objects)}")
for obj in imported_objects:
    print(f"  Object: {obj.name}, Verts: {len(obj.data.vertices)}, Dimensions: {obj.dimensions}")

# Export combined collection to public/models/moon_rocks.glb
output_path = os.path.join(root_dir, "public", "models", "moon_rocks.glb")
bpy.ops.export_scene.gltf(
    filepath=output_path,
    export_format='GLB',
    export_materials='NONE',
    use_selection=False
)
print(f"Successfully exported all moon rocks to {output_path}!")
