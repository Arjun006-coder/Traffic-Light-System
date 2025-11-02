# Localization / Homography Module

Converts image pixel coordinates to real-world coordinates using homography transformation.

## Purpose

- Map detected vehicle positions from camera image space to world coordinates
- Use 4+ ground control points (GCPs) for homography matrix calculation
- Output normalized coordinates (0-1) or real-world meters

## Ground Control Points

Pick 4+ physical points in each camera view:
1. Record image pixel coordinates (x, y)
2. Record real-world coordinates (meters or normalized)
3. Calculate homography matrix using these correspondences

## Usage

```python
from localization import apply_homography

# Define GCPs: [(image_x, image_y), (world_x, world_y)]
gcps = [
    ((100, 200), (0.0, 0.0)),    # Top-left
    ((700, 200), (1.0, 0.0)),    # Top-right
    ((700, 600), (1.0, 1.0)),    # Bottom-right
    ((100, 600), (0.0, 1.0)),    # Bottom-left
]

# Apply homography to detected vehicle position
world_x, world_y = apply_homography(image_x, image_y, gcps)
```

## Integration

Used by `detection/inference_server.py` after tracking to convert coordinates.

## TODO

- [ ] Implement homography calculation from GCPs
- [ ] Store GCPs per camera/intersection
- [ ] Convert image coordinates to world coordinates
- [ ] Support both normalized (0-1) and real-world (meters) output



