# Troubleshooting Guide - No Vehicles Appearing

## Quick Checks

### 1. Check Browser Console (F12)
Look for these messages:
- `Fetched X vehicle tracks from database` - Confirms data is being fetched
- `Vehicle created: type=car, position=[...]` - Confirms vehicles are being created
- `Loaded and cloned model: /models/...` - Confirms GLTF models are loading
- Any errors about model loading or Supabase

### 2. Verify Data in Database
Run the test script:
```bash
python infra/scripts/supabase_test_insert.py
```

Then check:
- Script returns "Status: 201" ✅
- Check Supabase dashboard → `vehicle_detections` table
- Verify the row has `world_x`, `world_y`, and `track_id` populated

### 3. Check Model Files
Verify these files exist:
- `WebDashboard/traffic-dashboard/public/models/datsun/scene.gltf`
- `WebDashboard/traffic-dashboard/public/models/emergency/scene.gltf`

If models are missing, the fallback geometry will be used automatically.

## Common Issues

### Issue: Vehicles not appearing at all

**Check 1: Database Query**
Open browser console (F12) and look for:
```
Fetched 0 vehicle tracks from database
```
If you see `0`, the query isn't finding vehicles. Check:
- Vehicles have `world_x`, `world_y`, `track_id` in database
- `useVehicleTracks` hook is filtering correctly

**Check 2: Real-time Subscription**
Look for:
```
Supabase subscription status: SUBSCRIBED
Vehicle detection INSERT received: {...}
```
If missing, subscription isn't working.

**Fix:**
- Check `.env.local` has correct Supabase credentials
- Restart Next.js dev server after changing env vars

### Issue: Vehicles appear but are invisible

**Check 1: Model Loading**
Console should show:
```
Loaded and cloned model: /models/datsun/scene.gltf
```
If you see errors, models aren't loading.

**Fix:**
- Models should use `.gltf` not `.glb` (or update paths)
- Check file paths are correct
- Fallback geometry will show if models fail

**Check 2: Positioning**
Console shows vehicle positions:
```
Vehicle created: type=car, position=[-45, 0.5, -18], model=/models/...
```
If position is wrong, vehicle might be off-screen.

### Issue: Vehicles colliding with traffic lights

**Fixed!** Vehicles now placed at ±18 units from center, lights are at ±13 units.
- North: z = -18 (light at -13) ✅
- South: z = +18 (light at +13) ✅
- East: x = +18 (light at +13) ✅
- West: x = -18 (light at -13) ✅

## Debugging Steps

1. **Open browser console (F12)**

2. **Check what's logged:**
   ```javascript
   // Should see:
   Fetched X vehicle tracks from database
   Rendering X vehicles from tracks
   Vehicle created: type=car, position=[...]
   ```

3. **Run test script and watch console:**
   ```bash
   python infra/scripts/supabase_test_insert.py
   ```
   
   Watch for:
   - `Vehicle detection INSERT received:`
   - `Updated tracks:`

4. **Check Network tab:**
   - Look for requests to `/models/datsun/scene.gltf`
   - Check if models are loading (200 status) or failing (404/500)

5. **Check React DevTools:**
   - Inspect `TrafficScene3D` component
   - Check if `useVehicleTracks` returns data
   - Verify `debouncedTracks` has entries

## Expected Console Output

**When working correctly:**
```
Fetched 1 vehicle tracks from database
Supabase subscription status: SUBSCRIBED
Vehicle detection INSERT received: {new: {...}}
Updated tracks: {...}
Rendering 1 vehicles from tracks
Vehicle created: type=car, position=[-45, 0.5, -18], model=/models/datsun/scene.gltf
Loaded and cloned model: /models/datsun/scene.gltf
```

## Quick Fixes

### No vehicles showing?
1. Run test script: `python infra/scripts/supabase_test_insert.py`
2. Check browser console for errors
3. Verify `.env.local` is in `WebDashboard/traffic-dashboard/`
4. Restart Next.js: `npm run dev`

### Models not loading?
- Fallback geometry will show automatically
- Check file paths match exactly
- Models should be in `/public/models/` (not `/assets/models/`)

### Still nothing?
- Clear browser cache
- Hard refresh: Ctrl+Shift+R
- Check Supabase table has data with `world_x`, `world_y`, `track_id`



