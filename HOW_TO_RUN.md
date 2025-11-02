# How to Run the Web Dashboard + Python Test Script

## Step-by-Step Instructions

### 1. Install Python Dependencies (First Time Only)

Open a terminal in the project root and run:

```bash
pip install -r requirements.txt
```

This installs:
- `python-dotenv` - for loading `.env.local`
- `requests` - for HTTP requests to Supabase

### 2. Start the Web Dashboard

**Open a terminal** (Terminal 1) and navigate to the dashboard:

```bash
cd WebDashboard/traffic-dashboard
```

Install Node.js dependencies (if not already done):
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

You should see:
```
  ▲ Next.js 16.0.0
  - Local:        http://localhost:3000
  - Ready in X seconds
```

**✅ Dashboard is running!** Open http://localhost:3000 in your browser.

### 3. Run the Python Test Script (Insert Test Vehicle)

**Open a NEW terminal** (Terminal 2) and navigate to project root:

```bash
cd C:\Users\akg50\Desktop\Traffic-Light-System
```

Run the test script:
```bash
python infra/scripts/supabase_test_insert.py
```

**Expected Output:**
```
Status: 201
✅ Successfully inserted test vehicle detection!
```

### 4. Verify on Dashboard

Go back to your browser (http://localhost:3000) and you should see:

1. **A vehicle appears** in the 3D scene at the center of intersection int1 (because world_x=0.5, world_y=0.5)
2. **Statistics update** - "Vehicles in System" increases
3. **Real-time update** - Vehicle appears automatically within 1 second (Supabase subscription)

## Quick Test Commands

### Windows PowerShell (All in one go):

**Terminal 1 - Start Dashboard:**
```powershell
cd WebDashboard\traffic-dashboard
npm run dev
```

**Terminal 2 - Insert Test Vehicle:**
```powershell
cd C:\Users\akg50\Desktop\Traffic-Light-System
python infra\scripts\supabase_test_insert.py
```

### Alternative: Run Python Script Multiple Times

To see multiple vehicles, run the script again:
```bash
python infra/scripts/supabase_test_insert.py
```

Each run will insert a new vehicle with a different `track_id`.

## Troubleshooting

### ❌ "pip: command not found" or "python: command not found"
- Make sure Python is installed: https://www.python.org/downloads/
- On Windows, you might need to use `python3` instead of `python`
- Try: `py infra/scripts/supabase_test_insert.py`

### ❌ "npm: command not found"
- Install Node.js: https://nodejs.org/
- Restart your terminal after installation

### ❌ "ModuleNotFoundError: No module named 'dotenv'"
- Run: `pip install python-dotenv requests`

### ❌ Dashboard shows "Failed to connect to Supabase"
- Check `.env.local` exists in `WebDashboard/traffic-dashboard/`
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Restart the Next.js server after changing `.env.local`

### ❌ Python script returns "Status: 400" or "401"
- Check `.env.local` in project root has correct values
- Verify `SUPABASE_URL` includes `/rest/v1` at the end
- Make sure `SUPABASE_KEY` is the correct service role key or anon key

### ❌ No vehicle appears on dashboard
1. Check browser console (F12) for errors
2. Verify the Python script returned "Status: 201"
3. Check Supabase dashboard - go to `vehicle_detections` table and verify row exists
4. Verify the row has `world_x`, `world_y`, and `track_id` populated

## What to Expect

### Successful Dashboard:
- Dark theme traffic control center interface
- 3D visualization with two intersections
- Statistics panels on the right
- Traffic light status panels
- A vehicle rendered at intersection center when test data is inserted

### Successful Python Script:
- Returns "Status: 201"
- Prints success message
- Vehicle appears on dashboard within 1 second

## Next Steps

Once you verify both work:

1. **Test different positions**: Edit `world_x` and `world_y` in the Python script (0-1 range)
   - `0.0, 0.0` = top-left of intersection
   - `1.0, 1.0` = bottom-right of intersection
   - `0.5, 0.5` = center

2. **Test emergency vehicle**: Change `"class": "car"` to `"class": "emergency"` in the script

3. **Insert multiple vehicles**: Run the script multiple times with different `track_id` values

4. **Connect real AI/ML**: Start implementing `inference_server.py` to process camera frames



