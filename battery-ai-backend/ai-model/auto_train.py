import time
import subprocess
from datetime import datetime

INTERVAL = 3600  # 1 hour


def run_script(script_name):
    try:
        print(f"🚀 Running {script_name}...")

        result = subprocess.run(
            ["python", script_name],
            capture_output=True,
            text=True
        )

        if result.returncode == 0:
            print(f"✅ {script_name} completed")
            print(result.stdout)
        else:
            print(f"❌ Error in {script_name}")
            print(result.stderr)

    except Exception as e:
        print(f"🔥 Exception while running {script_name}: {e}")


def start_auto_training():
    print("====================================")
    print(" 🤖 AUTO AI TRAINING STARTED")
    print("====================================")

    while True:
        print(f"\n⏰ {datetime.now()}")

        # Step 1: Generate dataset
        run_script("ai-model/generate_dataset.py")

        # Step 2: Train model
        run_script("ai-model/train_lstm_model.py")

        print("🎯 Cycle complete. Waiting...")

        time.sleep(INTERVAL)


if __name__ == "__main__":
    start_auto_training()