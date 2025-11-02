# simple test script that inserts a dummy detection row
import requests, os, json, time
SUPA_URL = os.environ.get('SUPABASE_URL')
API_KEY = os.environ.get('SUPABASE_KEY')

row = {
  "intersection":"int1",
  "lane":"north",
  "cars":1, "bikes":0, "buses":0, "trucks":0,
  "camera_rotation":0,
  "track_id": "test-track-1",
  "raw_bboxes": [{"class":"car","x1":10,"y1":20,"x2":60,"y2":40,"conf":0.87}],
  "world_x": 3.2,
  "world_y": 1.1,
  "speed_mps": 0.5,
  "confidence": 0.87,
  "frame_id": "frame-0001"
}

headers = {"apikey": API_KEY, "Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
resp = requests.post(SUPA_URL + "/vehicle_detections", json=row, headers=headers)
print(resp.status_code, resp.text)
