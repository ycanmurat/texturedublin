"""Editable illustrative wardrobe. Units: metres, Blender Z-up; GLB exports Y-up."""
import bpy, math, json
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public/models'; OUT.mkdir(parents=True,exist_ok=True)
bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete(use_global=False)
scene=bpy.context.scene; scene.unit_settings.system='METRIC'; scene.unit_settings.scale_length=1
product=bpy.data.collections.new('Texture Dublin - wardrobe concept');scene.collection.children.link(product)
def material(name,color,metal=0,rough=.5):
 m=bpy.data.materials.new(name);m.diffuse_color=(*color,1);m.use_nodes=True
 p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=(*color,1);p.inputs['Metallic'].default_value=metal;p.inputs['Roughness'].default_value=rough;return m
wood=material('Natural oak frame',(.52,.32,.15),rough=.48)
image=bpy.data.images.new('Oak grain',width=256,height=512,alpha=False)
pixels=[]
for y in range(512):
 v=y/512
 for x in range(256):
  u=x/256;grain=math.sin(u*125+math.sin(v*9)*2.1+math.sin(u*23+v*3))*.035+math.sin(u*370+v*4)*.012
  pixels.extend([.58+grain,.38+grain*.8,.21+grain*.6,1])
image.pixels=pixels;image.pack()
node=wood.node_tree.nodes.new('ShaderNodeTexImage');node.image=image;wood.node_tree.links.new(node.outputs['Color'],wood.node_tree.nodes['Principled BSDF'].inputs['Base Color'])
ivory=material('Warm ivory door finish',(.82,.79,.70),rough=.42)
inside=material('Oak interior',(.47,.32,.19),rough=.6)
metal=material('Graphite hardware',(.035,.042,.043),metal=.75,rough=.3)
objects=[]
def add_obj(obj):
 for c in list(obj.users_collection):c.objects.unlink(obj)
 product.objects.link(obj);objects.append(obj);return obj

def box(name,size,loc,mat,bevel=.003,parent=None):
 bpy.ops.mesh.primitive_cube_add(size=1,location=loc);o=add_obj(bpy.context.object);o.name=name;o.dimensions=size
 bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);o.data.materials.append(mat)
 if bevel:
  mod=o.modifiers.new('Soft manufactured edges','BEVEL');mod.width=bevel;mod.segments=3
  o.modifiers.new('Weighted corner normals','WEIGHTED_NORMAL')
 if parent:o.parent=parent
 return o
# 1800 wide x 2200 high x 600 deep. Back is +Y, front is -Y.
box('Recessed plinth',(1.68,.49,.09),(0,.025,.045),metal)
box('Left side',(.024,.6,2.11),(-.888,0,1.145),wood)
box('Right side',(.024,.6,2.11),(.888,0,1.145),wood)
box('Top',(1.8,.6,.024),(0,0,2.188),wood)
box('Bottom',(1.752,.56,.024),(0,-.008,.102),wood)
box('Back',(1.752,.012,2.06),(0,.288,1.145),inside,.001)
for x in [-.3,.3]:box('Internal divider',(.018,.56,2.06),(x,-.008,1.145),inside)
for x in [-.594,0,.594]:box('Upper storage shelf',(.57,.54,.018),(x,0,1.94),inside)
for z in [.48,.86,1.24,1.62]:box('Right adjustable shelf',(.57,.54,.018),(.594,0,z),inside)
for z in [.22,.40,.58]:box('Internal drawer',(.55,.52,.16),(0,-.01,z),inside)
bpy.ops.mesh.primitive_cylinder_add(vertices=24,radius=.012,depth=.54,location=(-.594,0,1.79),rotation=(0,math.pi/2,0));rail=add_obj(bpy.context.object);rail.name='Hanging rail';rail.data.materials.append(metal)
for i,cx in enumerate([-.598,0,.598]):
 root=bpy.data.objects.new(f'Door {i+1} hinge',None);product.objects.link(root);objects.append(root)
 hinge_x=cx+.291;root.location=(hinge_x,-.315,0)
 # Coordinates of door objects are local to the hinge.
 for name,size,loc in [
  ('Door slab',(.582,.023,2.05),(-.291,0,1.145)),
  ('Recessed door panel',(.464,.009,1.89),(-.291,-.016,1.145)),
  ('Left stile',(.045,.018,2.05),(-.559,-.022,1.145)),
  ('Right stile',(.045,.018,2.05),(-.023,-.022,1.145)),
  ('Top rail',(.492,.018,.06),(-.291,-.022,2.14)),
  ('Bottom rail',(.492,.018,.06),(-.291,-.022,.15))]:box(f'Door {i+1} {name}',size,loc,ivory,.002,root)
 box(f'Door {i+1} slim handle',(.012,.026,.29),(-.523,-.05,1.1),metal,.004,root)
 if i==2:root.rotation_euler.z=math.radians(34)
