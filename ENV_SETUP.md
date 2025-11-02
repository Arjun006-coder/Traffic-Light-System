# Environment Variables Setup Guide

## Overview

This project uses a centralized `.env.local` file in the root directory that can be accessed by all components:
- **Next.js Web Dashboard** - Uses `NEXT_PUBLIC_*` prefixed variables
- **Python/AI-ML Scripts** - Use standard environment variable names

## Environment Variables

The root `.env.local` file contains:

### Next.js Variables (for Web Dashboard)
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous (public) API key
- `NEXT_SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (server-side only)

### Python/AI-ML Variables (for scripts)
- `SUPABASE_URL` - Supabase project URL (alias)
- `SUPABASE_KEY` - Supabase API key (alias)

### Adding More API Keys

To add API keys for AI/ML services (e.g., OpenAI, TensorFlow models), add them to the root `.env.local`:

```env
# Example: AI/ML API Keys
OPENAI_API_KEY=your_key_here
TENSORFLOW_MODEL_PATH=/path/to/model
```

## Setup Instructions

### 1. Root `.env.local` (Source of Truth)

The main `.env.local` file is in the project root (`/Traffic-Light-System/.env.local`). This file contains all environment variables in both naming conventions.

### 2. Next.js Dashboard

The Next.js app requires `.env.local` in its project directory. A copy has been placed at:
- `WebDashboard/traffic-dashboard/.env.local`

**Important**: If you update the root `.env.local`, you need to copy it to the dashboard folder:
```powershell
# Windows PowerShell
Copy-Item -Path ".\.env.local" -Destination "WebDashboard\traffic-dashboard\.env.local" -Force
```

Or use a symbolic link (recommended for keeping them in sync):
```powershell
# Create symlink (requires admin or Developer Mode on Windows)
New-Item -ItemType SymbolicLink -Path "WebDashboard\traffic-dashboard\.env.local" -Target "$PWD\.env.local"
```

### 3. Python Scripts

Python scripts automatically load the root `.env.local` file using `python-dotenv`. Make sure to install dependencies:

```bash
pip install -r requirements.txt
```

The Python script at `infra/scripts/supabase_test_insert.py`:
- Automatically loads `.env.local` from the project root
- Supports both variable naming conventions (`SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_URL`)
- Falls back to system environment variables if `.env.local` is not found

### 4. AI/ML Projects

For AI/ML projects that need API keys:

1. Add the keys to the root `.env.local`
2. Use `python-dotenv` in your Python scripts:
```python
from dotenv import load_dotenv
from pathlib import Path
import os

# Load .env.local from project root
project_root = Path(__file__).parent.parent.parent.parent
env_file = project_root / '.env.local'
load_dotenv(env_file)

# Access variables
api_key = os.environ.get('YOUR_API_KEY')
```

## File Locations

- **Root `.env.local`**: `/.env.local` (source of truth)
- **Next.js `.env.local`**: `WebDashboard/traffic-dashboard/.env.local` (copy for Next.js)
- **Python requirements**: `requirements.txt` (includes `python-dotenv`)

## Security Notes

- `.env.local` files are gitignored by default
- Never commit sensitive API keys to version control
- Use different keys for development and production
- For production, use environment variables set by your hosting platform

## Troubleshooting

### Next.js can't find environment variables
- Ensure `.env.local` exists in `WebDashboard/traffic-dashboard/`
- Restart the Next.js dev server after changing `.env.local`
- Variables prefixed with `NEXT_PUBLIC_` are available in the browser

### Python scripts can't find environment variables
- Ensure `python-dotenv` is installed: `pip install python-dotenv`
- Check that the root `.env.local` file exists
- Verify the script path resolution is correct

### Variable name conflicts
- Next.js uses `NEXT_PUBLIC_*` prefix for client-side variables
- Python scripts use standard names (or check for both)
- Both naming conventions are included in root `.env.local`



