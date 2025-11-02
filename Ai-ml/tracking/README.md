# Vehicle Tracking Module

Tracks vehicles across frames using detection IDs and temporal information.

## Purpose

- Track individual vehicles across multiple frames
- Maintain track IDs for consistent vehicle identification
- Calculate vehicle speed and trajectory
- Support multiple tracking algorithms (e.g., SORT, DeepSORT)

## Integration

Used by `detection/inference_server.py` after vehicle detection.

## TODO

- [ ] Implement tracking algorithm
- [ ] Connect to detection pipeline
- [ ] Track vehicles across frames
- [ ] Maintain track IDs
- [ ] Calculate vehicle trajectories