# Export only the product; lighting and floor belong to the editable preview scene.
bpy.ops.object.select_all(action='DESELECT')
for o in objects:o.select_set(True)
bpy.context.view_layer.objects.active=objects[0]
bpy.ops.export_scene.gltf(filepath=str(OUT/'wardrobe.glb'),export_format='GLB',use_selection=True,export_apply=True,export_yup=True)
# Neutral studio preview.
floor=material('Studio floor',(.86,.83,.77),rough=.9)
bpy.ops.mesh.primitive_plane_add(size=200,location=(0,0,-.004));bpy.context.object.data.materials.append(floor)
scene.world.color=(.5,.5,.5);scene.world.use_nodes=True;scene.world.node_tree.nodes['Background'].inputs[0].default_value=(.86,.83,.78,1);scene.world.node_tree.nodes['Background'].inputs[1].default_value=.5
for name,loc,power,size in [('Key',(-3,-4,5),650,4),('Fill',(3,-2,3.5),350,3),('Top',(1,3,5),600,3)]:
 bpy.ops.object.light_add(type='AREA',location=loc);o=bpy.context.object;o.name=name;o.data.energy=power;o.data.shape='DISK';o.data.size=size;o.rotation_euler=(Vector((0,0,1.1))-o.location).to_track_quat('-Z','Y').to_euler()
bpy.ops.object.camera_add(location=(3.3,-5.5,3.1));camera=bpy.context.object;camera.rotation_euler=(Vector((.05,0,1.1))-camera.location).to_track_quat('-Z','Y').to_euler();camera.data.type='ORTHO';camera.data.ortho_scale=3.3;scene.camera=camera
scene.render.engine='CYCLES';scene.cycles.device='CPU';scene.cycles.samples=24;scene.cycles.use_denoising=True
scene.render.resolution_x=850;scene.render.resolution_y=950;scene.render.resolution_percentage=100
scene.render.image_settings.file_format='PNG';scene.render.filepath=str(ROOT/'design/wardrobe-render.png')
scene.view_settings.view_transform='AgX'
bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'design/wardrobe.blend'))
bpy.ops.render.render(write_still=True)
# WebP poster uses the same optimized image pipeline as the application.
import subprocess
subprocess.run(['node','--input-type=module','-e',"import sharp from 'sharp'; await sharp('design/wardrobe-render.png').webp({quality:85}).toFile('public/models/wardrobe.webp')"],cwd=str(ROOT),check=True)
# Round-trip the export and verify real geometry and approximate metric dimensions.
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=str(OUT/'wardrobe.glb'))
meshes=[o for o in bpy.context.scene.objects if o.type=='MESH']
points=[o.matrix_world@Vector(corner) for o in meshes for corner in o.bound_box]
bounds=[max(p[i] for p in points)-min(p[i] for p in points) for i in range(3)]
assert len(meshes)>=25 and 1.75<bounds[0]<2.1 and 2.15<bounds[2]<2.3,(len(meshes),bounds)
(ROOT/'design/wardrobe-validation.json').write_text(json.dumps({'meshCount':len(meshes),'boundsMetresBlenderZUp':bounds,'units':'metres','note':'Illustrative design, not a fabrication drawing.'},indent=2))
print('VERIFIED_WARDROBE_EXPORT',len(meshes),bounds)
