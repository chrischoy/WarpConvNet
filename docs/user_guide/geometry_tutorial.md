# Geometry Tutorial

This tutorial demonstrates how to create basic geometry types used by WarpConvNet.

## Creating `Points`

```python
import torch
from warpconvnet.geometry.types.points import Points

# coordinates and features for two batches
coords = [torch.rand(1000, 3), torch.rand(500, 3)]
features = [torch.rand(1000, 7), torch.rand(500, 7)]

points = Points(coords, features)
print(points.batch_size)
```

## Creating `Voxels`

```python
from warpconvnet.geometry.types.voxels import Voxels

voxel_size = 0.01
voxel_coords = [
    (torch.rand(1000, 3) / voxel_size).int(),
    (torch.rand(500, 3) / voxel_size).int(),
]
voxel_feats = [torch.rand(1000, 7), torch.rand(500, 7)]

voxels = Voxels(voxel_coords, voxel_feats)
print(voxels.batch_size)
```

`Points` can be downsampled into `Voxels` and voxel grids can be converted back to dense tensors:

```python
downsampled = points.voxel_downsample(voxel_size)
dense = voxels.to_dense(channel_dim=1)
restored = Voxels.from_dense(dense, dense_tensor_channel_dim=1)
```
